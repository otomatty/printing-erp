'use client';

import { Printer, PaintBucket, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '~/components/custom/container';

export default function CompanyFeaturesSection() {
  // 複数要素のフェードインアニメーション用の設定
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          ニイヌマ企画印刷の強み
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            variants={item}
            whileHover={{
              y: -5,
              boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <motion.div
              className="bg-primary/5 p-3 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Printer size={32} className="text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3">確かな印刷技術</h3>
            <p className="text-gray-600">
              1985年創業以来培ってきた技術で、お客様の要望に応える高品質な印刷物をご提供します。
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            variants={item}
            whileHover={{
              y: -5,
              boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <motion.div
              className="bg-primary/5 p-3 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <PaintBucket size={32} className="text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3">柔軟な対応力</h3>
            <p className="text-gray-600">
              校正のやり取りや納品時にご来店が難しい場合はこちらから伺います。お客様のニーズに合わせた柔軟な対応を心がけています。
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            variants={item}
            whileHover={{
              y: -5,
              boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <motion.div
              className="bg-primary/5 p-3 rounded-full mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Award size={32} className="text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3">地域密着</h3>
            <p className="text-gray-600">
              東日本大震災での支援に感謝し、地域の皆様に貢献できる印刷サービスを提供し続けています。
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
