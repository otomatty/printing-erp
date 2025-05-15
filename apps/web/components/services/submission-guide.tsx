import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Phone, Mail, UploadCloud, Building, ExternalLink } from 'lucide-react'; // ExternalLink アイコンを追加
import Container from '../custom/container';
const SubmissionGuide: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 md:mb-12">
          ご入稿・ご相談について
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 直接持ち込み - 1行目、横幅いっぱい */}
          <Card className="flex flex-col md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-semibold">
                直接お持ち込み
              </CardTitle>
              <Building className="w-6 h-6 text-primary" />
            </CardHeader>
            <CardContent className="flex-grow text-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">一番確実な方法です！</p>
                  <p className="mb-2">
                    印刷データや原稿を直接店舗までお持ちください。
                  </p>
                  <p className="mb-4">
                    経験豊富なスタッフが、その場でデータを確認し、最適な印刷方法をご提案します。細かなご要望も直接お伺いできますので、安心してお任せいただけます。
                  </p>
                  <p className="mb-2 text-sm text-muted-foreground">
                    所在地: 〒022-0003 岩手県大船渡市盛町字みどり町4-12
                  </p>
                  <p className="mb-2 text-sm text-muted-foreground">
                    ※ご来店の際は、事前にご連絡いただけるとスムーズです。
                  </p>

                  <p className="text-sm text-muted-foreground">
                    駐車場がありますので、お車でのご来店も可能です。
                  </p>
                </div>
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.9520469562613!2d141.71424299999998!3d39.084790000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f88a0d4d07c3ba7%3A0x550fde9c9db73988!2z44OL44Kk44OM44Oe5LyB55S75Y2w5Yi3!5e0!3m2!1sja!2sjp!4v1743004189589!5m2!1sja!2sjp"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="印刷会社の地図"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* メール入稿 - 2行目 */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-semibold">
                メールで入稿
              </CardTitle>
              <Mail className="w-6 h-6 text-primary" />
            </CardHeader>
            <CardContent className="flex-grow f text-md">
              <p className="mb-2">
                比較的軽いデータ（目安：10MB以下）は、メール添付でお送りいただけます。
              </p>
              <p className="mb-2">
                下記のメールアドレスから自動的にメールの例文が作成されます。
              </p>
              <div className="flex items-center mb-4">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a
                  href={`mailto:nkikaku@crocus.ocn.ne.jp?subject=${encodeURIComponent('印刷データ入稿')}&body=${encodeURIComponent('印刷会社 御担当者様\n\nお世話になります。\n\n印刷データを入稿いたします。\n\n■お名前:\n■ご連絡先:\n■ファイル名:\n■備考:\n\nご確認よろしくお願いいたします。')}`}
                  className="text-md md:text-xl font-semibold text-gray-800 hover:underline break-all"
                >
                  nkikaku@crocus.ocn.ne.jp
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                ※件名に「印刷データ入稿」とご記載ください。
              </p>
            </CardContent>
          </Card>

          {/* ファイル転送サービス - 2行目 */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-semibold">
                ファイル転送サービス
              </CardTitle>
              <UploadCloud className="w-6 h-6 text-primary" />
            </CardHeader>
            <CardContent className="flex-grow text-md">
              <p className="mb-2">
                容量の大きいデータ（目安：10MB超）は、
                <a
                  href="https://gigafile.nu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mx-1 inline-flex items-center"
                >
                  ギガファイル便
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
                などのファイル転送サービスをご利用ください。
              </p>
              <p className="mb-4">
                アップロード後、発行されるダウンロードURLを下記のメールアドレス宛にお知らせください。
              </p>
              <div className="flex items-center mb-4">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a
                  href={`mailto:nkikaku@crocus.ocn.ne.jp?subject=${encodeURIComponent('印刷データ入稿')}&body=${encodeURIComponent('印刷会社 御担当者様\n\nお世話になります。\n\n印刷データを入稿いたします。\n\n■お名前:\n■ご連絡先:\n■転送サービスURL:\n■ファイル名:\n■備考:\n\nご確認よろしくお願いいたします。')}`}
                  className="text-md md:text-xl font-semibold text-gray-800 hover:underline break-all"
                >
                  nkikaku@crocus.ocn.ne.jp
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                ※メール本文にお名前とご連絡先を必ずご明記ください。
              </p>
            </CardContent>
          </Card>

          {/* 電話相談 - 3行目、横幅いっぱい */}
          <Card className="flex flex-col md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-semibold">
                お電話でのご相談
              </CardTitle>
              <Phone className="w-6 h-6 text-primary" />
            </CardHeader>
            <CardContent className="flex-grow text-md">
              <p className="mb-2">
                「データ作成方法がわからない」「どの印刷方法が良いか迷っている」など、どんなことでもお気軽にお電話ください。
              </p>
              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <a
                  href="tel:0192-26-2160"
                  className="text-xl font-semibold text-gray-800 hover:underline"
                >
                  0192-26-2160
                </a>
              </div>
              <p className="mb-4">
                専門スタッフが丁寧にお話を伺い、お客様の状況に合わせた最適な方法をご案内いたします。
              </p>
              <p className="text-sm text-muted-foreground">
                受付時間: 平日 9:00～18:00
              </p>
            </CardContent>
          </Card>
        </div>
        <p className="text-center text-md text-muted-foreground mt-8 md:mt-12">
          ご不明な点がございましたら、まずはお気軽にお問い合わせください。
        </p>
      </Container>
    </section>
  );
};

export default SubmissionGuide;
