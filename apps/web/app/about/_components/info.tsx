'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '~/components/custom/container';

export default function CompanyInfo() {
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
      },
    }),
  };

  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* 左側: 基本情報 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <motion.h2
                className="text-3xl font-bold mb-8 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                基本情報
              </motion.h2>
              <table className="w-full border-collapse">
                <tbody>
                  <motion.tr
                    className="border-b border-gray-200"
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={tableRowVariants}
                  >
                    <th className="py-4 pr-4 text-left text-gray-600 align-top w-32">
                      会社名
                    </th>
                    <td className="py-4">ニイヌマ企画印刷</td>
                  </motion.tr>
                  <motion.tr
                    className="border-b border-gray-200"
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={tableRowVariants}
                  >
                    <th className="py-4 pr-4 text-left text-gray-600 align-top">
                      代表者
                    </th>
                    <td className="py-4">新沼 章一</td>
                  </motion.tr>
                  <motion.tr
                    className="border-b border-gray-200"
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={tableRowVariants}
                  >
                    <th className="py-4 pr-4 text-left text-gray-600 align-top">
                      設立
                    </th>
                    <td className="py-4">昭和60年12月(1985年)</td>
                  </motion.tr>

                  <motion.tr
                    className="border-b border-gray-200"
                    custom={4}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={tableRowVariants}
                  >
                    <th className="py-4 pr-4 text-left text-gray-600 align-top">
                      事業内容
                    </th>
                    <td className="py-4">
                      <motion.ul
                        className="list-disc list-inside space-y-1"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <li>各種印刷・製本</li>
                        <li>編集・デザイン</li>
                        <li>IT・デジタル</li>
                      </motion.ul>
                    </td>
                  </motion.tr>
                  <motion.tr
                    className="border-b border-gray-200"
                    custom={5}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={tableRowVariants}
                  >
                    <th className="py-4 pr-4 text-left text-gray-600 align-top">
                      所在地
                    </th>
                    <td className="py-4">
                      <motion.div className="flex items-center">
                        <MapPin
                          size={18}
                          className="mr-2 flex-shrink-0 text-primary"
                        />
                        <span>
                          〒022-0003
                          <br />
                          岩手県大船渡市盛町字みどり町4-12
                        </span>
                      </motion.div>
                    </td>
                  </motion.tr>
                  <motion.tr
                    className="border-b border-gray-200"
                    custom={6}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={tableRowVariants}
                  >
                    <th className="py-4 pr-4 text-left text-gray-600 align-top">
                      連絡先
                    </th>
                    <td className="py-4">
                      <div className="space-y-2">
                        <motion.div className="flex items-center">
                          <Phone
                            size={18}
                            className="mr-2 flex-shrink-0 text-primary"
                          />
                          <span>電話/FAX: 0192-26-2160</span>
                        </motion.div>
                        <motion.div className="flex items-center">
                          <Mail
                            size={18}
                            className="mr-2 flex-shrink-0 text-primary"
                          />
                          <span>メール: nkikaku@crocus.ocn.ne.jp</span>
                        </motion.div>
                      </div>
                    </td>
                  </motion.tr>
                  <motion.tr
                    className="border-b border-gray-200"
                    custom={7}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={tableRowVariants}
                  >
                    <th className="py-4 pr-4 text-left text-gray-600 align-top">
                      営業時間
                    </th>
                    <td className="py-4">
                      <motion.div className="flex items-center">
                        <Clock
                          size={18}
                          className="mr-2 flex-shrink-0 text-primary"
                        />
                        <span>9:00〜18:00（定休日: 日・祝日）</span>
                      </motion.div>
                    </td>
                  </motion.tr>
                </tbody>
              </table>
            </motion.div>

            {/* 右側: 写真と会社概要の縦方向グリッド */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col h-full justify-between"
            >
              {/* 右上: オフィスの写真（大きく表示） */}
              <motion.div
                className="flex-grow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative w-full h-full min-h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src="/images/office.webp"
                    alt="ニイヌマ企画印刷のオフィス"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>

              {/* 右下: 会社概要 */}
              <motion.div
                className="bg-gray-50 p-6 rounded-lg mt-4 md:mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.h3
                  className="text-xl font-bold mb-4 text-gray-800"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  ニイヌマ企画印刷について
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  ニイヌマ企画印刷は1985年の創業以来、お客様のコミュニケーションを支える印刷のプロとして成長してきました。
                  各種印刷・製本、編集・デザインなど、印刷にかかわることならなんでもお受けします。
                </motion.p>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  2011年3月東日本大震災で当社も被災(大規模半壊)し、一時は諦めかけましたが、市や県内外の皆様の支援のおかげで営業再開することが出来ました。
                  私たちの仕事を通じてこのご恩に報いたいと思います。
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
