import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// ボタンの定義
export interface HeroButton {
  text: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  buttons?: HeroButton[];
  bgClass?: string; // 背景用Tailwindクラス
}

export function Hero({
  title,
  subtitle,
  buttons = [],
  bgClass = 'bg-gradient-to-r from-primary to-primary-foreground',
}: HeroProps) {
  return (
    <section className={`${bgClass} py-20 text-white`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl mb-6">{subtitle}</p>}
        {buttons.length > 0 && (
          <div className="flex justify-center gap-4 flex-wrap">
            {buttons.map((btn, idx) => {
              const btnClass =
                btn.variant === 'secondary'
                  ? 'inline-flex items-center bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white/20 transition'
                  : 'flex items-center bg-white text-primary font-semibold py-3 px-6 rounded-full opacity-90 hover:opacity-100 transition';
              if (btn.href) {
                return (
                  <Link
                    key={idx}
                    href={btn.href}
                    className={btnClass}
                    onClick={btn.onClick}
                  >
                    {btn.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                );
              }
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={btn.disabled}
                  onClick={btn.onClick}
                  className={btnClass}
                >
                  {btn.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
