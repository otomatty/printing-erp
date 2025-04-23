-- マイグレーション: サブテーブルの print_inquiry_type をメインテーブルの inquiry_type に反映し、以降の同期を行う
BEGIN;

-- 1) 既存データを移行
UPDATE public.inquiries
SET inquiry_type = psi.print_inquiry_type
FROM public.print_services_inquiries AS psi
WHERE inquiries.id = psi.id
  AND psi.print_inquiry_type IS NOT NULL;

-- 2) 同期用関数を作成
CREATE OR REPLACE FUNCTION public.sync_inquiry_type_from_print()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  -- INSERT または更新時に main inquiries を更新
  UPDATE public.inquiries
  SET inquiry_type = NEW.print_inquiry_type
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- 3) トリガーを定義
DROP TRIGGER IF EXISTS trg_sync_inquiry_type_print ON public.print_services_inquiries;
CREATE TRIGGER trg_sync_inquiry_type_print
AFTER INSERT OR UPDATE OF print_inquiry_type ON public.print_services_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.sync_inquiry_type_from_print();

COMMIT;