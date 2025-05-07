import { MessageSquare } from 'lucide-react';

export function Testimonials() {
  const items = [
    {
      text: '“迅速な対応で急ぎの名刺を翌日に受け取れました。品質も最高です！”',
      author: '田中印刷所',
    },
    {
      text: '“地域限定の割引が嬉しく、コスト削減に貢献してくれました。”',
      author: '山本製作所',
    },
  ];

  return (
    <section className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">お客様の声</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.author}
              className="relative bg-white p-8 pt-12 rounded-xl shadow-md group hover:shadow-2xl transition"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary p-3 rounded-full text-white">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-gray-600 italic mb-4 mt-4">{item.text}</p>
              <p className="text-right font-semibold text-gray-800">
                — {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
