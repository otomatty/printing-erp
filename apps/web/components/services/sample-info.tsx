import type React from 'react';
import { Info, MapPin, Phone, ExternalLink } from 'lucide-react';
import Container from '~/components/custom/container';

interface SampleInfoProps {
  title?: string;
  description?: React.ReactNode[];
  additionalDescription?: React.ReactNode[];
  className?: string;
  showContainer?: boolean;
}

const SampleInfo: React.FC<SampleInfoProps> = ({
  title = '用紙・カラーサンプルのご案内',
  description = [
    <>
      実際の色や質感は画面では伝わりにくいもの。各種
      <span key="paper" className="font-semibold">
        用紙
      </span>
      や
      <span key="color" className="font-semibold">
        カラー
      </span>
      の実物サンプルをご用意しております。手に取って触れていただくことで、
      <span key="optimal" className="font-semibold">
        最適な用紙選び
      </span>
      ができます。
    </>,
  ],
  additionalDescription = [
    <>
      <span key="special-paper" className="font-semibold">
        特殊紙
      </span>
      や
      <span key="special-process" className="font-semibold">
        特殊加工
      </span>
      のサンプルもございますので、高級感のある封筒や特別な用途の封筒をお考えの方は、ぜひご覧ください。
    </>,
  ],
  className = '',
  showContainer = true,
}) => {
  const content = (
    <div
      className={`border-primary/20 rounded-xl bg-primary/5 p-6 ${className}`}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <div className="bg-primary text-white p-3 rounded-full">
              <Info className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          </div>
          {description.map((paragraph, i) => {
            const uniqueId = `desc-${i}-${typeof paragraph === 'string' ? paragraph.substring(0, 10) : i}`;
            return (
              <p key={uniqueId} className="text-gray-700">
                {paragraph}
              </p>
            );
          })}

          {additionalDescription.map((paragraph, i) => {
            const uniqueId = `add-desc-${i}-${typeof paragraph === 'string' ? paragraph.substring(0, 10) : i}`;
            return (
              <p key={uniqueId} className="text-gray-700">
                {paragraph}
              </p>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">店舗でのご相談</h4>
              <p className="text-sm text-gray-600">
                店舗にて各種サンプルをご覧いただけます。スタッフが丁寧にご説明いたします。
              </p>
              <p className="text-xs text-gray-500 mt-1">
                〒022-0003 岩手県大船渡市盛町字みどり町4-12
              </p>
              <a
                href="https://maps.google.com/maps?q=印刷会社+大船渡市"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs mt-1 inline-flex items-center"
              >
                Googleマップで見る
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">出張サンプル説明</h4>
              <p className="text-sm text-gray-600">
                ご希望の場所へスタッフがサンプルをお持ちし、ご説明することも可能です。お気軽にお問い合わせください。
              </p>
              <a
                href="tel:0192-26-2160"
                className="text-primary hover:underline text-sm mt-1 inline-block"
              >
                0192-26-2160
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (showContainer) {
    return <div className="pt-8 md:pt-12">{content}</div>;
  }

  return content;
};

export default SampleInfo;
