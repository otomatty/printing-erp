import type React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { renderHighlightedText } from './highlight-text';
import type { Challenge } from './types';

interface ChallengeBubbleProps {
  currentChallenge: Challenge;
}

/**
 * チャレンジの吹き出しコンポーネント
 * アニメーション付きで課題とその例を表示する
 */
const ChallengeBubble: React.FC<ChallengeBubbleProps> = ({
  currentChallenge,
}) => {
  // 吹き出しアニメーションのバリアント定義
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // 子要素の表示を0.3秒ずつ遅らせる
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1, // 逆順に消えていく
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div className="mb-12 relative">
      {/* 画像と吹き出しのコンテナ (左右レイアウト) */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 max-w-5xl mx-auto">
        {/* 左側: 画像 */}
        <div className="w-80 h-80 flex-shrink-0 relative">
          <Image
            src={'/images/it-digital/worry-person.webp'}
            alt={`${currentChallenge?.category || '業務'}に悩む人のイメージ`}
            width={320}
            height={320}
            className="object-cover"
            priority
          />
        </div>

        {/* 右側: 吹き出しエリア (アニメーション) */}
        <div className="w-full relative md:min-h-[240px]">
          {/* カテゴリータイトル (アニメーション) */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={currentChallenge?.id || 'fallback-id'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold mb-4 text-gray-800"
            >
              <span className="inline-flex items-center gap-2">
                <div className="bg-primary/5 p-2 rounded-full">
                  {/* アイコンを安全にレンダリング */}
                  {currentChallenge && (
                    <currentChallenge.icon className="h-6 w-6 text-primary" />
                  )}
                </div>
                {currentChallenge?.category}
              </span>
            </motion.h3>
          </AnimatePresence>

          {/* 高さを画像に合わせる */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChallenge?.id || 'fallback-id'} // 一意のIDを使用
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4" // 縦に並べる
            >
              {currentChallenge?.examples?.map((example, index) => (
                <motion.div
                  key={`${currentChallenge.id}-example-${index}`} // より安全なキー
                  variants={itemVariants}
                  className="bg-white rounded-lg p-4 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="flex-1 text-sm md:text-base text-gray-700">
                      {renderHighlightedText(
                        example,
                        `${currentChallenge.id}-example-${index}`
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChallengeBubble;
