'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Work = {
  id: string;
  title: string;
  category: string;
  displayCategory: string;
  description: string;
  client: string;
  image: string;
};

type RelatedWorksProps = {
  works: Work[];
};

export default function RelatedWorks({ works }: RelatedWorksProps) {
  if (works.length === 0) return null;

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl font-bold mb-8 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            関連する制作事例
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {works.map((work) => (
              <motion.div
                key={work.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
                variants={item}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2">
                    <motion.span
                      className="inline-block bg-primary/5 text-primary text-xs font-medium px-2 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      {work.displayCategory}
                    </motion.span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {work.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">{work.client}</div>
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Link
                        href={`/works/${work.id}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        詳細を見る <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
