import QuotesPageClient from './quotes-page-client';

// Quote type for mock data
interface Quote {
  id: string;
  customer: string;
  title: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  validUntil: string;
}

export default function QuotesPage() {
  const quotes: Quote[] = [
    {
      id: 'QT-2023-0001',
      customer: '株式会社サンプル',
      title: 'チラシ印刷 A4 両面フルカラー 1,000部',
      amount: 25000,
      status: 'accepted',
      createdAt: '2023/07/01',
      validUntil: '2023/07/31',
    },
    {
      id: 'QT-2023-0002',
      customer: '○○商事',
      title: '名刺印刷 両面フルカラー 100枚',
      amount: 5000,
      status: 'sent',
      createdAt: '2023/07/04',
      validUntil: '2023/08/04',
    },
    {
      id: 'QT-2023-0003',
      customer: '△△印刷',
      title: 'パンフレット A4 8P フルカラー 500部',
      amount: 45000,
      status: 'draft',
      createdAt: '2023/07/05',
      validUntil: '2023/08/05',
    },
    {
      id: 'QT-2023-0004',
      customer: '××デザイン事務所',
      title: 'ポスター B2 片面フルカラー 50枚',
      amount: 30000,
      status: 'rejected',
      createdAt: '2023/06/20',
      validUntil: '2023/07/20',
    },
    {
      id: 'QT-2023-0005',
      customer: '□□出版',
      title: '冊子 A5 32P フルカラー 300部',
      amount: 120000,
      status: 'expired',
      createdAt: '2023/05/15',
      validUntil: '2023/06/15',
    },
  ];

  return <QuotesPageClient quotes={quotes} />;
}
