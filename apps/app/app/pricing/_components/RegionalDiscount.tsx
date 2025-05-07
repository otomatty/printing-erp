import React from 'react';
import Link from 'next/link';

export function RegionalDiscount() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">地域限定特典</h2>
        <p className="text-gray-600 mb-6">
          初回限定10%オフ、地元会員割引もご用意。
        </p>
        <Link
          href="/auth/login"
          className="bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-primary/90 transition-colors"
        >
          今すぐ登録して特典を利用
        </Link>
      </div>
    </section>
  );
}
