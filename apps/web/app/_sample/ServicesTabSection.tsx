'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Component } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '@/data/servicesData';
import { ServiceItem, type ServiceCategory } from '@/types/serviceTypes';
import Container from '~/components/custom/container';
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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } },
};

// カテゴリごとのテーマカラー (Tailwindクラス)
const themeClasses = {
  sky: {
    tabActive: 'border-sky-500 text-sky-600',
    tabInactive:
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    iconBg: 'bg-sky-100 text-sky-600',
    iconHover: 'group-hover:bg-sky-500 group-hover:text-white',
    link: 'text-sky-600 hover:text-sky-700',
  },
  emerald: {
    tabActive: 'border-emerald-500 text-emerald-600',
    tabInactive:
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    iconBg: 'bg-emerald-100 text-emerald-600',
    iconHover: 'group-hover:bg-emerald-500 group-hover:text-white',
    link: 'text-emerald-600 hover:text-emerald-700',
  },
  fuchsia: {
    tabActive: 'border-fuchsia-500 text-fuchsia-600',
    tabInactive:
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    iconBg: 'bg-fuchsia-100 text-fuchsia-600',
    iconHover: 'group-hover:bg-fuchsia-500 group-hover:text-white',
    link: 'text-fuchsia-600 hover:text-fuchsia-700',
  },
};

export default function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 選択されたカテゴリに基づいてサービスをフィルタリング
  const filteredServices =
    selectedCategory === 'all'
      ? servicesData.flatMap((category) =>
          category.items.filter((item) => item.href)
        )
      : servicesData
          .find((category) => category.id === selectedCategory)
          ?.items.filter((item) => item.href) || [];

  // カテゴリデータを取得 (テーマカラーなどに使用)
  const getCategory = (serviceId: string): ServiceCategory | undefined => {
    return servicesData.find((cat) =>
      cat.items.some((item) => item.id === serviceId)
    );
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          サービス紹介
        </motion.h2>

        <div className="mb-12 border-b border-gray-200">
          <nav
            className="-mb-px flex justify-center space-x-6 sm:space-x-8"
            aria-label="Tabs"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                selectedCategory === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              すべて
            </button>
            {servicesData.map((category) => {
              const theme =
                themeClasses[category.themeColor as keyof typeof themeClasses];
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                    selectedCategory === category.id
                      ? theme.tabActive
                      : theme.tabInactive
                  }`}
                >
                  {category.title}
                </button>
              );
            })}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {filteredServices.map((service) => {
              const category = getCategory(service.id as string);
              const theme = category
                ? themeClasses[category.themeColor as keyof typeof themeClasses]
                : themeClasses.sky;
              const Icon = service.icon || Component;
              return (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col group"
                  variants={item}
                  layout
                >
                  <div
                    className={`p-6 flex justify-center items-center ${theme.iconBg} ${theme.iconHover} transition-colors duration-300`}
                  >
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-semibold text-base mb-2 text-gray-800">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-4 flex-grow">
                      {service.shortDescription}
                    </p>
                    <Link
                      href={service.href ?? '#'}
                      className="mt-auto group"
                      passHref
                    >
                      <button
                        type="button"
                        className={`w-full inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${theme.link} bg-transparent hover:opacity-80 
														${
                              category?.themeColor === 'sky'
                                ? 'hover:bg-sky-50'
                                : category?.themeColor === 'emerald'
                                  ? 'hover:bg-emerald-50'
                                  : category?.themeColor === 'fuchsia'
                                    ? 'hover:bg-fuchsia-50'
                                    : 'hover:bg-gray-50'
                            }`}
                      >
                        詳しく見る
                        <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                          <ChevronRight size={14} />
                        </span>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/services"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors font-medium"
          >
            サービス一覧へ
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
