'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { cn } from '@kit/ui/utils';
import { motion } from 'framer-motion';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import { Button } from '@kit/ui/button';
import Link from 'next/link';

// 封筒データの型定義
interface EnvelopeSize {
  id: string;
  name: string;
  size: string; // 寸法 (mm)
  paperSize: string; // 入る用紙サイズ
  isStandard: boolean; // 定型内かどうか
  usage: string; // おすすめ用途
  description?: string; // 追加説明
  isPopular?: boolean; // 人気サイズかどうか
  type?: 'nagagata' | 'kakugata' | 'yogata'; // 封筒の種類
}

// タブの型定義
type EnvelopeCategory = 'nagagata' | 'kakugata' | 'yogata';

// 長形封筒のデータ
const nagagataEnvelopes: EnvelopeSize[] = [
  {
    id: 'naga-3',
    name: '長形3号（長3）',
    size: '120×235mm',
    paperSize: 'A4三つ折り',
    isStandard: true,
    usage: '請求書・納品書・通知書',
    isPopular: true,
    type: 'nagagata',
  },
  {
    id: 'naga-4',
    name: '長形4号（長4）',
    size: '90×205mm',
    paperSize: 'A4四つ折り・B5三つ折り',
    isStandard: true,
    usage: '給与明細・個人向け文書',
    isPopular: true,
    type: 'nagagata',
  },
  {
    id: 'naga-40',
    name: '長形40号（長40）',
    size: '90×225mm',
    paperSize: 'A4四つ折り・B5三つ折り',
    isStandard: true,
    usage: '通知書・各種案内',
    type: 'nagagata',
  },
  {
    id: 'naga-2',
    name: '長形2号（長2）',
    size: '119×277mm',
    paperSize: 'A4二つ折り',
    isStandard: false, // 定形外
    usage: '賞状・証書類',
    type: 'nagagata',
  },
  {
    id: 'naga-1',
    name: '長形1号（長1）',
    size: '120×332mm',
    paperSize: 'B4三つ折り',
    isStandard: false, // 定形外
    usage: '契約書・重要書類',
    type: 'nagagata',
  },
  {
    id: 'naga-3-window',
    name: '長形3号窓付き',
    size: '120×235mm',
    paperSize: 'A4三つ折り',
    isStandard: true,
    usage: '請求書・DM',
    isPopular: true,
    type: 'nagagata',
  },
];

// 角形封筒のデータ
const kakugataEnvelopes: EnvelopeSize[] = [
  {
    id: 'kaku-2',
    name: '角形2号（角2）',
    size: '240×332mm',
    paperSize: 'A4・B4（折らずに封入可）',
    isStandard: false, // 定形外
    usage: 'カタログ・資料・書類',
    isPopular: true,
    type: 'kakugata',
  },
  {
    id: 'kaku-20',
    name: '角形20号（角20）',
    size: '229×324mm',
    paperSize: 'A4（折らずに封入可）',
    isStandard: false, // 定形外
    usage: 'カタログ・A4書類',
    isPopular: true,
    type: 'kakugata',
  },
  {
    id: 'kaku-A4',
    name: '角形A4号',
    size: '228×312mm',
    paperSize: 'A4（折らずに封入可）',
    isStandard: false, // 定形外
    usage: 'カタログ・A4書類',
    type: 'kakugata',
  },
  {
    id: 'kaku-3',
    name: '角形3号（角3）',
    size: '216×277mm',
    paperSize: 'B5（折らずに封入可）',
    isStandard: false, // 定形外
    usage: 'パンフレット・中型書類',
    type: 'kakugata',
  },
  {
    id: 'kaku-4',
    name: '角形4号（角4）',
    size: '197×267mm',
    paperSize: 'B5（折らずに封入可）',
    isStandard: false, // 定形外
    usage: '社内書類・履歴書',
    type: 'kakugata',
  },
  {
    id: 'kaku-0',
    name: '角形0号（角0）',
    size: '287×382mm',
    paperSize: 'A3・B3（折らずに封入可）',
    isStandard: false, // 定形外
    usage: '大型図面・ポスター',
    type: 'kakugata',
  },
];

// 洋形封筒のデータ
const yogataEnvelopes: EnvelopeSize[] = [
  {
    id: 'yo-1',
    name: '洋形1号（洋1）',
    size: '120×176mm',
    paperSize: 'A4四つ折り',
    isStandard: true,
    usage: '招待状・グリーティングカード',
    isPopular: true,
    type: 'yogata',
  },
  {
    id: 'yo-2',
    name: '洋形2号（洋2）',
    size: '114×162mm',
    paperSize: 'A4六つ折り・B5四つ折り',
    isStandard: true,
    usage: '案内状・挨拶状',
    isPopular: true,
    type: 'yogata',
  },
  {
    id: 'yo-3',
    name: '洋形3号（洋3）',
    size: '98×148mm',
    paperSize: 'B5六つ折り・はがきサイズ',
    isStandard: true,
    usage: '個人用レター・小型案内状',
    type: 'yogata',
  },
  {
    id: 'yo-4',
    name: '洋形4号（洋4）',
    size: '90×205mm',
    paperSize: 'A4四つ折り・B5三つ折り',
    isStandard: true,
    usage: '各種案内・DM',
    type: 'yogata',
  },
  {
    id: 'yo-6',
    name: '洋形6号（洋6）',
    size: '98×190mm',
    paperSize: 'A4六つ折り',
    isStandard: true,
    usage: '招待状・個人用レター',
    type: 'yogata',
  },
  {
    id: 'you-long3',
    name: '洋長3号',
    size: '120×235mm',
    paperSize: 'A4三つ折り',
    isStandard: true,
    usage: 'ビジネス用・横型封筒',
    type: 'yogata',
  },
];

// アニメーション設定
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// 封筒のSVG表示コンポーネント
const EnvelopeShape: React.FC<{ envelope: EnvelopeSize }> = ({ envelope }) => {
  // サイズを解析（例：120×235mm → [120, 235]）
  const dimensions = envelope.size.replace('mm', '').split('×').map(Number);

  // サイズが解析できない場合のデフォルト値
  const width = dimensions[0] || 100;
  const height = dimensions[1] || 200;

  // 表示用のスケーリング（実寸を縮小して表示）- サイズ拡大
  const scale = Math.min(150 / Math.max(width, height), 1.4); // スケールを大きくして封筒サイズを拡大
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  // 窓付き封筒かどうかチェック
  const hasWindow = envelope.name.includes('窓付き');

  // 封筒のタイプに基づいて描画
  switch (envelope.type) {
    case 'nagagata':
      return (
        <div className="flex items-center justify-center h-40 w-36">
          <svg
            width={scaledWidth}
            height={scaledHeight}
            viewBox={`0 0 ${width} ${height}`}
            className="border border-gray-300"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            aria-labelledby={`envelope-title-${envelope.id}`}
          >
            <title id={`envelope-title-${envelope.id}`}>
              {envelope.name}の形状
            </title>

            {/* 長形封筒の本体 */}
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="#f5f5f5"
              stroke="#d1d5db"
              strokeWidth="1"
            />

            {/* フラップ部分（封をする台形） */}
            <path
              d={`M 0,0 L ${width * 0.1},${height / 12} L ${width * 0.9},${height / 12} L ${width},0 Z`}
              fill="#e5e7eb"
              stroke="#d1d5db"
              strokeWidth="1"
            />

            {/* 窓付きの場合は窓を描画 */}
            {hasWindow && (
              <rect
                x={width * 0.1}
                y={height * 0.3}
                width={width * 0.5}
                height={height * 0.2}
                fill="white"
                stroke="#d1d5db"
                strokeWidth="1"
              />
            )}

            {/* 封筒の折り目（装飾） */}
            <line
              x1="0"
              y1={height * 0.2}
              x2={width}
              y2={height * 0.2}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          </svg>
        </div>
      );

    case 'kakugata': {
      return (
        <div className="flex items-center justify-center h-40 w-36">
          <svg
            width={scaledWidth}
            height={scaledHeight}
            viewBox={`0 0 ${width} ${height}`}
            className="border border-gray-300"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            aria-labelledby={`envelope-title-${envelope.id}`}
          >
            <title id={`envelope-title-${envelope.id}`}>
              {envelope.name}の形状
            </title>

            {/* 角形封筒の本体 */}
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="#f5f5f5"
              stroke="#d1d5db"
              strokeWidth="1"
            />

            {/* フラップ部分（封をする台形） - 角形は上部にフラップ */}
            <path
              d={`M 0,0 L ${width * 0.08},${height / 15} L ${width * 0.92},${height / 15} L ${width},0 Z`}
              fill="#e5e7eb"
              stroke="#d1d5db"
              strokeWidth="1"
            />

            {/* 封筒の折り目（装飾） */}
            <line
              x1={width * 0.1}
              y1={height * 0.5}
              x2={width * 0.9}
              y2={height * 0.5}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      );
    }

    case 'yogata': {
      // 洋形は横向きが基本
      const isHorizontal = envelope.name.includes('洋長');
      const yogataWidth = isHorizontal ? width : height;
      const yogataHeight = isHorizontal ? height : width;

      return (
        <div className="flex items-center justify-center h-40 w-36">
          <svg
            width={isHorizontal ? scaledWidth : scaledHeight}
            height={isHorizontal ? scaledHeight : scaledWidth}
            viewBox={`0 0 ${yogataWidth} ${yogataHeight}`}
            className="border border-gray-300"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            aria-labelledby={`envelope-title-${envelope.id}`}
          >
            <title id={`envelope-title-${envelope.id}`}>
              {envelope.name}の形状
            </title>

            {/* 洋形封筒の本体 */}
            <rect
              x="0"
              y="0"
              width={yogataWidth}
              height={yogataHeight}
              fill="#f5f5f5"
              stroke="#d1d5db"
              strokeWidth="1"
            />

            {/* フラップ部分（封をする三角形） - 修正: 常に上部にフラップが来るように */}
            {/* 洋形封筒はすべて上部にフラップがある形に統一 */}
            <path
              d={`M 0,0 L ${yogataWidth / 2},${yogataHeight / 4} L ${yogataWidth},0 Z`}
              fill="#e5e7eb"
              stroke="#d1d5db"
              strokeWidth="1"
            />

            {/* 封筒の装飾 */}
            <line
              x1={yogataWidth * 0.1}
              y1={yogataHeight * 0.6}
              x2={yogataWidth * 0.9}
              y2={yogataHeight * 0.6}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          </svg>
        </div>
      );
    }

    default: {
      // デフォルトは長形封筒として表示
      return (
        <div className="flex items-center justify-center h-40 w-36">
          <svg
            width={scaledWidth}
            height={scaledHeight}
            viewBox={`0 0 ${width} ${height}`}
            className="border border-gray-300"
            aria-labelledby={`envelope-title-${envelope.id}`}
          >
            <title id={`envelope-title-${envelope.id}`}>
              {envelope.name}の形状
            </title>
            <rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="#f5f5f5"
              stroke="#d1d5db"
              strokeWidth="1"
            />
          </svg>
        </div>
      );
    }
  }
};

const EnvelopeCard: React.FC<{ envelope: EnvelopeSize }> = ({ envelope }) => {
  return (
    <motion.div
      variants={item}
      className="border rounded-lg shadow-sm p-5 h-full flex flex-col justify-between bg-white hover:shadow-md transition-shadow cursor-pointer relative"
    >
      <ResponsiveDialog
        trigger={
          <div className="flex h-full">
            {/* 左側: 封筒の形状表示 */}
            <EnvelopeShape envelope={envelope} />

            {/* 右側: 封筒情報 */}
            <div className="flex-1 pl-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {envelope.name}
              </h3>

              <p className="text-sm text-gray-600 mb-2">
                {envelope.paperSize}が入ります
              </p>

              {/* サイズ表記を上部に移動 */}
              <p className="text-sm text-gray-700 font-semibold mb-3">
                {envelope.size}
              </p>

              <div className="flex flex-wrap gap-2">
                <span
                  className={cn(
                    'text-xs px-2 py-1 rounded-full',
                    envelope.isStandard
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  )}
                >
                  {envelope.isStandard ? '定型内' : '定形外'}
                </span>

                {envelope.usage.split('・').map((use, index) => (
                  <span
                    key={`${envelope.id}-use-${index}`}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
        title={envelope.name}
        description="封筒の詳細情報"
        contentClassName="sm:max-w-[550px]"
      >
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <EnvelopeDetail envelope={envelope} />
        </div>
      </ResponsiveDialog>

      {/* 右下の三角形装飾 */}
      <div
        className="absolute bottom-0 right-0 w-0 h-0 border-t-0 border-r-[20px] border-b-[20px] border-l-0 border-transparent border-r-gray-200 border-b-gray-200"
        aria-hidden="true"
      />
    </motion.div>
  );
};

// 封筒詳細コンポーネント
const EnvelopeDetail: React.FC<{ envelope: EnvelopeSize }> = ({ envelope }) => {
  return (
    <div className="py-4">
      {/* 封筒の形状を上部に大きく表示 */}
      <div className="flex justify-center mb-6">
        <div className="scale-150 transform">
          <EnvelopeShape envelope={envelope} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">サイズ</h4>
          <p className="text-lg font-semibold">{envelope.size}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">型番</h4>
          <p className="text-lg font-semibold">{envelope.name}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">入る用紙</h4>
          <p className="text-lg font-semibold">{envelope.paperSize}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">定型区分</h4>
          <p className="text-lg font-semibold">
            {envelope.isStandard ? '定型内' : '定形外'}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-500">おすすめ用途</h4>
        <div className="flex flex-wrap gap-2 mt-1">
          {envelope.usage.split('・').map((use, index) => (
            <span
              key={`detail-${envelope.id}-use-${index}`}
              className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {use}
            </span>
          ))}
        </div>
      </div>

      {envelope.description && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500">追加情報</h4>
          <p className="text-gray-700 mt-1">{envelope.description}</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium mb-2">印刷時の注意点</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>封筒の色や紙質によって印刷の仕上がりが異なります</li>
          <li>窓付き封筒は窓の位置に合わせたデザインをご検討ください</li>
          <li>
            {envelope.isStandard
              ? '定型郵便物として郵送可能です'
              : '定形外郵便料金が適用されます'}
          </li>
          <li>大量注文の場合は別途お見積りいたします</li>
        </ul>
      </div>

      {/* ボタンをダイアログ全体の下部に配置 */}
      <div className="mt-8">
        <Button className="w-full py-6 text-base" asChild>
          <Link
            href={`/contact?printingType=envelope&envelopeType=${envelope.name}&envelopeSize=${envelope.size}`}
          >
            この封筒で印刷を依頼する
          </Link>
        </Button>
      </div>
    </div>
  );
};

const EnvelopeTypes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EnvelopeCategory>('nagagata');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          封筒サイズガイド
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          一般的な封筒の種類と規格をご紹介します。用途や収納する書類に合わせて最適な封筒をお選びください。
          特殊サイズや独自デザインの封筒も承っております。
        </p>

        <Tabs
          defaultValue="nagagata"
          className="max-w-5xl mx-auto"
          onValueChange={(value) => setActiveTab(value as EnvelopeCategory)}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="nagagata">長形封筒</TabsTrigger>
            <TabsTrigger value="kakugata">角形封筒</TabsTrigger>
            <TabsTrigger value="yogata">洋形封筒</TabsTrigger>
          </TabsList>

          <TabsContent value="nagagata">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                長形封筒について
              </h3>
              <p className="text-gray-600">
                縦長の和封筒。主にビジネス文書の送付に使用されます。A4用紙を三つ折りにして入れるサイズが一般的です。
              </p>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
            >
              {nagagataEnvelopes.map((envelope) => (
                <EnvelopeCard key={envelope.id} envelope={envelope} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="kakugata">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                角形封筒について
              </h3>
              <p className="text-gray-600">
                大きめの四角い封筒。A4やB5サイズの書類を折らずに封入できます。書類やカタログの送付に最適です。
              </p>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
            >
              {kakugataEnvelopes.map((envelope) => (
                <EnvelopeCard key={envelope.id} envelope={envelope} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="yogata">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                洋形封筒について
              </h3>
              <p className="text-gray-600">
                西洋風の封筒で、主に招待状や案内状などに使用されます。フラップ（封）が三角形のデザインが特徴です。
              </p>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
            >
              {yogataEnvelopes.map((envelope) => (
                <EnvelopeCard key={envelope.id} envelope={envelope} />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EnvelopeTypes;
