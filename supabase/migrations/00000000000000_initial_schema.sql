

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "public";






CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."metric_type" AS ENUM (
    'development_experience',
    'project_count',
    'article_count',
    'personal_project_count'
);


ALTER TYPE "public"."metric_type" OWNER TO "postgres";


CREATE TYPE "public"."site_status" AS ENUM (
    'development',
    'staging',
    'production'
);


ALTER TYPE "public"."site_status" OWNER TO "postgres";


CREATE TYPE "public"."technology_category" AS ENUM (
    'frontend',
    'backend',
    'database',
    'infrastructure',
    'other',
    'programming',
    'language',
    'framework',
    'library',
    'tool',
    'ai'
);


ALTER TYPE "public"."technology_category" OWNER TO "postgres";


CREATE TYPE "public"."work_status" AS ENUM (
    'draft',
    'published',
    'featured',
    'archived'
);


ALTER TYPE "public"."work_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."add_admin_user"("target_user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
    -- 実行者が管理者かチェック
    IF NOT (SELECT check_is_admin()) THEN
        RAISE EXCEPTION '管理者権限がありません';
    END IF;

    -- 管理者として追加
    INSERT INTO admin_users (id)
    VALUES (target_user_id)
    ON CONFLICT (id) DO UPDATE
    SET is_active = true, updated_at = NOW();
END;
$$;


ALTER FUNCTION "public"."add_admin_user"("target_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_total_cost"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.total_cost = NEW.base_cost + NEW.rush_fee;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."calculate_total_cost"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM admin_users
        WHERE user_id = auth.uid()
        AND is_active = true
    );
END;
$$;


ALTER FUNCTION "public"."check_is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_admin_users"() RETURNS TABLE("id" "uuid", "email" "text", "created_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  -- 呼び出し元が管理者かチェック
  if not exists (select 1 from admin_users where id = auth.uid()) then
    raise exception 'アクセス権限がありません';
  end if;

  return query
    select 
      au.id,
      u.email,
      au.created_at
    from admin_users au
    join auth.users u on au.id = u.id
    order by au.created_at desc;
end;
$$;


ALTER FUNCTION "public"."get_admin_users"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_daily_admin_stats"("start_date" timestamp with time zone, "end_date" timestamp with time zone) RETURNS TABLE("stat_date" "date", "new_users" bigint, "active_users" bigint, "contacts" bigint)
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
  WITH date_series AS (
    SELECT generate_series(start_date::date, end_date::date, '1 day'::interval) AS day
  ),
  daily_new_users AS (
    SELECT date_trunc('day', created_at)::date AS day, COUNT(id) AS count
    FROM public.profiles
    WHERE created_at >= start_date AND created_at < end_date + interval '1 day' -- Include end_date
    GROUP BY 1
  ),
  daily_active_users AS (
    -- 注意: last_sign_in_at が NULL の場合や更新頻度によっては正確性に欠ける可能性あり
    SELECT date_trunc('day', last_sign_in_at)::date AS day, COUNT(id) AS count
    FROM public.profiles
    WHERE last_sign_in_at >= start_date AND last_sign_in_at < end_date + interval '1 day'
    GROUP BY 1
  ),
  daily_contacts AS (
    SELECT date_trunc('day', created_at)::date AS day, COUNT(id) AS count
    FROM public.contact_chats
    WHERE created_at >= start_date AND created_at < end_date + interval '1 day'
    GROUP BY 1
  )
  SELECT
    ds.day,
    COALESCE(dnu.count, 0) AS new_users,
    COALESCE(dau.count, 0) AS active_users,
    COALESCE(dc.count, 0) AS contacts
  FROM date_series ds
  LEFT JOIN daily_new_users dnu ON ds.day = dnu.day
  LEFT JOIN daily_active_users dau ON ds.day = dau.day
  LEFT JOIN daily_contacts dc ON ds.day = dc.day
  ORDER BY ds.day;
END;
$$;


ALTER FUNCTION "public"."get_daily_admin_stats"("start_date" timestamp with time zone, "end_date" timestamp with time zone) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_overall_admin_stats"() RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  total_user_count bigint;
  pending_contact_count bigint;
BEGIN
  SELECT COUNT(*) INTO total_user_count FROM public.profiles;
  SELECT COUNT(*) INTO pending_contact_count FROM public.contact_chats WHERE status = 'pending';

  RETURN jsonb_build_object(
    'totalUsers', total_user_count,
    'pendingContacts', pending_contact_count
  );
END;
$$;


ALTER FUNCTION "public"."get_overall_admin_stats"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.notification_settings (user_id)
  values (new.id);
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  v_default_role_id uuid;
begin
  -- デフォルトロールのIDを取得
  select id into v_default_role_id
  from public.roles
  where name = 'user'
  limit 1;

  -- プロファイルを作成
  insert into public.profiles (id, email, created_at, updated_at)
  values (p_user_id, p_email, now(), now())
  on conflict (id) do update
  set email = excluded.email,
      updated_at = now();

  -- ユーザーロールを作成
  insert into public.user_roles (user_id, role_id, created_at)
  values (p_user_id, v_default_role_id, now())
  on conflict (user_id, role_id) do nothing;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text", "p_full_name" "text" DEFAULT NULL::"text", "p_avatar_url" "text" DEFAULT NULL::"text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
  v_default_role_id uuid;
BEGIN
  -- デフォルトロールのIDを取得
  SELECT id INTO v_default_role_id
  FROM public.roles
  WHERE name = 'user'
  LIMIT 1;

  -- プロファイルを作成
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    p_email,
    p_full_name,
    p_avatar_url,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    updated_at = now();

  -- ユーザーロールを作成（存在しない場合のみ）
  INSERT INTO public.user_roles (
    user_id,
    role_id,
    created_at
  )
  VALUES (
    p_user_id,
    v_default_role_id,
    now()
  )
  ON CONFLICT (user_id, role_id) DO NOTHING;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text", "p_full_name" "text", "p_avatar_url" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_admin_user_changes"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO admin_users_history (
            admin_user_id, user_id, action, performed_by, metadata
        ) VALUES (
            NEW.id, NEW.user_id, 'CREATE', auth.uid(),
            jsonb_build_object('is_active', NEW.is_active)
        );
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.is_active != NEW.is_active THEN
            INSERT INTO admin_users_history (
                admin_user_id, user_id, action, performed_by, metadata
            ) VALUES (
                NEW.id, NEW.user_id, 
                CASE WHEN NEW.is_active THEN 'ACTIVATE' ELSE 'DEACTIVATE' END,
                auth.uid(),
                jsonb_build_object('is_active', NEW.is_active)
            );
        END IF;
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."log_admin_user_changes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."log_role_changes"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO role_audit_logs (
      user_id, action, role_name, role_type, performed_by
    )
    SELECT
      NEW.user_id,
      'GRANT',
      r.name,
      r.type,
      auth.uid()
    FROM roles r
    WHERE r.id = NEW.role_id;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO role_audit_logs (
      user_id, action, role_name, role_type, performed_by
    )
    SELECT
      OLD.user_id,
      'REVOKE',
      r.name,
      r.type,
      auth.uid()
    FROM roles r
    WHERE r.id = OLD.role_id;
  END IF;
  RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."log_role_changes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."remove_admin_user"("target_user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
    -- 実行者が管理者かチェック
    IF NOT (SELECT check_is_admin()) THEN
        RAISE EXCEPTION '管理者権限がありません';
    END IF;

    -- 自分自身は削除できない
    IF target_user_id = auth.uid() THEN
        RAISE EXCEPTION '自分自身を管理者から削除することはできません';
    END IF;

    -- 管理者を非アクティブに設定
    UPDATE admin_users
    SET is_active = false, updated_at = NOW()
    WHERE id = target_user_id;
END;
$$;


ALTER FUNCTION "public"."remove_admin_user"("target_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_published_at_on_publish"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_published_at_on_publish"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."sync_knowledge_projects"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  project record;
  one_hour_ago timestamptz;
  sync_log_id uuid;
begin
  -- 1時間前の時刻を計算
  one_hour_ago := now() - interval '1 hour';
  
  -- 自動同期が有効で、最後の同期から1時間以上経過したプロジェクトを取得
  for project in
    select id, project_name, scrapbox_cookie, is_private
    from public.knowledge_projects
    where auto_sync_enabled = true
    and (last_synced_at is null or last_synced_at < one_hour_ago)
  loop
    -- 同期ログの作成
    insert into public.knowledge_sync_logs (
      project_id,
      sync_started_at,
      status,
      pages_processed,
      pages_updated
    ) values (
      project.id,
      now(),
      'processing',
      0,
      0
    ) returning id into sync_log_id;

    begin
      -- Supabase Edge Functionで同期処理を実行
      select supabase_edge_function(
        'sync-knowledge-project',
        json_build_object(
          'project_id', project.id,
          'project_name', project.project_name,
          'scrapbox_cookie', coalesce(project.scrapbox_cookie, current_setting('app.settings.default_scrapbox_cookie')),
          'is_private', project.is_private
        )
      );

      -- 同期成功時の更新
      update public.knowledge_projects
      set last_synced_at = now()
      where id = project.id;

      update public.knowledge_sync_logs
      set 
        sync_completed_at = now(),
        status = 'completed'
      where id = sync_log_id;

    exception when others then
      -- エラー発生時の更新
      update public.knowledge_sync_logs
      set 
        sync_completed_at = now(),
        status = 'error',
        error_message = SQLERRM
      where id = sync_log_id;
    end;
  end loop;
end;
$$;


ALTER FUNCTION "public"."sync_knowledge_projects"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_estimate_total_cost"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE estimates
    SET base_cost = (
      SELECT COALESCE(SUM(price), 0)
      FROM estimate_features
      WHERE estimate_id = OLD.estimate_id
    )
    WHERE id = OLD.estimate_id;
  ELSE
    UPDATE estimates
    SET base_cost = (
      SELECT COALESCE(SUM(price), 0)
      FROM estimate_features
      WHERE estimate_id = NEW.estimate_id
    )
    WHERE id = NEW.estimate_id;
  END IF;
  RETURN NULL;
END;
$$;


ALTER FUNCTION "public"."update_estimate_total_cost"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_project_last_activity"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.last_activity_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_project_last_activity"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."admin_audit_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "admin_user_id" "uuid" NOT NULL,
    "action" character varying(100) NOT NULL,
    "target_type" character varying(50),
    "target_id" "uuid",
    "details" "jsonb",
    "performed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."admin_audit_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."admin_users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_users_history" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "admin_user_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "action" character varying(50) NOT NULL,
    "performed_by" "uuid" NOT NULL,
    "performed_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "metadata" "jsonb"
);


ALTER TABLE "public"."admin_users_history" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."audit_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "action" "text" NOT NULL,
    "entity_type" "text" NOT NULL,
    "entity_id" "uuid",
    "old_values" "jsonb",
    "new_values" "jsonb",
    "ip_address" "inet",
    "user_agent" "text",
    "status" "text" DEFAULT 'success'::"text" NOT NULL,
    "error_message" "text",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."audit_logs" OWNER TO "postgres";


COMMENT ON TABLE "public"."audit_logs" IS 'システムの監査ログを管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."blog_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."blog_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."blog_posts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "content" "text" NOT NULL,
    "thumbnail_url" "text",
    "published_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "estimated_reading_time" integer NOT NULL,
    "status" "text" DEFAULT 'draft'::"text" NOT NULL,
    CONSTRAINT "blog_posts_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'published'::"text", 'archived'::"text"])))
);


ALTER TABLE "public"."blog_posts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."blog_posts_categories" (
    "post_id" "uuid" NOT NULL,
    "category_id" "uuid" NOT NULL
);


ALTER TABLE "public"."blog_posts_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contact_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" "text",
    "icon" character varying(255),
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."contact_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contact_chat_messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "chat_id" "uuid" NOT NULL,
    "sender_type" character varying(20) NOT NULL,
    "message_text" "text" NOT NULL,
    "faq_id" "uuid",
    "is_escalation_request" boolean DEFAULT false NOT NULL,
    "timestamp" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "chat_messages_sender_type_check" CHECK ((("sender_type")::"text" = ANY ((ARRAY['user'::character varying, 'assistant'::character varying, 'admin'::character varying])::"text"[])))
);


ALTER TABLE "public"."contact_chat_messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contact_chats" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "category_id" "uuid" NOT NULL,
    "profile_id" "uuid" NOT NULL,
    "page_url" "text",
    "status" character varying(20) DEFAULT 'open'::character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "chats_status_check" CHECK ((("status")::"text" = ANY ((ARRAY['open'::character varying, 'pending'::character varying, 'escalated'::character varying, 'closed'::character varying])::"text"[])))
);


ALTER TABLE "public"."contact_chats" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."email_attachments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email_id" "uuid",
    "file_name" "text" NOT NULL,
    "file_type" "text" NOT NULL,
    "file_size" integer NOT NULL,
    "file_path" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "attachment_id" "text",
    "is_downloaded" boolean DEFAULT false,
    "downloaded_at" timestamp with time zone
);


ALTER TABLE "public"."email_attachments" OWNER TO "postgres";


COMMENT ON TABLE "public"."email_attachments" IS 'メールの添付ファイル情報を管理するテーブル';



COMMENT ON COLUMN "public"."email_attachments"."is_downloaded" IS '添付ファイルがダウンロード済みかどうか';



COMMENT ON COLUMN "public"."email_attachments"."downloaded_at" IS '添付ファイルがダウンロードされた日時';



CREATE TABLE IF NOT EXISTS "public"."email_replies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "original_email_id" "uuid",
    "gmail_message_id" "text" NOT NULL,
    "from_email" "text" NOT NULL,
    "to_email" "text"[] NOT NULL,
    "cc_email" "text"[],
    "bcc_email" "text"[],
    "subject" "text" NOT NULL,
    "body_text" "text",
    "body_html" "text",
    "sent_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."email_replies" OWNER TO "postgres";


COMMENT ON TABLE "public"."email_replies" IS '送信したメールの返信情報を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."email_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "auto_archive_after_days" integer,
    "signature" "text",
    "notification_enabled" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "last_sync_at" timestamp with time zone
);


ALTER TABLE "public"."email_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."email_settings" IS 'メール関連の設定を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."emails" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "gmail_message_id" "text" NOT NULL,
    "thread_id" "text" NOT NULL,
    "from_email" "text" NOT NULL,
    "from_name" "text",
    "to_email" "text"[] NOT NULL,
    "cc_email" "text"[],
    "bcc_email" "text"[],
    "subject" "text" NOT NULL,
    "body_text" "text",
    "body_html" "text",
    "received_at" timestamp with time zone NOT NULL,
    "is_read" boolean DEFAULT false,
    "is_archived" boolean DEFAULT false,
    "is_starred" boolean DEFAULT false,
    "labels" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "has_attachments" boolean DEFAULT false
);


ALTER TABLE "public"."emails" OWNER TO "postgres";


COMMENT ON TABLE "public"."emails" IS 'メールの本体情報を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."estimate_features" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "estimate_id" "uuid",
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "price" integer NOT NULL,
    "duration" numeric NOT NULL,
    "is_required" boolean DEFAULT false NOT NULL,
    "category" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "estimate_features_category_check" CHECK (("category" = ANY (ARRAY['core'::"text", 'user'::"text", 'auth'::"text", 'content'::"text", 'payment'::"text", 'other'::"text"])))
);


ALTER TABLE "public"."estimate_features" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."estimate_requirements" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "estimate_id" "uuid",
    "has_design" boolean DEFAULT false NOT NULL,
    "design_format" "text",
    "has_brand_guidelines" boolean DEFAULT false NOT NULL,
    "has_logo" boolean DEFAULT false NOT NULL,
    "has_images" boolean DEFAULT false NOT NULL,
    "has_icons" boolean DEFAULT false NOT NULL,
    "has_custom_fonts" boolean DEFAULT false NOT NULL,
    "has_content" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "estimate_requirements_design_format_check" CHECK (("design_format" = ANY (ARRAY['figma'::"text", 'xd'::"text", 'photoshop'::"text", 'sketch'::"text", 'other'::"text"])))
);


ALTER TABLE "public"."estimate_requirements" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."estimates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "contact_id" "uuid",
    "project_type" "text" NOT NULL,
    "description" "text" NOT NULL,
    "deadline" "text" NOT NULL,
    "base_cost" integer NOT NULL,
    "rush_fee" integer DEFAULT 0 NOT NULL,
    "total_cost" integer NOT NULL,
    "status" "text" DEFAULT 'draft'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "estimates_deadline_check" CHECK (("deadline" = ANY (ARRAY['asap'::"text", '1month'::"text", '3months'::"text", '6months'::"text", 'flexible'::"text"]))),
    CONSTRAINT "estimates_project_type_check" CHECK (("project_type" = ANY (ARRAY['web'::"text", 'app'::"text", 'other'::"text"]))),
    CONSTRAINT "estimates_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'sent'::"text", 'accepted'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."estimates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."faqs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "category_id" "uuid" NOT NULL,
    "question" "text" NOT NULL,
    "answer" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."faqs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."files" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "message_id" "uuid" NOT NULL,
    "file_name" character varying(255) NOT NULL,
    "file_url" "text" NOT NULL,
    "file_size" bigint NOT NULL,
    "mime_type" character varying(255) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."files" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."focus_intervals" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "session_id" "uuid" NOT NULL,
    "interval_type" character varying(20) NOT NULL,
    "started_at" timestamp with time zone NOT NULL,
    "ended_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."focus_intervals" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."focus_sessions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "project_id" "uuid",
    "task_id" "uuid",
    "knowledge_page_id" "uuid",
    "started_at" timestamp with time zone NOT NULL,
    "ended_at" timestamp with time zone,
    "status" character varying(20) NOT NULL,
    "focus_score" integer,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "focus_sessions_focus_score_check" CHECK ((("focus_score" >= 1) AND ("focus_score" <= 5)))
);


ALTER TABLE "public"."focus_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."github_contributions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "contribution_date" "date" NOT NULL,
    "contribution_count" integer DEFAULT 0 NOT NULL,
    "lines_added" integer DEFAULT 0 NOT NULL,
    "lines_deleted" integer DEFAULT 0 NOT NULL,
    "commit_count" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."github_contributions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."github_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "username" "text" NOT NULL,
    "access_token" "text" NOT NULL,
    "auto_sync" boolean DEFAULT false,
    "last_synced_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "repository" "text" DEFAULT 'saedgewell-portfolio'::"text" NOT NULL
);


ALTER TABLE "public"."github_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."gmail_credentials" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "access_token" "text" NOT NULL,
    "refresh_token" "text" NOT NULL,
    "token_type" "text" NOT NULL,
    "expiry_date" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."gmail_credentials" OWNER TO "postgres";


COMMENT ON TABLE "public"."gmail_credentials" IS 'Gmail APIの認証情報を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."knowledge_page_collaborators" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "page_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "is_last_editor" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."knowledge_page_collaborators" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."knowledge_page_details" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "page_id" "uuid" NOT NULL,
    "lines" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "icons" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "files" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."knowledge_page_details" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."knowledge_page_links" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "source_page_id" "uuid" NOT NULL,
    "target_page_id" "uuid" NOT NULL,
    "hop_level" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."knowledge_page_links" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."knowledge_pages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "scrapbox_id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "image_url" "text",
    "descriptions" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "pin_status" integer DEFAULT 0 NOT NULL,
    "views" integer DEFAULT 0 NOT NULL,
    "linked_count" integer DEFAULT 0 NOT NULL,
    "commit_id" "text",
    "page_rank" double precision DEFAULT 0 NOT NULL,
    "persistent" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "accessed_at" timestamp with time zone,
    "last_accessed_at" timestamp with time zone,
    "snapshot_created_at" timestamp with time zone,
    "snapshot_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."knowledge_pages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."knowledge_projects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_name" "text" NOT NULL,
    "total_pages" integer DEFAULT 0 NOT NULL,
    "last_synced_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "scrapbox_cookie" "text",
    "auto_sync_enabled" boolean DEFAULT false NOT NULL,
    "is_private" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."knowledge_projects" OWNER TO "postgres";


COMMENT ON COLUMN "public"."knowledge_projects"."scrapbox_cookie" IS 'プロジェクト固有のScrapbox Cookie';



COMMENT ON COLUMN "public"."knowledge_projects"."auto_sync_enabled" IS '自動同期の有効/無効';



COMMENT ON COLUMN "public"."knowledge_projects"."is_private" IS '非公開プロジェクトかどうか';



CREATE TABLE IF NOT EXISTS "public"."knowledge_sync_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "sync_started_at" timestamp with time zone NOT NULL,
    "sync_completed_at" timestamp with time zone,
    "status" "text" NOT NULL,
    "error_message" "text",
    "pages_processed" integer DEFAULT 0 NOT NULL,
    "pages_updated" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."knowledge_sync_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."knowledge_users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "scrapbox_id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "display_name" "text" NOT NULL,
    "photo_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."knowledge_users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."metrics" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "type" "public"."metric_type" NOT NULL,
    "value" integer NOT NULL,
    "unit" "text" NOT NULL,
    "display_name" "text" NOT NULL,
    "description" "text",
    "icon" "text" NOT NULL,
    "href" "text" NOT NULL,
    "cta" "text" NOT NULL,
    "sort_order" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."metrics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notification_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "project_updates" boolean DEFAULT true,
    "chat_messages" boolean DEFAULT true,
    "milestones" boolean DEFAULT true,
    "documents" boolean DEFAULT true,
    "system_notifications" boolean DEFAULT true,
    "email_notifications" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."notification_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "type" "text" NOT NULL,
    "link" "text",
    "is_read" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "notifications_type_check" CHECK (("type" = ANY (ARRAY['project_update'::"text", 'chat_message'::"text", 'milestone'::"text", 'document'::"text", 'system'::"text"])))
);


ALTER TABLE "public"."notifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."otp_challenges" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "challenge_type" "text" NOT NULL,
    "challenge_code" "text" NOT NULL,
    "verification_code" "text",
    "attempts" integer DEFAULT 0 NOT NULL,
    "is_verified" boolean DEFAULT false NOT NULL,
    "expires_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", ("now"() + '00:05:00'::interval)) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "otp_challenges_challenge_type_check" CHECK (("challenge_type" = ANY (ARRAY['setup'::"text", 'login'::"text", 'recovery'::"text"])))
);


ALTER TABLE "public"."otp_challenges" OWNER TO "postgres";


COMMENT ON TABLE "public"."otp_challenges" IS 'OTP認証のチャレンジを管理するテーブル';



COMMENT ON COLUMN "public"."otp_challenges"."challenge_type" IS 'チャレンジの種類（setup: 初期設定, login: ログイン, recovery: リカバリー）';



COMMENT ON COLUMN "public"."otp_challenges"."challenge_code" IS 'チャレンジコード（セッション識別用）';



COMMENT ON COLUMN "public"."otp_challenges"."verification_code" IS '検証コード（ハッシュ化されたOTPコード）';



COMMENT ON COLUMN "public"."otp_challenges"."attempts" IS '試行回数';



COMMENT ON COLUMN "public"."otp_challenges"."is_verified" IS '検証済みフラグ';



COMMENT ON COLUMN "public"."otp_challenges"."expires_at" IS '有効期限';



CREATE TABLE IF NOT EXISTS "public"."otp_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "is_enabled" boolean DEFAULT false NOT NULL,
    "secret_key" "text",
    "backup_codes" "text"[] DEFAULT ARRAY[]::"text"[],
    "last_used_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."otp_settings" OWNER TO "postgres";


COMMENT ON TABLE "public"."otp_settings" IS 'ユーザーごとのOTP設定を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."permissions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."permissions" OWNER TO "postgres";


COMMENT ON TABLE "public"."permissions" IS 'システム権限を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "full_name" "text",
    "avatar_url" "text",
    "is_active" boolean DEFAULT true NOT NULL,
    "last_sign_in_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


COMMENT ON TABLE "public"."profiles" IS 'ユーザープロフィール情報を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."project_github_integrations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "repository_url" "text" NOT NULL,
    "repository_name" "text" NOT NULL,
    "repository_owner" "text" NOT NULL,
    "branch" "text" DEFAULT 'main'::"text" NOT NULL,
    "last_commit_sha" "text",
    "last_synced_at" timestamp with time zone,
    "webhook_secret" "text",
    "access_token" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."project_github_integrations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project_milestones" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "due_date" timestamp with time zone,
    "status" "text" NOT NULL,
    "progress" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "project_milestones_progress_check" CHECK ((("progress" >= 0) AND ("progress" <= 100))),
    CONSTRAINT "project_milestones_status_check" CHECK (("status" = ANY (ARRAY['not_started'::"text", 'in_progress'::"text", 'completed'::"text"])))
);


ALTER TABLE "public"."project_milestones" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."project_progress_logs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "milestone_id" "uuid",
    "task_id" "uuid",
    "log_type" "text" NOT NULL,
    "description" "text" NOT NULL,
    "hours_spent" numeric,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "project_progress_logs_hours_spent_check" CHECK (("hours_spent" > (0)::numeric)),
    CONSTRAINT "project_progress_logs_log_type_check" CHECK (("log_type" = ANY (ARRAY['milestone'::"text", 'task'::"text", 'general'::"text"])))
);


ALTER TABLE "public"."project_progress_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" character varying(100) NOT NULL,
    "emoji" character varying(10),
    "description" "text",
    "is_archived" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "last_activity_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."role_audit_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "action" "text" NOT NULL,
    "role_name" "text" NOT NULL,
    "role_type" "text" NOT NULL,
    "performed_by" "uuid" NOT NULL,
    "performed_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "valid_action" CHECK (("action" = ANY (ARRAY['GRANT'::"text", 'REVOKE'::"text"])))
);


ALTER TABLE "public"."role_audit_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."role_permissions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "role_id" "uuid" NOT NULL,
    "permission_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."role_permissions" OWNER TO "postgres";


COMMENT ON TABLE "public"."role_permissions" IS 'ロールと権限の関連を管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."role_policies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "role_id" "uuid" NOT NULL,
    "resource_type" "text" NOT NULL,
    "action" "text" NOT NULL,
    "conditions" "jsonb",
    "effect" "text" NOT NULL,
    "priority" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "role_policies_effect_check" CHECK (("effect" = ANY (ARRAY['allow'::"text", 'deny'::"text"])))
);


ALTER TABLE "public"."role_policies" OWNER TO "postgres";


COMMENT ON TABLE "public"."role_policies" IS 'ロールごとの詳細なアクセスポリシーを管理するテーブル';



COMMENT ON COLUMN "public"."role_policies"."resource_type" IS 'リソースタイプ（例: projects, documents）';



COMMENT ON COLUMN "public"."role_policies"."action" IS 'アクション（例: read, write, delete）';



COMMENT ON COLUMN "public"."role_policies"."conditions" IS 'ポリシーの適用条件（JSONBで柔軟な条件を定義）';



COMMENT ON COLUMN "public"."role_policies"."effect" IS 'ポリシーの効果（allow: 許可, deny: 拒否）';



COMMENT ON COLUMN "public"."role_policies"."priority" IS 'ポリシーの優先度（高いほど優先）';



CREATE TABLE IF NOT EXISTS "public"."roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "type" "text" DEFAULT 'user'::"text" NOT NULL,
    CONSTRAINT "roles_type_check" CHECK (("type" = ANY (ARRAY['system'::"text", 'user'::"text"])))
);


ALTER TABLE "public"."roles" OWNER TO "postgres";


COMMENT ON TABLE "public"."roles" IS 'システムロールを管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."session_policies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "role_id" "uuid" NOT NULL,
    "max_sessions" integer,
    "session_timeout" interval DEFAULT '24:00:00'::interval NOT NULL,
    "require_otp" boolean DEFAULT false NOT NULL,
    "ip_restriction" "text"[],
    "time_restriction" "jsonb",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."session_policies" OWNER TO "postgres";


COMMENT ON TABLE "public"."session_policies" IS 'ロールごとのセッション制限を管理するテーブル';



COMMENT ON COLUMN "public"."session_policies"."max_sessions" IS '同時セッションの最大数（nullは無制限）';



COMMENT ON COLUMN "public"."session_policies"."session_timeout" IS 'セッションのタイムアウト時間';



COMMENT ON COLUMN "public"."session_policies"."require_otp" IS 'OTP認証の要求フラグ';



COMMENT ON COLUMN "public"."session_policies"."ip_restriction" IS '許可するIPアドレスの配列';



COMMENT ON COLUMN "public"."session_policies"."time_restriction" IS '時間帯制限（例: {"weekday": {"start": "09:00", "end": "17:00"}}）';



CREATE TABLE IF NOT EXISTS "public"."site_settings" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "site_status" "public"."site_status" DEFAULT 'development'::"public"."site_status" NOT NULL,
    "maintenance_mode" boolean DEFAULT false NOT NULL,
    "is_development_banner_enabled" boolean DEFAULT true NOT NULL,
    "site_name" "text" DEFAULT 'Saedgewell'::"text" NOT NULL,
    "site_description" "text" DEFAULT '菅井瑛正のポートフォリオサイト'::"text" NOT NULL,
    "site_keywords" "text"[] DEFAULT ARRAY['プロダクトエンジニア'::"text", 'Web開発'::"text", 'Next.js'::"text", 'React'::"text", 'TypeScript'::"text"] NOT NULL,
    "og_image_url" "text",
    "favicon_url" "text",
    "robots_txt_content" "text",
    "enable_blog" boolean DEFAULT true NOT NULL,
    "enable_works" boolean DEFAULT true NOT NULL,
    "enable_contact" boolean DEFAULT true NOT NULL,
    "enable_estimate" boolean DEFAULT true NOT NULL,
    "social_links" "jsonb" DEFAULT '{"github": "https://github.com/ottomatty", "twitter": null, "linkedin": null}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "last_modified_by" "uuid",
    CONSTRAINT "single_settings" CHECK (("id" = '00000000-0000-0000-0000-000000000000'::"uuid"))
);


ALTER TABLE "public"."site_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skill_categories" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "parent_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."skill_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skill_category_relations" (
    "skill_id" "uuid" NOT NULL,
    "category_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."skill_category_relations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skill_experiences" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "skill_id" "uuid" NOT NULL,
    "project_name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "started_at" "date" NOT NULL,
    "ended_at" "date",
    "is_current" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."skill_experiences" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skill_features" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "skill_id" "uuid" NOT NULL,
    "description" "text" NOT NULL,
    "is_capable" boolean DEFAULT true NOT NULL,
    "priority" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."skill_features" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."skills" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "icon_url" "text",
    "started_at" "date" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."skills" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sync_errors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "error_message" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "resolved_at" timestamp with time zone
);


ALTER TABLE "public"."sync_errors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tasks" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "project_id" "uuid" NOT NULL,
    "title" character varying(200) NOT NULL,
    "description" "text",
    "status" character varying(20) DEFAULT 'todo'::character varying NOT NULL,
    "priority" integer DEFAULT 0,
    "due_date" timestamp with time zone,
    "is_archived" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."tasks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."technologies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "category" "public"."technology_category" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."technologies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."trusted_devices" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "device_id" "text" NOT NULL,
    "device_name" "text" NOT NULL,
    "device_type" "text" NOT NULL,
    "os_info" "text",
    "browser_info" "text",
    "last_ip" "inet",
    "last_used_at" timestamp with time zone,
    "expires_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", ("now"() + '30 days'::interval)) NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."trusted_devices" OWNER TO "postgres";


COMMENT ON TABLE "public"."trusted_devices" IS '信頼できるデバイスを管理するテーブル';



CREATE TABLE IF NOT EXISTS "public"."user_roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_roles" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_roles" IS 'ユーザーとロールの関連を管理する中間テーブル';



COMMENT ON COLUMN "public"."user_roles"."user_id" IS 'プロフィールテーブルの外部キー';



COMMENT ON COLUMN "public"."user_roles"."role_id" IS 'ロールテーブルの外部キー';



CREATE TABLE IF NOT EXISTS "public"."work_challenges" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_challenges" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_details" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid" NOT NULL,
    "overview" "text" NOT NULL,
    "role" "text" NOT NULL,
    "period" "text" NOT NULL,
    "team_size" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_details" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_images" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid" NOT NULL,
    "url" "text" NOT NULL,
    "alt" "text" NOT NULL,
    "caption" "text",
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_responsibilities" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid" NOT NULL,
    "description" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_responsibilities" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_results" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid" NOT NULL,
    "description" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_results" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_skills" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid",
    "skill_id" "uuid",
    "description" "text" NOT NULL,
    "highlights" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_skills" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_solutions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "work_id" "uuid" NOT NULL,
    "challenge_id" "uuid",
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "sort_order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_solutions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."work_technologies" (
    "work_id" "uuid" NOT NULL,
    "technology_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."work_technologies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."works" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text" NOT NULL,
    "thumbnail_url" "text" NOT NULL,
    "category" "text" NOT NULL,
    "github_url" "text",
    "website_url" "text",
    "status" "public"."work_status" DEFAULT 'draft'::"public"."work_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "works_category_check" CHECK (("category" = ANY (ARRAY['company'::"text", 'freelance'::"text", 'personal'::"text"])))
);


ALTER TABLE "public"."works" OWNER TO "postgres";


ALTER TABLE ONLY "public"."admin_audit_logs"
    ADD CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_users_history"
    ADD CONSTRAINT "admin_users_history_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."audit_logs"
    ADD CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."blog_categories"
    ADD CONSTRAINT "blog_categories_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."blog_categories"
    ADD CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."blog_posts_categories"
    ADD CONSTRAINT "blog_posts_categories_pkey" PRIMARY KEY ("post_id", "category_id");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."contact_categories"
    ADD CONSTRAINT "categories_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."contact_categories"
    ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contact_chat_messages"
    ADD CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contact_chats"
    ADD CONSTRAINT "chats_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."email_attachments"
    ADD CONSTRAINT "email_attachments_email_id_file_name_key" UNIQUE ("email_id", "file_name");



ALTER TABLE ONLY "public"."email_attachments"
    ADD CONSTRAINT "email_attachments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."email_replies"
    ADD CONSTRAINT "email_replies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."email_settings"
    ADD CONSTRAINT "email_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."emails"
    ADD CONSTRAINT "emails_gmail_message_id_key" UNIQUE ("gmail_message_id");



ALTER TABLE ONLY "public"."emails"
    ADD CONSTRAINT "emails_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."estimate_features"
    ADD CONSTRAINT "estimate_features_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."estimate_requirements"
    ADD CONSTRAINT "estimate_requirements_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."estimates"
    ADD CONSTRAINT "estimates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."files"
    ADD CONSTRAINT "files_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."focus_intervals"
    ADD CONSTRAINT "focus_intervals_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."focus_sessions"
    ADD CONSTRAINT "focus_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."github_contributions"
    ADD CONSTRAINT "github_contributions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."github_contributions"
    ADD CONSTRAINT "github_contributions_user_id_contribution_date_key" UNIQUE ("user_id", "contribution_date");



ALTER TABLE ONLY "public"."github_settings"
    ADD CONSTRAINT "github_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."github_settings"
    ADD CONSTRAINT "github_settings_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."gmail_credentials"
    ADD CONSTRAINT "gmail_credentials_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_page_collaborators"
    ADD CONSTRAINT "knowledge_page_collaborators_page_id_user_id_key" UNIQUE ("page_id", "user_id");



ALTER TABLE ONLY "public"."knowledge_page_collaborators"
    ADD CONSTRAINT "knowledge_page_collaborators_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_page_details"
    ADD CONSTRAINT "knowledge_page_details_page_id_key" UNIQUE ("page_id");



ALTER TABLE ONLY "public"."knowledge_page_details"
    ADD CONSTRAINT "knowledge_page_details_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_page_links"
    ADD CONSTRAINT "knowledge_page_links_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_page_links"
    ADD CONSTRAINT "knowledge_page_links_source_target_key" UNIQUE ("source_page_id", "target_page_id");



ALTER TABLE ONLY "public"."knowledge_pages"
    ADD CONSTRAINT "knowledge_pages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_pages"
    ADD CONSTRAINT "knowledge_pages_project_id_scrapbox_id_key" UNIQUE ("project_id", "scrapbox_id");



ALTER TABLE ONLY "public"."knowledge_projects"
    ADD CONSTRAINT "knowledge_projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_projects"
    ADD CONSTRAINT "knowledge_projects_project_name_key" UNIQUE ("project_name");



ALTER TABLE ONLY "public"."knowledge_sync_logs"
    ADD CONSTRAINT "knowledge_sync_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_users"
    ADD CONSTRAINT "knowledge_users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."knowledge_users"
    ADD CONSTRAINT "knowledge_users_scrapbox_id_key" UNIQUE ("scrapbox_id");



ALTER TABLE ONLY "public"."metrics"
    ADD CONSTRAINT "metrics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."metrics"
    ADD CONSTRAINT "metrics_type_key" UNIQUE ("type");



ALTER TABLE ONLY "public"."notification_settings"
    ADD CONSTRAINT "notification_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notification_settings"
    ADD CONSTRAINT "notification_settings_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."otp_challenges"
    ADD CONSTRAINT "otp_challenges_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."otp_settings"
    ADD CONSTRAINT "otp_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."otp_settings"
    ADD CONSTRAINT "otp_settings_user_id_key" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."permissions"
    ADD CONSTRAINT "permissions_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."permissions"
    ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_github_integrations"
    ADD CONSTRAINT "project_github_integrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_github_integrations"
    ADD CONSTRAINT "project_github_integrations_project_id_key" UNIQUE ("project_id");



ALTER TABLE ONLY "public"."project_milestones"
    ADD CONSTRAINT "project_milestones_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."project_progress_logs"
    ADD CONSTRAINT "project_progress_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."role_audit_logs"
    ADD CONSTRAINT "role_audit_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_role_id_permission_id_key" UNIQUE ("role_id", "permission_id");



ALTER TABLE ONLY "public"."role_policies"
    ADD CONSTRAINT "role_policies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."role_policies"
    ADD CONSTRAINT "role_policies_role_id_resource_type_action_key" UNIQUE ("role_id", "resource_type", "action");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."session_policies"
    ADD CONSTRAINT "session_policies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."session_policies"
    ADD CONSTRAINT "session_policies_role_id_key" UNIQUE ("role_id");



ALTER TABLE ONLY "public"."site_settings"
    ADD CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_categories"
    ADD CONSTRAINT "skill_categories_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."skill_categories"
    ADD CONSTRAINT "skill_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_category_relations"
    ADD CONSTRAINT "skill_category_relations_pkey" PRIMARY KEY ("skill_id", "category_id");



ALTER TABLE ONLY "public"."skill_experiences"
    ADD CONSTRAINT "skill_experiences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skill_features"
    ADD CONSTRAINT "skill_features_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."skills"
    ADD CONSTRAINT "skills_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."sync_errors"
    ADD CONSTRAINT "sync_errors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."technologies"
    ADD CONSTRAINT "technologies_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."technologies"
    ADD CONSTRAINT "technologies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."trusted_devices"
    ADD CONSTRAINT "trusted_devices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."trusted_devices"
    ADD CONSTRAINT "trusted_devices_user_id_device_id_key" UNIQUE ("user_id", "device_id");



ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_user_id_role_id_key" UNIQUE ("user_id", "role_id");



ALTER TABLE ONLY "public"."work_challenges"
    ADD CONSTRAINT "work_challenges_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."work_details"
    ADD CONSTRAINT "work_details_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."work_images"
    ADD CONSTRAINT "work_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."work_responsibilities"
    ADD CONSTRAINT "work_responsibilities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."work_results"
    ADD CONSTRAINT "work_results_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."work_skills"
    ADD CONSTRAINT "work_skills_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."work_skills"
    ADD CONSTRAINT "work_skills_work_id_skill_id_key" UNIQUE ("work_id", "skill_id");



ALTER TABLE ONLY "public"."work_solutions"
    ADD CONSTRAINT "work_solutions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."work_technologies"
    ADD CONSTRAINT "work_technologies_pkey" PRIMARY KEY ("work_id", "technology_id");



ALTER TABLE ONLY "public"."works"
    ADD CONSTRAINT "works_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."works"
    ADD CONSTRAINT "works_slug_key" UNIQUE ("slug");



CREATE INDEX "blog_categories_name_idx" ON "public"."blog_categories" USING "btree" ("name");



CREATE INDEX "blog_posts_categories_category_id_idx" ON "public"."blog_posts_categories" USING "btree" ("category_id");



CREATE INDEX "blog_posts_categories_post_id_idx" ON "public"."blog_posts_categories" USING "btree" ("post_id");



CREATE INDEX "blog_posts_published_at_idx" ON "public"."blog_posts" USING "btree" ("published_at");



CREATE INDEX "blog_posts_slug_idx" ON "public"."blog_posts" USING "btree" ("slug");



CREATE INDEX "blog_posts_status_published_at_idx" ON "public"."blog_posts" USING "btree" ("status", "published_at");



CREATE INDEX "chat_messages_chat_id_idx" ON "public"."contact_chat_messages" USING "btree" ("chat_id");



CREATE INDEX "chat_messages_faq_id_idx" ON "public"."contact_chat_messages" USING "btree" ("faq_id");



CREATE INDEX "chats_category_id_idx" ON "public"."contact_chats" USING "btree" ("category_id");



CREATE INDEX "chats_profile_id_idx" ON "public"."contact_chats" USING "btree" ("profile_id");



CREATE INDEX "email_attachments_email_id_idx" ON "public"."email_attachments" USING "btree" ("email_id");



CREATE INDEX "email_replies_gmail_message_id_idx" ON "public"."email_replies" USING "btree" ("gmail_message_id");



CREATE INDEX "email_replies_original_email_id_idx" ON "public"."email_replies" USING "btree" ("original_email_id");



CREATE INDEX "email_replies_sent_at_idx" ON "public"."email_replies" USING "btree" ("sent_at");



CREATE INDEX "emails_gmail_message_id_idx" ON "public"."emails" USING "btree" ("gmail_message_id");



CREATE INDEX "emails_received_at_idx" ON "public"."emails" USING "btree" ("received_at");



CREATE INDEX "emails_thread_id_idx" ON "public"."emails" USING "btree" ("thread_id");



CREATE INDEX "estimate_features_category_idx" ON "public"."estimate_features" USING "btree" ("category");



CREATE INDEX "estimate_features_estimate_id_idx" ON "public"."estimate_features" USING "btree" ("estimate_id");



CREATE INDEX "estimate_features_is_required_idx" ON "public"."estimate_features" USING "btree" ("is_required");



CREATE INDEX "estimate_requirements_estimate_id_idx" ON "public"."estimate_requirements" USING "btree" ("estimate_id");



CREATE INDEX "estimates_contact_id_idx" ON "public"."estimates" USING "btree" ("contact_id");



CREATE INDEX "estimates_created_at_idx" ON "public"."estimates" USING "btree" ("created_at");



CREATE INDEX "estimates_project_type_status_idx" ON "public"."estimates" USING "btree" ("project_type", "status");



CREATE INDEX "faqs_category_id_idx" ON "public"."faqs" USING "btree" ("category_id");



CREATE INDEX "files_message_id_idx" ON "public"."files" USING "btree" ("message_id");



CREATE INDEX "gmail_credentials_expiry_date_idx" ON "public"."gmail_credentials" USING "btree" ("expiry_date");



CREATE INDEX "idx_audit_logs_action" ON "public"."audit_logs" USING "btree" ("action");



CREATE INDEX "idx_audit_logs_created_at" ON "public"."audit_logs" USING "btree" ("created_at");



CREATE INDEX "idx_audit_logs_entity_type_id" ON "public"."audit_logs" USING "btree" ("entity_type", "entity_id");



CREATE INDEX "idx_audit_logs_user_id" ON "public"."audit_logs" USING "btree" ("user_id");



CREATE INDEX "idx_github_contributions_user_date" ON "public"."github_contributions" USING "btree" ("user_id", "contribution_date");



CREATE INDEX "idx_otp_challenges_challenge_code" ON "public"."otp_challenges" USING "btree" ("challenge_code");



CREATE INDEX "idx_otp_challenges_expires_at" ON "public"."otp_challenges" USING "btree" ("expires_at");



CREATE INDEX "idx_otp_challenges_user_id" ON "public"."otp_challenges" USING "btree" ("user_id");



CREATE INDEX "idx_otp_settings_is_enabled" ON "public"."otp_settings" USING "btree" ("is_enabled");



CREATE INDEX "idx_otp_settings_user_id" ON "public"."otp_settings" USING "btree" ("user_id");



CREATE INDEX "idx_permissions_name" ON "public"."permissions" USING "btree" ("name");



CREATE INDEX "idx_profiles_email" ON "public"."profiles" USING "btree" ("email");



CREATE INDEX "idx_profiles_is_active" ON "public"."profiles" USING "btree" ("is_active");



CREATE INDEX "idx_project_milestones_project_id" ON "public"."project_milestones" USING "btree" ("project_id");



CREATE INDEX "idx_project_milestones_status" ON "public"."project_milestones" USING "btree" ("status");



CREATE INDEX "idx_project_progress_logs_milestone_id" ON "public"."project_progress_logs" USING "btree" ("milestone_id");



CREATE INDEX "idx_project_progress_logs_project_id" ON "public"."project_progress_logs" USING "btree" ("project_id");



CREATE INDEX "idx_project_progress_logs_task_id" ON "public"."project_progress_logs" USING "btree" ("task_id");



CREATE INDEX "idx_role_audit_logs_performed_at" ON "public"."role_audit_logs" USING "btree" ("performed_at");



CREATE INDEX "idx_role_audit_logs_performed_by" ON "public"."role_audit_logs" USING "btree" ("performed_by");



CREATE INDEX "idx_role_audit_logs_user_id" ON "public"."role_audit_logs" USING "btree" ("user_id");



CREATE INDEX "idx_role_permissions_permission_id" ON "public"."role_permissions" USING "btree" ("permission_id");



CREATE INDEX "idx_role_permissions_role_id" ON "public"."role_permissions" USING "btree" ("role_id");



CREATE INDEX "idx_role_policies_priority" ON "public"."role_policies" USING "btree" ("priority");



CREATE INDEX "idx_role_policies_resource_action" ON "public"."role_policies" USING "btree" ("resource_type", "action");



CREATE INDEX "idx_role_policies_role_id" ON "public"."role_policies" USING "btree" ("role_id");



CREATE INDEX "idx_roles_name" ON "public"."roles" USING "btree" ("name");



CREATE INDEX "idx_session_policies_role_id" ON "public"."session_policies" USING "btree" ("role_id");



CREATE INDEX "idx_trusted_devices_device_id" ON "public"."trusted_devices" USING "btree" ("device_id");



CREATE INDEX "idx_trusted_devices_expires_at" ON "public"."trusted_devices" USING "btree" ("expires_at");



CREATE INDEX "idx_trusted_devices_is_active" ON "public"."trusted_devices" USING "btree" ("is_active");



CREATE INDEX "idx_trusted_devices_user_id" ON "public"."trusted_devices" USING "btree" ("user_id");



CREATE INDEX "idx_user_roles_role_id" ON "public"."user_roles" USING "btree" ("role_id");



CREATE INDEX "idx_user_roles_user_id" ON "public"."user_roles" USING "btree" ("user_id");



CREATE INDEX "knowledge_page_collaborators_page_id_idx" ON "public"."knowledge_page_collaborators" USING "btree" ("page_id");



CREATE INDEX "knowledge_page_collaborators_user_id_idx" ON "public"."knowledge_page_collaborators" USING "btree" ("user_id");



CREATE INDEX "knowledge_page_details_page_id_idx" ON "public"."knowledge_page_details" USING "btree" ("page_id");



CREATE INDEX "knowledge_page_links_source_page_id_idx" ON "public"."knowledge_page_links" USING "btree" ("source_page_id");



CREATE INDEX "knowledge_page_links_target_page_id_idx" ON "public"."knowledge_page_links" USING "btree" ("target_page_id");



CREATE INDEX "knowledge_pages_project_id_idx" ON "public"."knowledge_pages" USING "btree" ("project_id");



CREATE INDEX "knowledge_pages_title_idx" ON "public"."knowledge_pages" USING "btree" ("title");



CREATE INDEX "knowledge_pages_updated_at_idx" ON "public"."knowledge_pages" USING "btree" ("updated_at");



CREATE INDEX "knowledge_projects_project_name_idx" ON "public"."knowledge_projects" USING "btree" ("project_name");



CREATE INDEX "knowledge_sync_logs_project_id_idx" ON "public"."knowledge_sync_logs" USING "btree" ("project_id");



CREATE INDEX "knowledge_sync_logs_sync_started_at_idx" ON "public"."knowledge_sync_logs" USING "btree" ("sync_started_at");



CREATE INDEX "knowledge_users_scrapbox_id_idx" ON "public"."knowledge_users" USING "btree" ("scrapbox_id");



CREATE UNIQUE INDEX "notification_settings_user_id_idx" ON "public"."notification_settings" USING "btree" ("user_id");



CREATE INDEX "notifications_created_at_idx" ON "public"."notifications" USING "btree" ("created_at");



CREATE INDEX "notifications_user_id_idx" ON "public"."notifications" USING "btree" ("user_id");



CREATE INDEX "skill_categories_parent_id_idx" ON "public"."skill_categories" USING "btree" ("parent_id");



CREATE INDEX "skill_category_relations_category_id_idx" ON "public"."skill_category_relations" USING "btree" ("category_id");



CREATE INDEX "skill_category_relations_skill_id_idx" ON "public"."skill_category_relations" USING "btree" ("skill_id");



CREATE INDEX "skill_experiences_skill_id_idx" ON "public"."skill_experiences" USING "btree" ("skill_id");



CREATE INDEX "skill_experiences_started_at_idx" ON "public"."skill_experiences" USING "btree" ("started_at");



CREATE INDEX "skill_features_is_capable_priority_idx" ON "public"."skill_features" USING "btree" ("is_capable", "priority" DESC);



CREATE INDEX "skill_features_skill_id_idx" ON "public"."skill_features" USING "btree" ("skill_id");



CREATE INDEX "skills_slug_idx" ON "public"."skills" USING "btree" ("slug");



CREATE INDEX "sync_errors_created_at_idx" ON "public"."sync_errors" USING "btree" ("created_at");



CREATE INDEX "sync_errors_user_id_idx" ON "public"."sync_errors" USING "btree" ("user_id");



CREATE INDEX "technologies_category_idx" ON "public"."technologies" USING "btree" ("category");



CREATE INDEX "technologies_name_idx" ON "public"."technologies" USING "btree" ("name");



CREATE INDEX "work_challenges_work_id_sort_order_idx" ON "public"."work_challenges" USING "btree" ("work_id", "sort_order");



CREATE INDEX "work_details_work_id_idx" ON "public"."work_details" USING "btree" ("work_id");



CREATE INDEX "work_images_work_id_sort_order_idx" ON "public"."work_images" USING "btree" ("work_id", "sort_order");



CREATE INDEX "work_responsibilities_work_id_sort_order_idx" ON "public"."work_responsibilities" USING "btree" ("work_id", "sort_order");



CREATE INDEX "work_results_work_id_sort_order_idx" ON "public"."work_results" USING "btree" ("work_id", "sort_order");



CREATE INDEX "work_skills_skill_id_idx" ON "public"."work_skills" USING "btree" ("skill_id");



CREATE INDEX "work_skills_work_id_idx" ON "public"."work_skills" USING "btree" ("work_id");



CREATE INDEX "work_solutions_challenge_id_idx" ON "public"."work_solutions" USING "btree" ("challenge_id");



CREATE INDEX "work_solutions_work_id_sort_order_idx" ON "public"."work_solutions" USING "btree" ("work_id", "sort_order");



CREATE INDEX "work_technologies_technology_id_idx" ON "public"."work_technologies" USING "btree" ("technology_id");



CREATE INDEX "work_technologies_work_id_idx" ON "public"."work_technologies" USING "btree" ("work_id");



CREATE INDEX "works_category_idx" ON "public"."works" USING "btree" ("category");



CREATE INDEX "works_slug_idx" ON "public"."works" USING "btree" ("slug");



CREATE INDEX "works_status_created_at_idx" ON "public"."works" USING "btree" ("status", "created_at");



CREATE OR REPLACE TRIGGER "calculate_total_cost" BEFORE INSERT OR UPDATE ON "public"."estimates" FOR EACH ROW EXECUTE FUNCTION "public"."calculate_total_cost"();



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."notification_settings" FOR EACH ROW EXECUTE FUNCTION "public"."moddatetime"('updated_at');



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."notifications" FOR EACH ROW EXECUTE FUNCTION "public"."moddatetime"('updated_at');



CREATE OR REPLACE TRIGGER "log_admin_changes" AFTER INSERT OR UPDATE ON "public"."admin_users" FOR EACH ROW EXECUTE FUNCTION "public"."log_admin_user_changes"();



CREATE OR REPLACE TRIGGER "set_published_at" BEFORE UPDATE ON "public"."blog_posts" FOR EACH ROW EXECUTE FUNCTION "public"."set_published_at_on_publish"();



CREATE OR REPLACE TRIGGER "set_updated_at" BEFORE UPDATE ON "public"."metrics" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_admin_users_updated_at" BEFORE UPDATE ON "public"."admin_users" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_blog_posts_updated_at" BEFORE UPDATE ON "public"."blog_posts" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_estimate_requirements_updated_at" BEFORE UPDATE ON "public"."estimate_requirements" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_estimate_total_cost" AFTER INSERT OR DELETE OR UPDATE ON "public"."estimate_features" FOR EACH ROW EXECUTE FUNCTION "public"."update_estimate_total_cost"();



CREATE OR REPLACE TRIGGER "update_estimates_updated_at" BEFORE UPDATE ON "public"."estimates" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_github_contributions_updated_at" BEFORE UPDATE ON "public"."github_contributions" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_knowledge_page_details_updated_at" BEFORE UPDATE ON "public"."knowledge_page_details" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_knowledge_projects_updated_at" BEFORE UPDATE ON "public"."knowledge_projects" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_knowledge_users_updated_at" BEFORE UPDATE ON "public"."knowledge_users" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_otp_challenges_updated_at" BEFORE UPDATE ON "public"."otp_challenges" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_otp_settings_updated_at" BEFORE UPDATE ON "public"."otp_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_permissions_updated_at" BEFORE UPDATE ON "public"."permissions" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_profiles_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_project_github_integrations_updated_at" BEFORE UPDATE ON "public"."project_github_integrations" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_project_last_activity_trigger" BEFORE UPDATE ON "public"."projects" FOR EACH ROW WHEN (("old".* IS DISTINCT FROM "new".*)) EXECUTE FUNCTION "public"."update_project_last_activity"();



CREATE OR REPLACE TRIGGER "update_project_milestones_updated_at" BEFORE UPDATE ON "public"."project_milestones" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_role_policies_updated_at" BEFORE UPDATE ON "public"."role_policies" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_roles_updated_at" BEFORE UPDATE ON "public"."roles" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_session_policies_updated_at" BEFORE UPDATE ON "public"."session_policies" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_site_settings_updated_at" BEFORE UPDATE ON "public"."site_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_skill_categories_updated_at" BEFORE UPDATE ON "public"."skill_categories" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_skill_experiences_updated_at" BEFORE UPDATE ON "public"."skill_experiences" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_skill_features_updated_at" BEFORE UPDATE ON "public"."skill_features" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_skills_updated_at" BEFORE UPDATE ON "public"."skills" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_technologies_updated_at" BEFORE UPDATE ON "public"."technologies" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_trusted_devices_updated_at" BEFORE UPDATE ON "public"."trusted_devices" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_work_challenges_updated_at" BEFORE UPDATE ON "public"."work_challenges" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_work_details_updated_at" BEFORE UPDATE ON "public"."work_details" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_work_images_updated_at" BEFORE UPDATE ON "public"."work_images" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_work_responsibilities_updated_at" BEFORE UPDATE ON "public"."work_responsibilities" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_work_results_updated_at" BEFORE UPDATE ON "public"."work_results" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_work_solutions_updated_at" BEFORE UPDATE ON "public"."work_solutions" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_works_updated_at" BEFORE UPDATE ON "public"."works" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "user_roles_audit" AFTER INSERT OR DELETE ON "public"."user_roles" FOR EACH ROW EXECUTE FUNCTION "public"."log_role_changes"();



ALTER TABLE ONLY "public"."admin_audit_logs"
    ADD CONSTRAINT "admin_audit_logs_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."admin_users_history"
    ADD CONSTRAINT "admin_users_history_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."admin_users_history"
    ADD CONSTRAINT "admin_users_history_performed_by_fkey" FOREIGN KEY ("performed_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."admin_users_history"
    ADD CONSTRAINT "admin_users_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."audit_logs"
    ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."blog_posts_categories"
    ADD CONSTRAINT "blog_posts_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."blog_posts_categories"
    ADD CONSTRAINT "blog_posts_categories_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."contact_chat_messages"
    ADD CONSTRAINT "chat_messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."contact_chats"("id");



ALTER TABLE ONLY "public"."contact_chat_messages"
    ADD CONSTRAINT "chat_messages_faq_id_fkey" FOREIGN KEY ("faq_id") REFERENCES "public"."faqs"("id");



ALTER TABLE ONLY "public"."contact_chats"
    ADD CONSTRAINT "chats_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."contact_categories"("id");



ALTER TABLE ONLY "public"."contact_chats"
    ADD CONSTRAINT "chats_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."email_attachments"
    ADD CONSTRAINT "email_attachments_email_id_fkey" FOREIGN KEY ("email_id") REFERENCES "public"."emails"("id");



ALTER TABLE ONLY "public"."email_replies"
    ADD CONSTRAINT "email_replies_original_email_id_fkey" FOREIGN KEY ("original_email_id") REFERENCES "public"."emails"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."estimate_features"
    ADD CONSTRAINT "estimate_features_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "public"."estimates"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."estimate_requirements"
    ADD CONSTRAINT "estimate_requirements_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "public"."estimates"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."contact_categories"("id");



ALTER TABLE ONLY "public"."files"
    ADD CONSTRAINT "files_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "public"."contact_chat_messages"("id");



ALTER TABLE ONLY "public"."focus_intervals"
    ADD CONSTRAINT "focus_intervals_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."focus_sessions"("id");



ALTER TABLE ONLY "public"."focus_sessions"
    ADD CONSTRAINT "focus_sessions_knowledge_page_id_fkey" FOREIGN KEY ("knowledge_page_id") REFERENCES "public"."knowledge_pages"("id");



ALTER TABLE ONLY "public"."focus_sessions"
    ADD CONSTRAINT "focus_sessions_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id");



ALTER TABLE ONLY "public"."focus_sessions"
    ADD CONSTRAINT "focus_sessions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id");



ALTER TABLE ONLY "public"."focus_sessions"
    ADD CONSTRAINT "focus_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."github_contributions"
    ADD CONSTRAINT "github_contributions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."github_settings"
    ADD CONSTRAINT "github_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."knowledge_page_collaborators"
    ADD CONSTRAINT "knowledge_page_collaborators_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "public"."knowledge_pages"("id");



ALTER TABLE ONLY "public"."knowledge_page_collaborators"
    ADD CONSTRAINT "knowledge_page_collaborators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."knowledge_users"("id");



ALTER TABLE ONLY "public"."knowledge_page_details"
    ADD CONSTRAINT "knowledge_page_details_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "public"."knowledge_pages"("id");



ALTER TABLE ONLY "public"."knowledge_page_links"
    ADD CONSTRAINT "knowledge_page_links_source_page_id_fkey" FOREIGN KEY ("source_page_id") REFERENCES "public"."knowledge_pages"("id");



ALTER TABLE ONLY "public"."knowledge_page_links"
    ADD CONSTRAINT "knowledge_page_links_target_page_id_fkey" FOREIGN KEY ("target_page_id") REFERENCES "public"."knowledge_pages"("id");



ALTER TABLE ONLY "public"."knowledge_pages"
    ADD CONSTRAINT "knowledge_pages_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."knowledge_projects"("id");



ALTER TABLE ONLY "public"."knowledge_sync_logs"
    ADD CONSTRAINT "knowledge_sync_logs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."knowledge_projects"("id");



ALTER TABLE ONLY "public"."notification_settings"
    ADD CONSTRAINT "notification_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."otp_challenges"
    ADD CONSTRAINT "otp_challenges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."otp_settings"
    ADD CONSTRAINT "otp_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_github_integrations"
    ADD CONSTRAINT "project_github_integrations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_milestones"
    ADD CONSTRAINT "project_milestones_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_progress_logs"
    ADD CONSTRAINT "project_progress_logs_milestone_id_fkey" FOREIGN KEY ("milestone_id") REFERENCES "public"."project_milestones"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."project_progress_logs"
    ADD CONSTRAINT "project_progress_logs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."project_progress_logs"
    ADD CONSTRAINT "project_progress_logs_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."role_audit_logs"
    ADD CONSTRAINT "role_audit_logs_performed_by_fkey" FOREIGN KEY ("performed_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."role_audit_logs"
    ADD CONSTRAINT "role_audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."role_permissions"
    ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."role_policies"
    ADD CONSTRAINT "role_policies_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."session_policies"
    ADD CONSTRAINT "session_policies_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."site_settings"
    ADD CONSTRAINT "site_settings_last_modified_by_fkey" FOREIGN KEY ("last_modified_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."skill_categories"
    ADD CONSTRAINT "skill_categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."skill_categories"("id");



ALTER TABLE ONLY "public"."skill_category_relations"
    ADD CONSTRAINT "skill_category_relations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."skill_categories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_category_relations"
    ADD CONSTRAINT "skill_category_relations_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_experiences"
    ADD CONSTRAINT "skill_experiences_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."skill_features"
    ADD CONSTRAINT "skill_features_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."sync_errors"
    ADD CONSTRAINT "sync_errors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id");



ALTER TABLE ONLY "public"."trusted_devices"
    ADD CONSTRAINT "trusted_devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_roles"
    ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_challenges"
    ADD CONSTRAINT "work_challenges_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_details"
    ADD CONSTRAINT "work_details_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_images"
    ADD CONSTRAINT "work_images_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_responsibilities"
    ADD CONSTRAINT "work_responsibilities_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_results"
    ADD CONSTRAINT "work_results_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_skills"
    ADD CONSTRAINT "work_skills_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_solutions"
    ADD CONSTRAINT "work_solutions_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "public"."work_challenges"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."work_solutions"
    ADD CONSTRAINT "work_solutions_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_technologies"
    ADD CONSTRAINT "work_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "public"."technologies"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."work_technologies"
    ADD CONSTRAINT "work_technologies_work_id_fkey" FOREIGN KEY ("work_id") REFERENCES "public"."works"("id") ON DELETE CASCADE;



CREATE POLICY "Allow delete for authenticated admin users" ON "public"."metrics" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("public"."user_roles" "ur"
     JOIN "public"."roles" "r" ON (("ur"."role_id" = "r"."id")))
  WHERE (("ur"."user_id" = "auth"."uid"()) AND ("r"."name" = 'admin'::"text")))));



CREATE POLICY "Allow insert for authenticated admin users" ON "public"."metrics" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM ("public"."user_roles" "ur"
     JOIN "public"."roles" "r" ON (("ur"."role_id" = "r"."id")))
  WHERE (("ur"."user_id" = "auth"."uid"()) AND ("r"."name" = 'admin'::"text")))));



CREATE POLICY "Allow read access for all users" ON "public"."metrics" FOR SELECT USING (true);



CREATE POLICY "Allow update for authenticated admin users" ON "public"."metrics" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("public"."user_roles" "ur"
     JOIN "public"."roles" "r" ON (("ur"."role_id" = "r"."id")))
  WHERE (("ur"."user_id" = "auth"."uid"()) AND ("r"."name" = 'admin'::"text"))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM ("public"."user_roles" "ur"
     JOIN "public"."roles" "r" ON (("ur"."role_id" = "r"."id")))
  WHERE (("ur"."user_id" = "auth"."uid"()) AND ("r"."name" = 'admin'::"text")))));



CREATE POLICY "Email attachments are only visible to authenticated users" ON "public"."email_attachments" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email attachments can only be deleted by authenticated users" ON "public"."email_attachments" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email attachments can only be inserted by authenticated users" ON "public"."email_attachments" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email replies are only visible to authenticated users" ON "public"."email_replies" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email replies can only be inserted by authenticated users" ON "public"."email_replies" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email replies can only be updated by authenticated users" ON "public"."email_replies" FOR UPDATE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email settings are only visible to authenticated users" ON "public"."email_settings" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email settings can only be inserted by authenticated users" ON "public"."email_settings" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Email settings can only be updated by authenticated users" ON "public"."email_settings" FOR UPDATE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Emails are only visible to authenticated users" ON "public"."emails" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Emails can only be inserted by authenticated users" ON "public"."emails" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Emails can only be updated by authenticated users" ON "public"."emails" FOR UPDATE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Enable read access for all users" ON "public"."contact_categories" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."faqs" FOR SELECT USING (true);



CREATE POLICY "Enable read access for authenticated users" ON "public"."contact_chat_messages" FOR SELECT USING (("chat_id" IN ( SELECT "contact_chats"."id"
   FROM "public"."contact_chats"
  WHERE ("contact_chats"."profile_id" = "auth"."uid"()))));



CREATE POLICY "Enable read access for authenticated users" ON "public"."contact_chats" FOR SELECT USING (("auth"."uid"() = "profile_id"));



CREATE POLICY "Enable read access for authenticated users" ON "public"."files" FOR SELECT USING (("message_id" IN ( SELECT "contact_chat_messages"."id"
   FROM "public"."contact_chat_messages"
  WHERE ("contact_chat_messages"."chat_id" IN ( SELECT "contact_chats"."id"
           FROM "public"."contact_chats"
          WHERE ("contact_chats"."profile_id" = "auth"."uid"()))))));



CREATE POLICY "Enable update access for authenticated users" ON "public"."contact_chats" FOR UPDATE USING (("auth"."uid"() = "profile_id"));



CREATE POLICY "Gmail credentials are only visible to authenticated users" ON "public"."gmail_credentials" FOR SELECT USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Gmail credentials can only be deleted by authenticated users" ON "public"."gmail_credentials" FOR DELETE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Gmail credentials can only be inserted by authenticated users" ON "public"."gmail_credentials" FOR INSERT WITH CHECK (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "Gmail credentials can only be updated by authenticated users" ON "public"."gmail_credentials" FOR UPDATE USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "OTPチャレンジは本人のみが参照可能" ON "public"."otp_challenges" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "OTPチャレンジは本人のみが管理可能" ON "public"."otp_challenges" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "OTP設定は本人のみが参照可能" ON "public"."otp_settings" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "OTP設定は本人のみが管理可能" ON "public"."otp_settings" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Service role can manage all sync errors" ON "public"."sync_errors" USING ((("auth"."jwt"() ->> 'role'::"text") = 'service_role'::"text"));



CREATE POLICY "Users can view their own sync errors" ON "public"."sync_errors" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."admin_audit_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."admin_users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."admin_users_history" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."audit_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."blog_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."blog_posts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."blog_posts_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."contact_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."contact_chat_messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."contact_chats" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."email_attachments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."email_replies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."email_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."emails" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."estimate_features" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."estimate_requirements" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."estimates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."faqs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."files" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."focus_sessions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."github_contributions" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "github_contributions_delete_policy" ON "public"."github_contributions" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "github_contributions_insert_policy" ON "public"."github_contributions" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "github_contributions_select_policy" ON "public"."github_contributions" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "github_contributions_update_policy" ON "public"."github_contributions" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."github_settings" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "github_settings_insert_policy" ON "public"."github_settings" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "github_settings_select_policy" ON "public"."github_settings" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "github_settings_update_policy" ON "public"."github_settings" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."gmail_credentials" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."knowledge_page_collaborators" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."knowledge_page_details" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."knowledge_page_links" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."knowledge_pages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."knowledge_projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."knowledge_sync_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."knowledge_users" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."metrics" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notification_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notifications" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."otp_challenges" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."otp_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."permissions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "profiles_select_policy" ON "public"."profiles" FOR SELECT TO "authenticated" USING (("id" = "auth"."uid"()));



ALTER TABLE "public"."project_github_integrations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_milestones" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."project_progress_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."role_audit_logs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."role_permissions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."role_policies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."session_policies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skill_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skill_category_relations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skill_experiences" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skill_features" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."skills" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."sync_errors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tasks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."technologies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."trusted_devices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_challenges" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_details" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_responsibilities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_results" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_skills" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_solutions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."work_technologies" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."works" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "カテゴリーの作成・編集は認証済みユーザーの" ON "public"."skill_categories" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "カテゴリーの参照は全員可能" ON "public"."skill_categories" FOR SELECT USING (true);



CREATE POLICY "カテゴリーは誰でも閲覧可能" ON "public"."blog_categories" FOR SELECT;



CREATE POLICY "システムは通知を作成可能" ON "public"."notifications" FOR INSERT TO "service_role" WITH CHECK (true);



CREATE POLICY "システムは通知設定を作成可能" ON "public"."notification_settings" FOR INSERT TO "service_role" WITH CHECK (true);



CREATE POLICY "スキルの作成・編集は認証済みユーザーのみ可" ON "public"."skills" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "スキルの参照は全員可能" ON "public"."skills" FOR SELECT USING (true);



CREATE POLICY "プロジェクトの作成・編集は認証済みユーザー" ON "public"."knowledge_projects" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "プロジェクトの参照は全員可能" ON "public"."knowledge_projects" FOR SELECT USING (true);



CREATE POLICY "プロジェクトオーナーはGitHub連携を削除可能" ON "public"."project_github_integrations" FOR DELETE USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトオーナーはGitHub連携を更新可能" ON "public"."project_github_integrations" FOR UPDATE USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトオーナーはGitHub連携を設定可能" ON "public"."project_github_integrations" FOR INSERT WITH CHECK (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトオーナーはマイルストーンを作成" ON "public"."project_milestones" FOR INSERT WITH CHECK (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトオーナーはマイルストーンを削除" ON "public"."project_milestones" FOR DELETE USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトオーナーはマイルストーンを更新" ON "public"."project_milestones" FOR UPDATE USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトオーナーは進捗ログを削除可能" ON "public"."project_progress_logs" FOR DELETE USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトオーナーは進捗ログを更新可能" ON "public"."project_progress_logs" FOR UPDATE USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトメンバーはGitHub連携情報を参照可" ON "public"."project_github_integrations" FOR SELECT USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトメンバーはマイルストーンを参照" ON "public"."project_milestones" FOR SELECT USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトメンバーは進捗ログを作成可能" ON "public"."project_progress_logs" FOR INSERT WITH CHECK (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロジェクトメンバーは進捗ログを参照可能" ON "public"."project_progress_logs" FOR SELECT USING (("project_id" IN ( SELECT "projects"."id"
   FROM "public"."projects"
  WHERE ("projects"."user_id" = "auth"."uid"()))));



CREATE POLICY "プロファイル作成ポリシー" ON "public"."profiles" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "プロファイル参照ポリシー" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "プロファイル更新ポリシー" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "ページの作成・編集は認証済みユーザーのみ可" ON "public"."knowledge_pages" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "ページの参照は全員可能" ON "public"."knowledge_pages" FOR SELECT USING (true);



CREATE POLICY "ユーザーは自分のセッションのみ作成可能" ON "public"."focus_sessions" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分のセッションのみ参照可能" ON "public"."focus_sessions" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分のセッションのみ更新可能" ON "public"."focus_sessions" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分のプロジェクトに属するタスク" ON "public"."tasks" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."projects"
  WHERE (("projects"."id" = "tasks"."project_id") AND ("projects"."user_id" = "auth"."uid"())))));



CREATE POLICY "ユーザーは自分のプロジェクトのみ作成可能" ON "public"."projects" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分のプロジェクトのみ参照可能" ON "public"."projects" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分のプロジェクトのみ更新可能" ON "public"."projects" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分の通知のみ参照可能" ON "public"."notifications" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分の通知設定のみ参照・更新可能" ON "public"."notification_settings" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザーは自分の通知設定のみ更新可能" ON "public"."notification_settings" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "ユーザー情報の作成・編集は認証済みユーザー" ON "public"."knowledge_users" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "ユーザー情報の参照は全員可能" ON "public"."knowledge_users" FOR SELECT USING (true);



CREATE POLICY "リンク情報の作成・編集は認証済みユーザーの" ON "public"."knowledge_page_links" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "リンク情報の参照は全員可能" ON "public"."knowledge_page_links" FOR SELECT USING (true);



CREATE POLICY "ロール権限は認証済みユーザーが参照可能" ON "public"."role_permissions" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "一般ロールは全員参照可能" ON "public"."roles" FOR SELECT TO "authenticated" USING (("type" = 'user'::"text"));



CREATE POLICY "信頼済みデバイスは本人のみが参照可能" ON "public"."trusted_devices" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "信頼済みデバイスは本人のみが管理可能" ON "public"."trusted_devices" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "全ユーザーが設定を閲覧可能" ON "public"."site_settings" FOR SELECT USING (true);



CREATE POLICY "公開済みの実績に紐づく技術は誰でも閲覧可能" ON "public"."work_technologies" FOR SELECT USING (("work_id" IN ( SELECT "works"."id"
   FROM "public"."works"
  WHERE ("works"."status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])))));



CREATE POLICY "公開済みの実績の成果は誰でも閲覧可能" ON "public"."work_results" FOR SELECT USING (("work_id" IN ( SELECT "works"."id"
   FROM "public"."works"
  WHERE ("works"."status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])))));



CREATE POLICY "公開済みの実績の担当業務は誰でも閲覧可能" ON "public"."work_responsibilities" FOR SELECT USING (("work_id" IN ( SELECT "works"."id"
   FROM "public"."works"
  WHERE ("works"."status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])))));



CREATE POLICY "公開済みの実績の画像は誰でも閲覧可能" ON "public"."work_images" FOR SELECT USING (("work_id" IN ( SELECT "works"."id"
   FROM "public"."works"
  WHERE ("works"."status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])))));



CREATE POLICY "公開済みの実績の解決策は誰でも閲覧可能" ON "public"."work_solutions" FOR SELECT USING (("work_id" IN ( SELECT "works"."id"
   FROM "public"."works"
  WHERE ("works"."status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])))));



CREATE POLICY "公開済みの実績の詳細は誰でも閲覧可能" ON "public"."work_details" FOR SELECT USING (("work_id" IN ( SELECT "works"."id"
   FROM "public"."works"
  WHERE ("works"."status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])))));



CREATE POLICY "公開済みの実績の課題は誰でも閲覧可能" ON "public"."work_challenges" FOR SELECT USING (("work_id" IN ( SELECT "works"."id"
   FROM "public"."works"
  WHERE ("works"."status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])))));



CREATE POLICY "公開済みの実績は誰でも閲覧可能" ON "public"."works" FOR SELECT USING (("status" = ANY (ARRAY['published'::"public"."work_status", 'featured'::"public"."work_status"])));



CREATE POLICY "公開済みの記事に紐づくカテゴリーは誰でも閲" ON "public"."blog_posts_categories" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."blog_posts"
  WHERE (("blog_posts"."id" = "blog_posts_categories"."post_id") AND ("blog_posts"."status" = 'published'::"text")))));



CREATE POLICY "公開済みの記事は誰でも閲覧可能" ON "public"."blog_posts" FOR SELECT USING (("status" = 'published'::"text"));



CREATE POLICY "同期ログの作成・編集は認証済みユーザーのみ" ON "public"."knowledge_sync_logs" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "同期ログの参照は全員可能" ON "public"."knowledge_sync_logs" FOR SELECT USING (true);



CREATE POLICY "実績の作成・編集は認証済みユーザーのみ可能" ON "public"."skill_experiences" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "実績の参照は全員可能" ON "public"."skill_experiences" FOR SELECT USING (true);



CREATE POLICY "技術スタックは誰でも閲覧可能" ON "public"."technologies" FOR SELECT;



CREATE POLICY "権限は認証済みユーザーが参照可能" ON "public"."permissions" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "機能説明の作成・編集は認証済みユーザーのみ" ON "public"."skill_features" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "機能説明の参照は全員可能" ON "public"."skill_features" FOR SELECT USING (true);



CREATE POLICY "監査ログの挿入" ON "public"."role_audit_logs" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "監査ログは認証済みユーザーが作成可能" ON "public"."audit_logs" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "管理者のみが設定を編集可能" ON "public"."site_settings" USING ((("auth"."jwt"() ->> 'role'::"text") = 'admin'::"text"));



CREATE POLICY "管理者のみカテゴリーの作成・編集・削除が可" ON "public"."blog_categories" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみログ参照可能" ON "public"."admin_audit_logs" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE (("admin_users"."user_id" = "auth"."uid"()) AND ("admin_users"."is_active" = true)))));



CREATE POLICY "管理者のみ作成・編集・削除が可能" ON "public"."work_skills" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ参照可能" ON "public"."admin_users" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users" "admin_users_1"
  WHERE (("admin_users_1"."user_id" = "auth"."uid"()) AND ("admin_users_1"."is_active" = true)))));



CREATE POLICY "管理者のみ実績と技術の紐付けの作成・削除が" ON "public"."work_technologies" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ実績の作成・編集・削除が可能" ON "public"."works" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ実装要件の作成・編集・削除が可能" ON "public"."estimate_requirements" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ履歴参照可能" ON "public"."admin_users_history" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."admin_users"
  WHERE (("admin_users"."user_id" = "auth"."uid"()) AND ("admin_users"."is_active" = true)))));



CREATE POLICY "管理者のみ成果の作成・編集・削除が可能" ON "public"."work_results" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ技術スタックの作成・編集・削除が" ON "public"."technologies" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ担当業務の作成・編集・削除が可能" ON "public"."work_responsibilities" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ機能の作成・編集・削除が可能" ON "public"."estimate_features" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ画像の作成・編集・削除が可能" ON "public"."work_images" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ見積もりの閲覧・編集・削除が可能" ON "public"."estimates" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ解決策の作成・編集・削除が可能" ON "public"."work_solutions" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ記事とカテゴリーの紐付けの作成・" ON "public"."blog_posts_categories" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ記事の作成・編集・削除が可能" ON "public"."blog_posts" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ詳細情報の作成・編集・削除が可能" ON "public"."work_details" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "管理者のみ課題の作成・編集・削除が可能" ON "public"."work_challenges" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "編集者情報の作成・編集は認証済みユーザーの" ON "public"."knowledge_page_collaborators" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "編集者情報の参照は全員可能" ON "public"."knowledge_page_collaborators" FOR SELECT USING (true);



CREATE POLICY "見積もりに紐づく実装要件は誰でも閲覧可能" ON "public"."estimate_requirements" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."estimates"
  WHERE ("estimates"."id" = "estimate_requirements"."estimate_id"))));



CREATE POLICY "見積もりに紐づく機能は誰でも閲覧可能" ON "public"."estimate_features" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."estimates"
  WHERE ("estimates"."id" = "estimate_features"."estimate_id"))));



CREATE POLICY "詳細の作成・編集は認証済みユーザーのみ可能" ON "public"."knowledge_page_details" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "詳細の参照は全員可能" ON "public"."knowledge_page_details" FOR SELECT USING (true);



CREATE POLICY "誰でも見積もりを作成可能" ON "public"."estimates" FOR INSERT WITH CHECK (true);



CREATE POLICY "関連の作成・編集は認証済みユーザーのみ可能" ON "public"."skill_category_relations" USING (("auth"."role"() = 'authenticated'::"text"));



CREATE POLICY "関連の参照は全員可能" ON "public"."skill_category_relations" FOR SELECT USING (true);





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


SET SESSION AUTHORIZATION "postgres";
RESET SESSION AUTHORIZATION;



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";









































































































































































































REVOKE ALL ON FUNCTION "public"."add_admin_user"("target_user_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."add_admin_user"("target_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."add_admin_user"("target_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_admin_user"("target_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."calculate_total_cost"() TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_total_cost"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_total_cost"() TO "service_role";



GRANT ALL ON FUNCTION "public"."check_is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."check_is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_is_admin"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_admin_users"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_admin_users"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_admin_users"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_daily_admin_stats"("start_date" timestamp with time zone, "end_date" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."get_daily_admin_stats"("start_date" timestamp with time zone, "end_date" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_daily_admin_stats"("start_date" timestamp with time zone, "end_date" timestamp with time zone) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_overall_admin_stats"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_overall_admin_stats"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_overall_admin_stats"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text", "p_full_name" "text", "p_avatar_url" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text", "p_full_name" "text", "p_avatar_url" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"("p_user_id" "uuid", "p_email" "text", "p_full_name" "text", "p_avatar_url" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."log_admin_user_changes"() TO "anon";
GRANT ALL ON FUNCTION "public"."log_admin_user_changes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."log_admin_user_changes"() TO "service_role";



GRANT ALL ON FUNCTION "public"."log_role_changes"() TO "anon";
GRANT ALL ON FUNCTION "public"."log_role_changes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."log_role_changes"() TO "service_role";



GRANT ALL ON FUNCTION "public"."moddatetime"() TO "postgres";
GRANT ALL ON FUNCTION "public"."moddatetime"() TO "anon";
GRANT ALL ON FUNCTION "public"."moddatetime"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."moddatetime"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."remove_admin_user"("target_user_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."remove_admin_user"("target_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."remove_admin_user"("target_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_admin_user"("target_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_published_at_on_publish"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_published_at_on_publish"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_published_at_on_publish"() TO "service_role";



GRANT ALL ON FUNCTION "public"."sync_knowledge_projects"() TO "anon";
GRANT ALL ON FUNCTION "public"."sync_knowledge_projects"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."sync_knowledge_projects"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_estimate_total_cost"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_estimate_total_cost"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_estimate_total_cost"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_project_last_activity"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_project_last_activity"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_project_last_activity"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";
























GRANT ALL ON TABLE "public"."admin_audit_logs" TO "anon";
GRANT ALL ON TABLE "public"."admin_audit_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_audit_logs" TO "service_role";



GRANT ALL ON TABLE "public"."admin_users" TO "anon";
GRANT ALL ON TABLE "public"."admin_users" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_users" TO "service_role";



GRANT ALL ON TABLE "public"."admin_users_history" TO "anon";
GRANT ALL ON TABLE "public"."admin_users_history" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_users_history" TO "service_role";



GRANT ALL ON TABLE "public"."audit_logs" TO "anon";
GRANT ALL ON TABLE "public"."audit_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."audit_logs" TO "service_role";



GRANT ALL ON TABLE "public"."blog_categories" TO "anon";
GRANT ALL ON TABLE "public"."blog_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_categories" TO "service_role";



GRANT ALL ON TABLE "public"."blog_posts" TO "anon";
GRANT ALL ON TABLE "public"."blog_posts" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_posts" TO "service_role";



GRANT ALL ON TABLE "public"."blog_posts_categories" TO "anon";
GRANT ALL ON TABLE "public"."blog_posts_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_posts_categories" TO "service_role";



GRANT ALL ON TABLE "public"."contact_categories" TO "anon";
GRANT ALL ON TABLE "public"."contact_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."contact_categories" TO "service_role";



GRANT ALL ON TABLE "public"."contact_chat_messages" TO "anon";
GRANT ALL ON TABLE "public"."contact_chat_messages" TO "authenticated";
GRANT ALL ON TABLE "public"."contact_chat_messages" TO "service_role";



GRANT ALL ON TABLE "public"."contact_chats" TO "anon";
GRANT ALL ON TABLE "public"."contact_chats" TO "authenticated";
GRANT ALL ON TABLE "public"."contact_chats" TO "service_role";



GRANT ALL ON TABLE "public"."email_attachments" TO "anon";
GRANT ALL ON TABLE "public"."email_attachments" TO "authenticated";
GRANT ALL ON TABLE "public"."email_attachments" TO "service_role";



GRANT ALL ON TABLE "public"."email_replies" TO "anon";
GRANT ALL ON TABLE "public"."email_replies" TO "authenticated";
GRANT ALL ON TABLE "public"."email_replies" TO "service_role";



GRANT ALL ON TABLE "public"."email_settings" TO "anon";
GRANT ALL ON TABLE "public"."email_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."email_settings" TO "service_role";



GRANT ALL ON TABLE "public"."emails" TO "anon";
GRANT ALL ON TABLE "public"."emails" TO "authenticated";
GRANT ALL ON TABLE "public"."emails" TO "service_role";



GRANT ALL ON TABLE "public"."estimate_features" TO "anon";
GRANT ALL ON TABLE "public"."estimate_features" TO "authenticated";
GRANT ALL ON TABLE "public"."estimate_features" TO "service_role";



GRANT ALL ON TABLE "public"."estimate_requirements" TO "anon";
GRANT ALL ON TABLE "public"."estimate_requirements" TO "authenticated";
GRANT ALL ON TABLE "public"."estimate_requirements" TO "service_role";



GRANT ALL ON TABLE "public"."estimates" TO "anon";
GRANT ALL ON TABLE "public"."estimates" TO "authenticated";
GRANT ALL ON TABLE "public"."estimates" TO "service_role";



GRANT ALL ON TABLE "public"."faqs" TO "anon";
GRANT ALL ON TABLE "public"."faqs" TO "authenticated";
GRANT ALL ON TABLE "public"."faqs" TO "service_role";



GRANT ALL ON TABLE "public"."files" TO "anon";
GRANT ALL ON TABLE "public"."files" TO "authenticated";
GRANT ALL ON TABLE "public"."files" TO "service_role";



GRANT ALL ON TABLE "public"."focus_intervals" TO "anon";
GRANT ALL ON TABLE "public"."focus_intervals" TO "authenticated";
GRANT ALL ON TABLE "public"."focus_intervals" TO "service_role";



GRANT ALL ON TABLE "public"."focus_sessions" TO "anon";
GRANT ALL ON TABLE "public"."focus_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."focus_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."github_contributions" TO "anon";
GRANT ALL ON TABLE "public"."github_contributions" TO "authenticated";
GRANT ALL ON TABLE "public"."github_contributions" TO "service_role";



GRANT ALL ON TABLE "public"."github_settings" TO "anon";
GRANT ALL ON TABLE "public"."github_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."github_settings" TO "service_role";



GRANT ALL ON TABLE "public"."gmail_credentials" TO "anon";
GRANT ALL ON TABLE "public"."gmail_credentials" TO "authenticated";
GRANT ALL ON TABLE "public"."gmail_credentials" TO "service_role";



GRANT ALL ON TABLE "public"."knowledge_page_collaborators" TO "anon";
GRANT ALL ON TABLE "public"."knowledge_page_collaborators" TO "authenticated";
GRANT ALL ON TABLE "public"."knowledge_page_collaborators" TO "service_role";



GRANT ALL ON TABLE "public"."knowledge_page_details" TO "anon";
GRANT ALL ON TABLE "public"."knowledge_page_details" TO "authenticated";
GRANT ALL ON TABLE "public"."knowledge_page_details" TO "service_role";



GRANT ALL ON TABLE "public"."knowledge_page_links" TO "anon";
GRANT ALL ON TABLE "public"."knowledge_page_links" TO "authenticated";
GRANT ALL ON TABLE "public"."knowledge_page_links" TO "service_role";



GRANT ALL ON TABLE "public"."knowledge_pages" TO "anon";
GRANT ALL ON TABLE "public"."knowledge_pages" TO "authenticated";
GRANT ALL ON TABLE "public"."knowledge_pages" TO "service_role";



GRANT ALL ON TABLE "public"."knowledge_projects" TO "anon";
GRANT ALL ON TABLE "public"."knowledge_projects" TO "authenticated";
GRANT ALL ON TABLE "public"."knowledge_projects" TO "service_role";



GRANT ALL ON TABLE "public"."knowledge_sync_logs" TO "anon";
GRANT ALL ON TABLE "public"."knowledge_sync_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."knowledge_sync_logs" TO "service_role";



GRANT ALL ON TABLE "public"."knowledge_users" TO "anon";
GRANT ALL ON TABLE "public"."knowledge_users" TO "authenticated";
GRANT ALL ON TABLE "public"."knowledge_users" TO "service_role";



GRANT ALL ON TABLE "public"."metrics" TO "anon";
GRANT ALL ON TABLE "public"."metrics" TO "authenticated";
GRANT ALL ON TABLE "public"."metrics" TO "service_role";



GRANT ALL ON TABLE "public"."notification_settings" TO "anon";
GRANT ALL ON TABLE "public"."notification_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."notification_settings" TO "service_role";



GRANT ALL ON TABLE "public"."notifications" TO "anon";
GRANT ALL ON TABLE "public"."notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications" TO "service_role";



GRANT ALL ON TABLE "public"."otp_challenges" TO "anon";
GRANT ALL ON TABLE "public"."otp_challenges" TO "authenticated";
GRANT ALL ON TABLE "public"."otp_challenges" TO "service_role";



GRANT ALL ON TABLE "public"."otp_settings" TO "anon";
GRANT ALL ON TABLE "public"."otp_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."otp_settings" TO "service_role";



GRANT ALL ON TABLE "public"."permissions" TO "anon";
GRANT ALL ON TABLE "public"."permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."permissions" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."project_github_integrations" TO "anon";
GRANT ALL ON TABLE "public"."project_github_integrations" TO "authenticated";
GRANT ALL ON TABLE "public"."project_github_integrations" TO "service_role";



GRANT ALL ON TABLE "public"."project_milestones" TO "anon";
GRANT ALL ON TABLE "public"."project_milestones" TO "authenticated";
GRANT ALL ON TABLE "public"."project_milestones" TO "service_role";



GRANT ALL ON TABLE "public"."project_progress_logs" TO "anon";
GRANT ALL ON TABLE "public"."project_progress_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."project_progress_logs" TO "service_role";



GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";



GRANT ALL ON TABLE "public"."role_audit_logs" TO "anon";
GRANT ALL ON TABLE "public"."role_audit_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."role_audit_logs" TO "service_role";



GRANT ALL ON TABLE "public"."role_permissions" TO "anon";
GRANT ALL ON TABLE "public"."role_permissions" TO "authenticated";
GRANT ALL ON TABLE "public"."role_permissions" TO "service_role";



GRANT ALL ON TABLE "public"."role_policies" TO "anon";
GRANT ALL ON TABLE "public"."role_policies" TO "authenticated";
GRANT ALL ON TABLE "public"."role_policies" TO "service_role";



GRANT ALL ON TABLE "public"."roles" TO "anon";
GRANT ALL ON TABLE "public"."roles" TO "authenticated";
GRANT ALL ON TABLE "public"."roles" TO "service_role";



GRANT ALL ON TABLE "public"."session_policies" TO "anon";
GRANT ALL ON TABLE "public"."session_policies" TO "authenticated";
GRANT ALL ON TABLE "public"."session_policies" TO "service_role";



GRANT ALL ON TABLE "public"."site_settings" TO "anon";
GRANT ALL ON TABLE "public"."site_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."site_settings" TO "service_role";



GRANT ALL ON TABLE "public"."skill_categories" TO "anon";
GRANT ALL ON TABLE "public"."skill_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_categories" TO "service_role";



GRANT ALL ON TABLE "public"."skill_category_relations" TO "anon";
GRANT ALL ON TABLE "public"."skill_category_relations" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_category_relations" TO "service_role";



GRANT ALL ON TABLE "public"."skill_experiences" TO "anon";
GRANT ALL ON TABLE "public"."skill_experiences" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_experiences" TO "service_role";



GRANT ALL ON TABLE "public"."skill_features" TO "anon";
GRANT ALL ON TABLE "public"."skill_features" TO "authenticated";
GRANT ALL ON TABLE "public"."skill_features" TO "service_role";



GRANT ALL ON TABLE "public"."skills" TO "anon";
GRANT ALL ON TABLE "public"."skills" TO "authenticated";
GRANT ALL ON TABLE "public"."skills" TO "service_role";



GRANT ALL ON TABLE "public"."sync_errors" TO "anon";
GRANT ALL ON TABLE "public"."sync_errors" TO "authenticated";
GRANT ALL ON TABLE "public"."sync_errors" TO "service_role";



GRANT ALL ON TABLE "public"."tasks" TO "anon";
GRANT ALL ON TABLE "public"."tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."tasks" TO "service_role";



GRANT ALL ON TABLE "public"."technologies" TO "anon";
GRANT ALL ON TABLE "public"."technologies" TO "authenticated";
GRANT ALL ON TABLE "public"."technologies" TO "service_role";



GRANT ALL ON TABLE "public"."trusted_devices" TO "anon";
GRANT ALL ON TABLE "public"."trusted_devices" TO "authenticated";
GRANT ALL ON TABLE "public"."trusted_devices" TO "service_role";



GRANT ALL ON TABLE "public"."user_roles" TO "anon";
GRANT ALL ON TABLE "public"."user_roles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_roles" TO "service_role";



GRANT ALL ON TABLE "public"."work_challenges" TO "anon";
GRANT ALL ON TABLE "public"."work_challenges" TO "authenticated";
GRANT ALL ON TABLE "public"."work_challenges" TO "service_role";



GRANT ALL ON TABLE "public"."work_details" TO "anon";
GRANT ALL ON TABLE "public"."work_details" TO "authenticated";
GRANT ALL ON TABLE "public"."work_details" TO "service_role";



GRANT ALL ON TABLE "public"."work_images" TO "anon";
GRANT ALL ON TABLE "public"."work_images" TO "authenticated";
GRANT ALL ON TABLE "public"."work_images" TO "service_role";



GRANT ALL ON TABLE "public"."work_responsibilities" TO "anon";
GRANT ALL ON TABLE "public"."work_responsibilities" TO "authenticated";
GRANT ALL ON TABLE "public"."work_responsibilities" TO "service_role";



GRANT ALL ON TABLE "public"."work_results" TO "anon";
GRANT ALL ON TABLE "public"."work_results" TO "authenticated";
GRANT ALL ON TABLE "public"."work_results" TO "service_role";



GRANT ALL ON TABLE "public"."work_skills" TO "anon";
GRANT ALL ON TABLE "public"."work_skills" TO "authenticated";
GRANT ALL ON TABLE "public"."work_skills" TO "service_role";



GRANT ALL ON TABLE "public"."work_solutions" TO "anon";
GRANT ALL ON TABLE "public"."work_solutions" TO "authenticated";
GRANT ALL ON TABLE "public"."work_solutions" TO "service_role";



GRANT ALL ON TABLE "public"."work_technologies" TO "anon";
GRANT ALL ON TABLE "public"."work_technologies" TO "authenticated";
GRANT ALL ON TABLE "public"."work_technologies" TO "service_role";



GRANT ALL ON TABLE "public"."works" TO "anon";
GRANT ALL ON TABLE "public"."works" TO "authenticated";
GRANT ALL ON TABLE "public"."works" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
