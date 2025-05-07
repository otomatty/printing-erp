'use client';
import { FileText, Printer, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Hero } from '~/components/Hero';
import { CategoryFilter } from './_components/CategoryFilter';
import { CasesGrid } from './_components/CasesGrid';
import { LocalCollab } from './_components/LocalCollab';
import { ContactCTA } from './_components/ContactCTA';

const allCases = [
  {
    category: '名刺',
    title: '社員名刺一括発注',
    description: '新入社員100名分の名刺を迅速に手配。テンプレート管理も簡単。',
    icon: <FileText className="h-10 w-10 text-primary" />,
  },
  {
    category: 'ポスター',
    title: 'イベントポスター制作',
    description: '地元祭りのポスターをオンラインでデザイン・発注。',
    icon: <Printer className="h-10 w-10 text-primary" />,
  },
  {
    category: 'パンフレット',
    title: '企業パンフレット印刷',
    description: '会社案内パンフレットを製作から印刷まで一元管理。',
    icon: <Calendar className="h-10 w-10 text-primary" />,
  },
];
const categories = ['全て', '名刺', 'ポスター', 'パンフレット'];

export default function UseCasesPage() {
  const [filter, setFilter] = useState('全て');
  const cases =
    filter === '全て'
      ? allCases
      : allCases.filter((c) => c.category === filter);

  return (
    <main className="flex flex-col min-h-screen">
      <Hero
        title="利用事例"
        subtitle="地域のお客様に選ばれる理由をご紹介します。"
        bgClass="bg-gradient-to-r from-primary to-primary-foreground py-20"
      />
      <CategoryFilter
        categories={categories}
        selected={filter}
        onSelect={setFilter}
      />
      <CasesGrid cases={cases} />
      <LocalCollab />
      <ContactCTA />
    </main>
  );
}
