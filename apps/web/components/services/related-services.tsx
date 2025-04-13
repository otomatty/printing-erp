import type React from 'react';
import Link from 'next/link';
import { servicesData } from '~/data/servicesData'; // servicesData と ServiceItem 型をインポート
import type { ServiceItem } from '~/types/serviceTypes';
import { Component } from 'lucide-react'; // デフォルトアイコン用
import Container from '../custom/container';

// Propsの型定義
type RelatedServicesProps = {
  relatedServiceIds: string[]; // 表示したい関連サービスのIDリスト
  title?: string; // オプションでセクションタイトルを変更可能にする
};

const RelatedServices: React.FC<RelatedServicesProps> = ({
  relatedServiceIds,
  title = '関連サービス',
}) => {
  // 表示する関連サービスを選択 (最大3つ)
  const allServices = servicesData.flatMap((category) => category.items);
  const selectedRelatedServices = relatedServiceIds
    .map((id) =>
      allServices.find((service) => service.id === id && service.href)
    )
    .filter((service): service is ServiceItem => service !== undefined) // undefinedを除去し型ガード
    .slice(0, 3); // 最大3つに制限

  // 表示するサービスがない場合はセクション自体を表示しない
  if (selectedRelatedServices.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {title} {/* Propsで受け取ったタイトルを使用 */}
        </h2>
        {/* Gridの列数を表示数に合わせて調整 */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-${selectedRelatedServices.length} gap-4`}
        >
          {selectedRelatedServices.map((service) => {
            // アイコンがない場合のデフォルトアイコンを設定
            const ServiceIcon = service.icon || Component;
            // hrefが存在する場合のみLinkを描画 (filterで保証されているが念のため)
            return service.href ? (
              <Link
                href={service.href}
                key={service.id}
                className="block border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                {/* 画像プレースホルダー (一旦そのまま) */}
                <div className="w-full h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400 text-sm">
                  {/* TODO: サービスイメージ画像 */} 画像プレースホルダー
                </div>
                <div className="flex items-center mb-2">
                  <ServiceIcon className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                    {service.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {service.shortDescription}
                </p>
              </Link>
            ) : null; // hrefがない場合は何も描画しない
          })}
        </div>
      </Container>
    </section>
  );
};

export default RelatedServices;
