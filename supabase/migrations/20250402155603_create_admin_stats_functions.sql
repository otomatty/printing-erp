-- supabase/migrations/20250402155603_create_admin_stats_functions.sql

CREATE OR REPLACE FUNCTION get_daily_admin_stats(start_date timestamptz, end_date timestamptz)
RETURNS TABLE (
    stat_date date,
    new_users bigint,
    active_users bigint,
    contacts bigint
)
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
    ds.day::date,
    COALESCE(dnu.count, 0) AS new_users,
    COALESCE(dau.count, 0) AS active_users,
    COALESCE(dc.count, 0) AS contacts
  FROM date_series ds
  LEFT JOIN daily_new_users dnu ON ds.day = dnu.day
  LEFT JOIN daily_active_users dau ON ds.day = dau.day
  LEFT JOIN daily_contacts dc ON ds.day = dc.day
  ORDER BY ds.day;
END;
$$ LANGUAGE plpgsql;

-- さらに、総ユーザー数や未対応問い合わせ数などを取得する別の関数か、
-- 上記関数内でまとめて計算するロジックを追加することも検討できます。
-- 例えば、総ユーザー数と未対応問い合わせ数を計算する関数：
CREATE OR REPLACE FUNCTION get_overall_admin_stats()
RETURNS jsonb
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
$$ LANGUAGE plpgsql;
