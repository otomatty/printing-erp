'use client';

import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

type Work = {
  id: string;
  title: string;
  category: string;
  displayCategory: string;
  description: string;
  fullDescription: string;
  client: string;
  date: string;
  services: string[];
  feedback?: string;
  image: string;
  galleryImages?: string[];
  tags: string[];
};

type WorkDetailProps = {
  work: Work;
};

// ぼかし画像のプレースホルダー用Base64
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default function WorkDetail({ work }: WorkDetailProps) {
  // 段落ごとに分割して空白行を削除
  const paragraphs = work.fullDescription
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // ギャラリー画像がない場合は、メイン画像を3回表示する
  const galleryImages =
    work.galleryImages && work.galleryImages.length > 0
      ? work.galleryImages
      : [work.image, work.image, work.image];

  // アニメーション設定
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* メインビジュアル */}
          <motion.div
            className="mb-12 relative h-[500px] rounded-lg overflow-hidden shadow-lg"
            variants={fadeIn}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </motion.div>

          {/* 基本情報 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <motion.div className="lg:col-span-2" variants={fadeIn}>
              <div className="mb-6">
                <motion.div
                  className="flex flex-wrap gap-2 mb-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {work.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={`${work.id}-tag-${tagIndex}`}
                      className="inline-block bg-primary/5 text-primary text-xs font-medium px-3 py-1 rounded-full"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-gray-800 mb-4"
                  variants={fadeIn}
                >
                  プロジェクト概要
                </motion.h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  {paragraphs.map((paragraph, pIndex) => (
                    <motion.p
                      key={`${work.id}-p-${pIndex}`}
                      className="mb-4"
                      variants={fadeIn}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + pIndex * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-6 rounded-lg h-fit shadow-sm"
              variants={fadeIn}
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <motion.h3
                className="text-xl font-bold text-gray-800 mb-4"
                variants={fadeIn}
              >
                プロジェクト情報
              </motion.h3>
              <div className="space-y-4">
                <motion.div className="flex items-start" variants={fadeIn}>
                  <User className="w-5 h-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">クライアント</p>
                    <p className="text-gray-700">{work.client}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start" variants={fadeIn}>
                  <Calendar className="w-5 h-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">制作時期</p>
                    <p className="text-gray-700">{work.date}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start" variants={fadeIn}>
                  <Tag className="w-5 h-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">提供サービス</p>
                    <ul className="text-gray-700">
                      {work.services.map((service, serviceIndex) => (
                        <motion.li
                          key={`${work.id}-service-${serviceIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.5 + serviceIndex * 0.1,
                            duration: 0.6,
                          }}
                        >
                          {service}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ギャラリー画像 */}
          <motion.div className="mb-12" variants={fadeIn}>
            <motion.h2
              className="text-2xl font-bold text-gray-800 mb-6"
              variants={fadeIn}
            >
              ギャラリー
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {galleryImages.map((image, imgIndex) => (
                <motion.div
                  key={`${work.id}-img-${imgIndex}`}
                  className="relative h-60 rounded-lg overflow-hidden shadow-md"
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Image
                    src={image}
                    alt={`${work.title} - 画像 ${imgIndex + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* クライアントからのフィードバック（あれば表示） */}
          {work.feedback && (
            <motion.div
              className="bg-gray-50 p-8 rounded-lg border-l-4 border-primary"
              variants={fadeIn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-4"
                variants={fadeIn}
              >
                クライアントの声
              </motion.h2>
              <motion.p className="text-gray-600 italic" variants={fadeIn}>
                {work.feedback}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
