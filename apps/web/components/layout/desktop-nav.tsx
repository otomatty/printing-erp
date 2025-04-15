'use client';

import type React from 'react';
import type { MutableRefObject } from 'react';
import Link from 'next/link';
import { ChevronDown, Component } from 'lucide-react';

// 型定義を修正
type NavItemBase = {
  label: string;
  icon?: React.ElementType; // iconは子要素にしか使わないが、共通化のためBaseに含めても良い
};

type NavItemWithChildren = NavItemBase & {
  href?: string; // childrenがある場合はhrefはオプショナル
  children: NavItemChild[];
};

type NavItemWithoutChildren = NavItemBase & {
  href: string; // childrenがない場合はhrefは必須
  children?: never;
};

type NavItem = NavItemWithChildren | NavItemWithoutChildren;

type NavItemChild = {
  label: string;
  href: string;
  icon?: React.ElementType;
};

interface DesktopNavProps {
  navItems: NavItem[];
  openDropdown: string | null;
  handleDropdownToggle: (label: string) => void;
  dropdownRef: MutableRefObject<HTMLDivElement | null>;
  triggerRefs: MutableRefObject<{ [key: string]: HTMLButtonElement | null }>;
  setOpenDropdown: (label: string | null) => void; // ドロップダウンを閉じるため
}

export default function DesktopNav({
  navItems,
  openDropdown,
  handleDropdownToggle,
  dropdownRef,
  triggerRefs,
  setOpenDropdown,
}: DesktopNavProps) {
  return (
    <nav className="hidden lg:flex space-x-6">
      {navItems.map((item) => (
        <div key={item.label} className="relative">
          {item.children ? (
            <button
              type="button"
              ref={(el: HTMLButtonElement | null) => {
                if (el) {
                  triggerRefs.current[item.label] = el;
                } else {
                  delete triggerRefs.current[item.label];
                }
              }}
              className="flex items-center text-gray-700 hover:text-primary/90 transition-colors group focus:outline-none relative pb-1"
              onClick={() => handleDropdownToggle(item.label)}
            >
              {item.label}
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-200 ${
                  openDropdown === item.label ? 'rotate-180' : ''
                }`}
              />
              <span className="absolute left-0 bottom-[-4px] w-full h-0.5 bg-primary transition-all duration-300 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100" />
            </button>
          ) : (
            <Link
              href={item.href}
              className="relative text-gray-700 hover:text-primary/90 transition-colors group pb-1"
            >
              {item.label}
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          )}

          {item.children && openDropdown === item.label && (
            <div
              ref={dropdownRef}
              className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-max max-w-[90vw]  bg-white rounded-lg shadow-lg p-6 z-20 ring ring-gray-200 ring-opacity-5"
            >
              <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
                {item.children.map((child) => {
                  const Icon = child.icon || Component;
                  return (
                    <div key={child.href} className="group w-40">
                      <Link
                        href={child.href}
                        className="flex flex-col items-center text-center p-3 rounded-md hover:bg-gray-100 transition-colors h-full"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-md bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon size={20} strokeWidth={2} />
                        </div>
                        <p className="font-medium text-gray-900 text-sm group-hover:text-primary transition-colors leading-tight flex-grow">
                          {child.label}
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
