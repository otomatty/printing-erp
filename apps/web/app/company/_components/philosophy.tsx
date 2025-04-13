'use client';

import { motion } from 'framer-motion';
import Container from '~/components/custom/container';
export default function CompanyPhilosophy() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md mb-4 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h3
            className="text-2xl font-bold mb-4 text-primary text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Mission
          </motion.h3>
          <motion.p
            className="text-xl text-center mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            「確かな技術と対応力の総合印刷」
          </motion.p>
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            私たちは、単なる印刷物を提供するだけでなく、お客様の想いや目的を理解し、それを形にすることで、
            お客様とその先のお客様との間に価値あるコミュニケーションを創造することを使命としています。
          </motion.p>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            校正のやり取りや納品時ご来店難しい場合はこちらから伺わせていただきます。
            お気軽に電話やメールにてお問い合わせください。
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3
              className="text-2xl font-bold mb-4 text-primary text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Vision
            </motion.h3>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              「印刷を通じて、地域社会の発展と文化の向上に貢献する企業を目指します」
            </motion.p>
            <motion.p
              className="text-gray-600 mt-4"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              東日本大震災からの復興支援に感謝し、地域の皆様に貢献する印刷サービスを通じて、
              地域社会の発展に寄与していくことを目指しています。
            </motion.p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.h3
              className="text-2xl font-bold mb-4 text-primary text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Values
            </motion.h3>
            <motion.ul
              className="text-gray-600 space-y-2"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.li variants={itemVariants} className="flex items-start">
                <span className="text-primary font-bold mr-2">■</span>
                <span>
                  <span className="font-semibold">誠実:</span>{' '}
                  常にお客様に対して誠実に向き合い、信頼関係を構築します
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start">
                <span className="text-primary font-bold mr-2">■</span>
                <span>
                  <span className="font-semibold">品質:</span>{' '}
                  細部までこだわり、最高品質の製品とサービスを提供します
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start">
                <span className="text-primary font-bold mr-2">■</span>
                <span>
                  <span className="font-semibold">対応力:</span>{' '}
                  お客様のニーズに柔軟に対応し、最適なソリューションを提供します
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start">
                <span className="text-primary font-bold mr-2">■</span>
                <span>
                  <span className="font-semibold">感謝:</span>{' '}
                  復興支援への感謝を忘れず、地域に貢献する姿勢を持ち続けます
                </span>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
