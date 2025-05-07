import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HomeContact() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* SVG斜めラインパターン */}
      <div className="absolute inset-0">
        <svg
          aria-hidden="true"
          width="100%"
          height="100%"
          className="opacity-10"
        >
          <defs>
            <pattern
              id="diagonalLines"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y="0" x2="0" y2="40" stroke="#ccc" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>
      <div className="relative container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4 text-primary">
            もっと詳しく知りたいですか？
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            ニイヌマ企画印刷のオンライン入稿・管理システムについて、詳しい情報をお求めの方はお気軽にお問い合わせください。
          </p>
        </div>
        <div className="text-center md:text-right">
          <Link
            href="/contact"
            className="inline-flex items-center bg-primary text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
          >
            お問い合わせ
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
