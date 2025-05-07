import Link from 'next/link';

export function ContactCTA() {
  return (
    <section className="py-16 bg-primary text-white text-center">
      <h2 className="text-3xl font-bold mb-4">あなたの事例を作りましょう</h2>
      <Link
        href="/auth/login"
        className="bg-white text-primary font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors"
      >
        今すぐ相談する
      </Link>
    </section>
  );
}
