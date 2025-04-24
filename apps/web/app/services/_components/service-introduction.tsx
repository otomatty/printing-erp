import type React from 'react';
import Container from '~/components/custom/container';

// --- props の型定義を追加 ---
interface ServiceIntroductionProps {
  title: React.ReactNode;
  description: React.ReactNode;
  leftImageUrl?: string;
  rightBgImageUrl?: string;
}
// --- props の型定義を追加 ---

// --- コンポーネントの引数を props に変更し、画像URLを受け取る ---
const ServiceIntroduction: React.FC<ServiceIntroductionProps> = ({
  title,
  description,
  leftImageUrl,
  rightBgImageUrl,
}) => {
  // --- コンポーネントの引数を props に変更 ---
  return (
    <section className="bg-white py-16 lg:py-32">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {leftImageUrl && (
            <div className="w-full lg:w-1/2">
              <img
                src={leftImageUrl}
                alt=""
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          <div
            className={`w-full ${leftImageUrl ? 'lg:w-1/2' : 'lg:w-full'} md:p-8 rounded-lg`}
            style={{
              backgroundImage: rightBgImageUrl
                ? `url(${rightBgImageUrl})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                {title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceIntroduction;
