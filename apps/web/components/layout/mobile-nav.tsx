'use client';

import type React from 'react';
import Link from 'next/link';
import { ChevronDown, Phone } from 'lucide-react';
import { Button } from '@kit/ui/button';

// 型定義 (DesktopNav.tsx と同じものを使用)
type NavItemBase = {
  label: string;
  icon?: React.ElementType;
};
type NavItemWithChildren = NavItemBase & {
  href?: string;
  children: NavItemChild[];
};
type NavItemWithoutChildren = NavItemBase & {
  href: string;
  children?: never;
};
type NavItem = NavItemWithChildren | NavItemWithoutChildren;
type NavItemChild = {
  label: string;
  href: string;
  icon?: React.ElementType;
};

interface MobileNavProps {
  navItems: NavItem[];
  openAccordion: string | null;
  handleAccordionToggle: (label: string) => void;
  closeMenu: () => void;
  phoneNumber: string;
  telLink: string;
}

export default function MobileNav({
  navItems,
  openAccordion,
  handleAccordionToggle,
  closeMenu,
  phoneNumber,
  telLink,
}: MobileNavProps) {
  return (
    <nav className="lg:hidden bg-white dark:bg-background border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-1">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <button
                type="button"
                className="w-full flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-primary/90 dark:hover:text-primary/90 py-2 transition-colors group focus:outline-none"
                onClick={() => handleAccordionToggle(item.label)}
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-200 ${
                    openAccordion === item.label ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className="block relative text-gray-700 dark:text-gray-300 hover:text-primary/90 dark:hover:text-primary/90 py-2 transition-colors group w-fit"
                onClick={closeMenu}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            )}

            {item.children && openAccordion === item.label && (
              <div className="pl-4 pt-1 pb-2 space-y-1 border-l border-gray-200 dark:border-gray-700 ml-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors py-1"
                    onClick={closeMenu}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-2 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <Button asChild variant="outline" className="w-full" size="sm">
            <a
              href={telLink}
              onClick={closeMenu}
              className="flex items-center justify-center space-x-2"
            >
              <Phone size={16} />
              <span className="font-bold">{phoneNumber}</span>
            </a>
          </Button>
          <Button asChild variant="default" className="w-full" size="sm">
            <Link href="/contact" onClick={closeMenu}>
              お問い合わせ
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
