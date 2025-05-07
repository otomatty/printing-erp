import { Truck, Link2, Handshake } from 'lucide-react';

export function RegionStrength() {
  const strengths = [
    { icon: Truck, title: '最寄り工場から即日配送' },
    { icon: Link2, title: '中間コストなしの直送体制' },
    { icon: Handshake, title: '地元企業との信頼関係' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">地域密着の強み</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition text-center"
            >
              <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center bg-gradient-to-tr from-primary to-secondary rounded-full transition-transform group-hover:scale-110">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-700 font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
