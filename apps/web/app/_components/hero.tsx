'use client';

import Link from 'next/link';
import { ChevronRight, Image as ImageIcon, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedGridPattern } from '~/components/custom/animated-grid-pattern';
export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:h-[70vh] w-full flex items-center justify-center overflow-hidden py-12 md:py-16 lg:py-0">
      {/* プレースホルダー画像 */}
      <motion.div
        className="absolute inset-0 z-0 bg-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatedGridPattern className="absolute inset-0" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            確かな技術と対応力の
            <br className="sm:hidden" />
            <span className="inline sm:hidden"> </span>
            総合印刷
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            各種印刷・製本、編集・デザインなど、
            <br className="hidden md:block" />
            印刷にかかわることならなんでもお受けします！
            <br className="hidden md:block" />
            ご相談や見積もり無料！
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 sm:px-6 py-2.5 md:py-3 rounded-md transition-colors font-medium text-base md:text-lg inline-flex items-center justify-center"
              >
                お問い合わせ{' '}
                <ChevronRight className="ml-1.5 md:ml-2" size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/services"
                className="bg-white text-primary hover:bg-gray-100 px-5 sm:px-6 py-2.5 md:py-3 rounded-md transition-colors font-medium text-base md:text-lg inline-flex items-center justify-center"
              >
                サービス紹介{' '}
                <ChevronRight className="ml-1.5 md:ml-2" size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
