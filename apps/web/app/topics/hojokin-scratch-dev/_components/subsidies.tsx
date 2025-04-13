import type React from 'react';
import Link from 'next/link'; // Import Link
import Container from '~/components/custom/container';

const SubsidiesSection: React.FC = () => {
  return (
    <section className="mb-12 py-12 bg-blue-50 rounded-lg">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          開発コストをさらに軽減！活用できる補助金
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          オーダーメイド開発でも、条件が合えば国の補助金を活用できる可能性があります。
          代表的な補助金をご紹介します。（情報は常に変動するため、最新の公式情報をご確認ください）
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Monodzukuri Subsidy */}
          <div className="border p-6 rounded bg-white shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              ものづくり補助金
            </h3>
            <p className="text-gray-600 mb-4">
              革新的な製品・サービス開発や生産プロセス改善のための設備投資等を支援します。オーダーメイドのシステム開発も対象となる可能性があります。
            </p>
            <Link
              href="/hojokin/monodukuri"
              className="text-blue-600 hover:underline font-medium"
            >
              詳細はこちら &rarr;
            </Link>
            {/* <p className="text-sm text-gray-500">※詳細ページ準備中</p> */}
          </div>
          {/* Shoryokuka Investment Subsidy */}
          <div className="border p-6 rounded bg-white shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              中小企業省力化投資補助金
            </h3>
            <p className="text-gray-600 mb-4">
              人手不足解消に繋がる、IoTやロボット等の省力化設備の導入を支援します。オーダーメイドのシステム開発も対象となる可能性があります。
            </p>
            <Link
              href="/hojokin/shoryokuka"
              className="text-blue-600 hover:underline font-medium"
            >
              詳細はこちら &rarr;
            </Link>
            {/* <p className="text-sm text-gray-500">※詳細ページ準備中</p> */}
          </div>
          {/* New Business Promotion Subsidy */}
          <div className="border p-6 rounded bg-white shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              中小企業新事業進出促進補助金（仮称）
            </h3>
            <p className="text-gray-600 mb-4">
              新市場進出や事業転換など、企業の新たな挑戦に必要な設備投資等を支援します（事業再構築補助金の後継）。新規事業のためのシステム開発が対象になり得ます。
            </p>
            <Link
              href="/hojokin/shinjigyo"
              className="text-blue-600 hover:underline font-medium"
            >
              詳細はこちら &rarr;
            </Link>
            {/* <p className="text-sm text-gray-500">※詳細ページ準備中</p> */}
          </div>
          {/* Jizokuka Subsidy */}
          <div className="border p-6 rounded bg-white shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">
              小規模事業者持続化補助金
            </h3>
            <p className="text-gray-600 mb-4">
              小規模事業者の販路開拓や業務効率化の取り組みを支援します。Webサイト関連費用やシステム開発費用の一部も対象となる場合があります。
            </p>
            <Link
              href="/hojokin/jizokuka"
              className="text-blue-600 hover:underline font-medium"
            >
              詳細はこちら &rarr;
            </Link>
            {/* <p className="text-sm text-gray-500">※詳細ページ準備中</p> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SubsidiesSection;
