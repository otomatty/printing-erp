import type React from 'react';
import { Edit3, UploadCloud } from 'lucide-react';
import Container from '~/components/custom/container';
const EditingSupport: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          デザイン・編集・持ち込みも可能
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* デザイン・編集サポート */}
          <div className="bg-gray-50 h-full p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <div className="flex items-start mb-5">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="bg-primary/10 p-2 rounded-md inline-flex items-center justify-center">
                  <Edit3 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                デザイン・編集もお任せください
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              冊子制作が初めての方もご安心ください。企画・構成、デザイン作成、DTP編集、文字入力、図版作成など、トータルでサポートいたします。
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5 list-inside list-disc">
              <li>ページ番号（ノンブル）挿入</li>
              <li>目次作成</li>
              <li>画像の補正・調整</li>
              <li>レイアウト調整</li>
            </ul>
          </div>

          {/* 持ち込み製本 */}
          <div className="bg-gray-50 h-full p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
            <div className="flex items-start mb-5">
              <div className="flex-shrink-0 mr-4 mt-1">
                <div className="bg-primary/10 p-2 rounded-md inline-flex items-center justify-center">
                  <UploadCloud className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                持ち込み原稿の製本
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              お客様ご自身でプリントされた原稿や、他社で印刷された用紙の製本のみも承っております。
              少部数から対応可能です。
            </p>
            <ul className="text-sm text-gray-600 space-y-1.5 list-inside list-disc">
              <li>会議資料、セミナー資料</li>
              <li>文集、論文、研究レポート</li>
              <li>設計図、図面</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              ※ 原稿の状態によっては、追加の作業費が発生する場合がございます。
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EditingSupport;
