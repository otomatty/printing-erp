'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}
export interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">よくある質問</h2>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={item.q} className="border rounded-lg">
              <button
                type="button"
                className="w-full flex justify-between items-center p-4 bg-white"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === idx && (
                <div className="p-4 bg-white text-gray-600 border-t">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
