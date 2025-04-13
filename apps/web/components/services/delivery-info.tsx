import type React from 'react';
import { Clock, Zap } from 'lucide-react'; // アイコン例 (Clock: 時計, Zap: 速さ)
import Container from '../custom/container';

const DeliveryInfo: React.FC = () => {
  return (
    <section className="py-16 lg:py-32">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          納期について
        </h2>
        <div className="p-16 border border-gray-300 rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-2xl font-semibold text-gray-700">通常納期</h3>
          </div>
          <p className="text-gray-600 mb-8">
            {' '}
            {/* インデント調整 */}
            {/* TODO: 具体的な通常納期を記載 (例: データ確定後、X営業日〜) */}
            通常、データのご確認・確定後、
            <strong className="text-primary">1営業日〜3営業日</strong>{' '}
            での発送となります。
            <br />
            部数や加工オプションによって納期は変動いたしますので、詳しくはお見積もり時にご確認ください。
          </p>

          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-2xl font-semibold text-gray-700">
              お急ぎの場合 (特急対応)
            </h3>
          </div>
          <p className="text-gray-600">
            {' '}
            {/* インデント調整 */}
            {/* TODO: 特急対応の可否、条件、追加料金、最短納期などを記載 */}
            お急ぎの場合、特急対応も可能な場合がございます。
            <br />
            可能な納期については、ご注文内容を確認の上ご案内いたしますので、まずはお早めにご相談ください。
            <br />
            <strong className="text-red-600">
              ※ ご注文内容や工場の状況により、ご希望に添えない場合もございます。
            </strong>
          </p>

          {/* TODO: 配送方法や送料に関する情報を追記 */}
          <div className="mt-8 border-t pt-6">
            <h4 className="font-semibold text-gray-700 mb-2">配送について</h4>
            <p className="text-sm text-gray-600">
              商品は大船渡市、陸前高田市、住田町であれば直接配達いたします。
              <br />
              佐川急便での発送も行なっております。
              <br />
              送料については別途お見積もりとなります。
              {/* TODO: 具体的な配送業者名や、送料の目安、地域による違いなどを記載 */}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DeliveryInfo;
