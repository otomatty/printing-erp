import type { ReactNode } from 'react';
import type { CategoryId } from '~/config/category.config';
import {
  MessageSquare,
  Calculator,
  FileText,
  Users,
  PenTool,
  ClipboardCheck,
  FileEdit,
  Printer,
  Package,
  Truck,
  CreditCard,
  DollarSign,
  BarChart,
  Sliders,
  Newspaper,
  Bell,
  Settings,
  Calendar,
  Mail,
  QrCode,
} from 'lucide-react';

/**
 * メニュー項目のステータス定義
 */
export type MenuItemStatus =
  | 'available'
  | 'unavailable'
  | 'coming-soon'
  | 'demo';

/**
 * メニュー項目の型定義
 * ReactNode でアイコンの JSX、iconSrc で画像パスも指定可能
 */
export interface MenuItem {
  href: string;
  title: string;
  icon?: ReactNode;
  iconSrc?: string;
  category: CategoryId;
  status?: MenuItemStatus;
  external?: boolean;
}

/**
 * 実際のメニューデータ
 */
export const menuItems: MenuItem[] = [
  // 営業受注カテゴリ
  {
    href: '/inquiries',
    title: 'お問い合わせ',
    icon: <MessageSquare className="h-6 w-6" />,
    category: 'sales',
    status: 'available',
  },
  {
    href: '/quotes',
    title: '見積',
    icon: <Calculator className="h-6 w-6" />,
    category: 'sales',
    status: 'demo',
  },
  {
    href: '/orders',
    title: '受注',
    icon: <FileText className="h-6 w-6" />,
    category: 'sales',
    status: 'demo',
  },
  {
    href: '/customers',
    title: '顧客',
    icon: <Users className="h-6 w-6" />,
    category: 'sales',
    status: 'demo',
  },

  // 制作デザインカテゴリ
  {
    href: '/design',
    title: 'デザイン',
    icon: <PenTool className="h-6 w-6" />,
    category: 'design',
    status: 'unavailable',
  },
  {
    href: '/proofing',
    title: '校正',
    icon: <ClipboardCheck className="h-6 w-6" />,
    category: 'design',
    status: 'unavailable',
  },
  {
    href: '/contents',
    title: 'データ管理',
    icon: <FileEdit className="h-6 w-6" />,
    category: 'design',
    status: 'unavailable',
  },

  // 製造印刷カテゴリ
  {
    href: '/production',
    title: '印刷作業',
    icon: <Printer className="h-6 w-6" />,
    category: 'production',
    status: 'demo',
  },
  {
    href: '/inventory',
    title: '在庫',
    icon: <Package className="h-6 w-6" />,
    category: 'production',
    status: 'demo',
  },
  {
    href: '/quality',
    title: '品質検査',
    icon: <ClipboardCheck className="h-6 w-6" />,
    category: 'production',
    status: 'unavailable',
  },

  // 出荷請求カテゴリ
  {
    href: '/shipping',
    title: '出荷',
    icon: <Truck className="h-6 w-6" />,
    category: 'shipping',
    status: 'unavailable',
  },
  {
    href: '/billing',
    title: '請求',
    icon: <CreditCard className="h-6 w-6" />,
    category: 'shipping',
    status: 'demo',
  },
  {
    href: '/payments',
    title: '入金',
    icon: <DollarSign className="h-6 w-6" />,
    category: 'shipping',
    status: 'demo',
  },

  // ホームページ管理カテゴリ
  {
    href: '/website/news',
    title: 'お知らせ',
    icon: <Newspaper className="h-6 w-6" />,
    category: 'website',
    status: 'available',
  },
  {
    href: '/website/topics',
    title: '特集記事',
    icon: <FileEdit className="h-6 w-6" />,
    category: 'website',
    status: 'available',
  },
  {
    href: '/website/analytics',
    title: 'アクセス解析',
    icon: <BarChart className="h-6 w-6" />,
    category: 'website',
    status: 'available',
  },
  {
    href: '/website/settings',
    title: 'サイト設定',
    icon: <Sliders className="h-6 w-6" />,
    category: 'website',
    status: 'unavailable',
  },

  // 開発カテゴリ
  {
    href: '/development/task-logs',
    title: '作業記録',
    icon: <FileText className="h-6 w-6" />,
    category: 'development',
    status: 'available',
  },
  {
    href: '/development/milestones',
    title: 'マイルストーン',
    icon: <Calendar className="h-6 w-6" />,
    category: 'development',
    status: 'available',
  },
  {
    href: '/development/requests',
    title: '要望',
    icon: <ClipboardCheck className="h-6 w-6" />,
    category: 'development',
    status: 'available',
  },
  {
    href: '/development/costs',
    title: 'コストと効果',
    icon: <BarChart className="h-6 w-6" />,
    category: 'development',
    status: 'available',
  },

  // Googleカテゴリ (外部リンク、画像アイコン対応)
  {
    href: 'https://calendar.google.com/',
    title: 'カレンダー',
    iconSrc: '/images/google/google-calendar-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://mail.google.com/',
    title: 'メール',
    iconSrc: '/images/google/gmail-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://drive.google.com/',
    title: 'ドライブ',
    iconSrc: '/images/google/google-drive-color-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://docs.google.com/',
    title: 'ドキュメント',
    iconSrc: '/images/google/google-docs-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://sheets.google.com/',
    title: 'スプレッドシート',
    iconSrc: '/images/google/google-sheets-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://slides.google.com/',
    title: 'スライド',
    iconSrc: '/images/google/google-slides-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://meet.google.com/',
    title: 'Meet',
    iconSrc: '/images/google/google-meet-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://chat.google.com/',
    title: 'チャット',
    iconSrc: '/images/google/google-chat-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://business.google.com/',
    title: 'ビジネスプロフィール',
    iconSrc: '/images/google/google-my-business-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://analytics.google.com/',
    title: 'Analytics',
    iconSrc: '/images/google/google-analytics-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },
  {
    href: 'https://ads.google.com/',
    title: '広告',
    iconSrc: '/images/google/google-ads-icon.svg',
    category: 'google',
    status: 'available',
    external: true,
  },

  // ツールカテゴリ
  {
    href: '/tools/qr-code',
    title: 'QRコード生成',
    icon: <QrCode className="h-6 w-6" />,
    category: 'tools',
    status: 'available',
  },

  // システム管理カテゴリ
  {
    href: '/notifications',
    title: '通知',
    icon: <Bell className="h-6 w-6" />,
    category: 'admin',
    status: 'available',
  },
  {
    href: '/settings',
    title: '設定',
    icon: <Settings className="h-6 w-6" />,
    category: 'admin',
    status: 'available',
  },
  {
    href: '/users',
    title: 'ユーザー管理',
    icon: <Users className="h-6 w-6" />,
    category: 'admin',
    status: 'available',
  },
];
