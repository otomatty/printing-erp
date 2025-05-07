import Link from 'next/link';

export function PricingCTA() {
  return (
    <section className="py-16 bg-primary text-white text-center">
      <h2 className="text-3xl font-bold mb-4">まずは無料で始める</h2>
      <Link
        href="/auth/login"
        className="bg-white text-primary font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors"
      >
        無料登録する
      </Link>
    </section>
  );
}
