import type React from 'react';
import Link from 'next/link';
import Container from '../custom/container';

interface ServiceCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = 'あなたのプロジェクトもお手伝いします',
  description = 'ホームページ制作、業務システム開発、ITコンサルティングなど、お客様のビジネス課題を解決するIT・デジタルソリューションをご提供します。まずはお気軽にご相談ください。',
  primaryButtonText = '無料相談のお申し込み',
  secondaryButtonText = 'サービス詳細を見る',
  primaryButtonLink = '/contact',
  secondaryButtonLink = '/services/it-digital',
}) => {
  return (
    <section className="bg-gray-50 py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          <p className="text-gray-700 mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButtonLink}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonLink}
              className="bg-white text-primary border border-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceCTA;
