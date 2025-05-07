import Link from 'next/link';
import type { ReactNode } from 'react';

export interface CaseItem {
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
}
export interface CasesGridProps {
  cases: CaseItem[];
}

export function CasesGrid({ cases }: CasesGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((c) => (
            <div
              key={c.title}
              className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{c.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.description}</p>
              <Link
                href="/contact"
                className="text-primary font-semibold hover:underline"
              >
                詳しく見る
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
