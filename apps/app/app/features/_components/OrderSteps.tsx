import { UploadCloud, MapPin, Zap } from 'lucide-react';

export function OrderSteps() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          かんたん 3ステップ発注
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          {[
            {
              icon: UploadCloud,
              title: 'デザインアップロード',
              description: 'デザインデータをアップロードするだけ',
            },
            {
              icon: MapPin,
              title: '仕様・仕上げ指定',
              description: '用紙・サイズをオンラインで簡単指定',
            },
            {
              icon: Zap,
              title: '即日発送',
              description: '最寄り工場からスピーディに出荷',
            },
          ].map(({ icon: Icon, title, description }, idx) => {
            const cardVariants = [
              'bg-white p-8 rounded-xl shadow-lg',
              'bg-white p-8 rounded-lg border-2 border-primary',
              'bg-white p-8 rounded-none shadow-inner',
            ];
            const iconVariants = [
              'bg-gradient-to-tr from-primary to-secondary rounded-full',
              'bg-gradient-to-br from-secondary to-primary rounded-md',
              'bg-gradient-to-l from-primary to-secondary rounded-lg',
            ];
            return (
              <div
                key={title}
                className={`group flex-1 ${cardVariants[idx % cardVariants.length]} hover:shadow-2xl transition text-center`}
              >
                <div
                  className={`w-16 h-16 mb-4 mx-auto flex items-center justify-center ${iconVariants[idx % iconVariants.length]} transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
