'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
// サービスデータをインポート
import { servicesData } from '~/data/servicesData';
// 共通の型定義をインポート
import type {
  ServiceCategory,
  ServiceFeature,
  ServiceItem,
} from '~/types/serviceTypes';
import Container from '../custom/container';
import AdditionalInfo from './additional-info';

// アニメーション設定
const sectionVariants = {
  hidden: { opacity: 0, y: 30 }, // 少し移動距離を増やす
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 少しゆっくりに
      ease: 'easeOut', // イージング変更
    },
  },
};

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 子要素が順番に表示される間隔
      delayChildren: 0.2, // 親要素が表示されてから子要素が始まるまでの遅延
    },
  },
};

const listItemFadeInUp = {
  hidden: { opacity: 0, y: 20 }, // 少し移動距離を増やす
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ServiceDetails() {
  return (
    <section className="bg-gray-50">
      <h2 className="text-4xl font-bold text-center bg-gray-50 pt-16">
        サービス紹介
      </h2>{' '}
      {/* mb調整 */}
      {servicesData.map((service: ServiceCategory, index: number) => (
        <motion.div // セクション全体をアニメーション
          key={service.id}
          id={service.id}
          className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }} // 表示されるトリガー位置を少し調整
        >
          <Container>
            <div className="max-w-5xl mx-auto">
              {/* Grid Layout */}
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8 lg:mb-12" // mb調整
              >
                {/* Text Content Area */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  {/* Service Title */}
                  <h3 // Changed from h2 to h3
                    className="text-3xl font-bold mb-6 text-gray-800 flex items-center flex-wrap" // レスポンシブサイズ調整
                  >
                    {service.title}
                    {service.badge && (
                      <span className="ml-3 mt-1 px-3 py-1 bg-primary/5 text-primary text-sm font-semibold rounded-full">
                        {' '}
                        {/* Padding調整 */}
                        {service.badge}
                      </span>
                    )}
                  </h3>
                  {/* Service Description */}
                  <p
                    className="text-gray-600 mb-8 leading-relaxed" // mb, leading調整
                  >
                    {service.fullDescription}
                  </p>
                  {/* Features Title */}
                  <h4 // Changed from h3 to h4
                    className="text-xl lg:text-2xl font-semibold mb-4 text-gray-800" // レスポンシブサイズ調整
                  >
                    特徴
                  </h4>
                  {/* Features List */}
                  <motion.ul
                    className="space-y-3" // mb, space-y調整
                    variants={listContainer} // Use list container variants
                    // initial, whileInView, viewport は親の motion.div で制御されるため削除しても良いが、
                    // リスト自体が画面内に入ったタイミングでアニメーションさせたい場合は残す
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {service.features.map((feature: ServiceFeature) => (
                      <motion.li
                        key={feature.id}
                        className="flex items-start text-gray-700" // text色調整
                        variants={listItemFadeInUp} // Use item variant
                      >
                        <span className="text-primary mr-2 flex-shrink-0">
                          ●
                        </span>{' '}
                        {/* サイズ調整、マージン調整 */}
                        <span>{feature.text}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                {/* Image Area */}
                <div
                  className={`relative h-80 md:h-96 ${index % 2 === 1 ? 'lg:order-1' : ''}`} // レスポンシブ高さ調整
                >
                  <Image
                    src={service.image}
                    alt={`${service.title}のイメージ画像`} // より詳細なaltテキスト
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px" // sizes属性を追加
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg shadow-lg" // shadow調整
                  />
                </div>
              </div>

              {/* Service Items Section */}
              <div>
                <h4 // Changed from h3 to h4
                  className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8 text-gray-800" // レスポンシブサイズ、mb調整
                >
                  対応サービス一覧
                </h4>
                {/* Service Items Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" // gap調整
                  variants={listContainer} // Use list container variants
                  // initial, whileInView, viewport は親の motion.div で制御されるため削除しても良いが、
                  // グリッド自体が画面内に入ったタイミングでアニメーションさせたい場合は残す
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {service.items.map((serviceItem: ServiceItem) => (
                    <motion.div
                      key={serviceItem.id}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col" // hover shadow調整
                      variants={listItemFadeInUp} // Use item variant
                      whileHover={{
                        y: -6, // 少し持ち上げ量を増やす
                        boxShadow:
                          '0 12px 28px -8px rgba(0, 0, 0, 0.12), 0 10px 10px -8px rgba(0, 0, 0, 0.06)', // 影を調整
                      }}
                    >
                      {/* Service Item Title */}
                      {serviceItem.href ? (
                        <Link href={serviceItem.href} passHref>
                          <h5 className="text-lg font-bold text-primary mb-2 hover:underline">
                            {' '}
                            {/* Changed from h4 to h5, text size調整 */}
                            {serviceItem.name}
                          </h5>
                        </Link>
                      ) : (
                        <h5 className="text-lg font-bold text-primary mb-2">
                          {' '}
                          {/* Changed from h4 to h5, text size調整 */}
                          {serviceItem.name}
                        </h5>
                      )}
                      {/* Service Item Description */}
                      {Array.isArray(serviceItem.description) && (
                        <ul className="text-gray-600 text-sm list-disc list-inside space-y-1.5 mt-2 flex-grow">
                          {' '}
                          {/* mt, space-y調整, flex-grow追加 */}
                          {serviceItem.description.map(
                            (
                              point: string,
                              idx: number // Add index for key
                            ) => (
                              <li key={`${serviceItem.id}-desc-${idx}`}>
                                {' '}
                                {/* Use index in key */}
                                {point}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                      {typeof serviceItem.description === 'string' && ( // Handle string description case
                        <p className="text-gray-600 text-sm mt-2 flex-grow">
                          {' '}
                          {/* mt, flex-grow追加 */}
                          {serviceItem.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* IT導入補助金 Section (Conditional) */}
              {service.id === 'it-digital' && (
                <AdditionalInfo
                  type="it-subsidy"
                  showLink={true}
                  linkHref="/hojokin"
                  linkText="補助金特設ページはこちら"
                />
              )}

              {/* 印刷・デザイン一括対応 Section (Conditional) */}
              {service.id === 'printing' && (
                <AdditionalInfo type="print-design" />
              )}
            </div>
          </Container>
        </motion.div>
      ))}
    </section>
  );
}
