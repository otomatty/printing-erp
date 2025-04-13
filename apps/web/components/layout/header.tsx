'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Printer,
  Mail,
  FileText,
  Newspaper,
  BookOpen,
  Laptop,
  Database,
  Phone,
} from 'lucide-react';
import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';

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

const navItems: NavItem[] = [
  {
    label: '印刷',
    href: '/services#printing',
    children: [
      {
        label: '名刺・ハガキ・カード類',
        href: '/services/printing/meishi-hagaki-card',
        icon: Printer,
      },
      { label: '封筒印刷', href: '/services/printing/envelope', icon: Mail },
      {
        label: '伝票印刷',
        href: '/services/printing/denpyo',
        icon: FileText,
      },
      {
        label: 'チラシ・ポスター',
        href: '/services/printing/flyer-poster',
        icon: Newspaper,
      },
      {
        label: 'ページ物・製本',
        href: '/services/printing/page-bookbinding',
        icon: BookOpen,
      },
    ],
  },
  {
    label: 'IT・デジタル',
    href: '/services#it-digital',
    children: [
      {
        label: 'ホームページ制作',
        href: '/services/it-digital/homepage',
        icon: Laptop,
      },
      {
        label: '業務システム開発',
        href: '/services/it-digital/system',
        icon: Database,
      },
    ],
  },
  {
    label: '会社概要',
    href: '/company',
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const phoneNumber = '0192-26-2160';
  const telLink = `tel:${phoneNumber.replace(/-/g, '')}`; // tel:リンク用にハイフンを除去

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
    setOpenAccordion(null);
  };

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleAccordionToggle = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current?.contains(event.target as Node)) {
        return;
      }
      const clickedTrigger = Object.values(triggerRefs.current).some((ref) =>
        ref?.contains(event.target as Node)
      );
      if (clickedTrigger) {
        return;
      }
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {/* TODO: 会社ロゴを追加 */}
          <div className="text-xl font-bold text-primary">ニイヌマ企画印刷</div>
        </Link>

        {/* デスクトップ用のコンテナ */}
        <DesktopNav
          navItems={navItems}
          openDropdown={openDropdown}
          handleDropdownToggle={handleDropdownToggle}
          dropdownRef={dropdownRef}
          triggerRefs={triggerRefs}
          setOpenDropdown={setOpenDropdown}
        />

        <div className="hidden lg:flex items-center space-x-6">
          <a
            href={telLink}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
          >
            <Phone size={16} className="mr-1.5" />
            {phoneNumber}
          </a>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-md transition-colors"
          >
            お問い合わせ
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          aria-label="メニュー"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <MobileNav
          navItems={navItems}
          openAccordion={openAccordion}
          handleAccordionToggle={handleAccordionToggle}
          closeMenu={() => setIsMenuOpen(false)}
          phoneNumber={phoneNumber}
          telLink={telLink}
        />
      )}
    </header>
  );
}
