'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="pb-4 text-gray-600">{children}</div>
      </div>
    </div>
  );
}

type AccordionProps = {
  children: React.ReactNode;
  className?: string;
};

export function Accordion({ children, className = '' }: AccordionProps) {
  return (
    <div className={`divide-y divide-gray-200 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
