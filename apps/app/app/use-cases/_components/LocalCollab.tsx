export function LocalCollab() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">地域共創事例</h2>
        <p className="text-gray-600 mb-8">
          地元企業との信頼関係が生み出す高品質な印刷物。
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">地元●●製菓店様名刺</h3>
            <p className="text-gray-600">
              迅速な名刺追加印刷で販促活動をサポートしました。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">
              △△大学オープンキャンパス用ポスター
            </h3>
            <p className="text-gray-600">
              短納期で掲示用ポスターを大量印刷しました。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
