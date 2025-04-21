'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// サービスデータ
const services = [
  {
    id: 'printing',
    title: '印刷',
    shortDescription:
      'パンフレット、名刺、ポスターなど様々な印刷物を高品質で提供します。',
    image: '/images/printing.webp',
  },
  // {
  // 	id: "design",
  // 	title: "デザイン制作",
  // 	shortDescription: "お客様の目的に合わせた効果的なデザインを制作します。",
  // 	image: designImage,
  // },
  {
    id: 'it-digital',
    title: 'IT・デジタル',
    shortDescription:
      'ホームページ制作、システム開発、IT活用コンサルティングを提供します。',
    image: '/images/it-digital.webp',
  },
];

// アニメーション設定
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServicesOverview() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            お客様の想いを形にするサービス
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ニイヌマ企画印刷では、デザインから印刷まで一貫した体制で、お客様のご要望に沿った高品質なサービスを提供しています。
            長年の経験と最新の設備を活かし、お客様の課題解決をサポートいたします。
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              variants={item}
              whileHover={{
                y: -5,
                boxShadow:
                  '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-5">{service.shortDescription}</p>
                <Link
                  href={`#${service.id}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  詳しく見る <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
