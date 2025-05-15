import type React from 'react';
import { comparisonData } from '../../_data/systemComparisonData';
import { getIconForItem } from '../cost-performance/comparison-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';

const SystemComparisonTable: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h3 className="text-xl font-semibold text-center mb-6">
        業務システムの導入方法の比較
      </h3>
      <div className="relative overflow-hidden">
        <div className="overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="md:hidden text-gray-500 text-xs text-center mb-2 animate-pulse">
            ← 左右にスワイプして比較できます →
          </div>
          <table className="w-full text-sm min-w-[640px] border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-center w-[25%] sticky left-0 z-10 border-r shadow-sm">
                  比較ポイント
                </th>
                <th className="px-4 py-3 text-center w-[25%]">従来型の開発</th>
                <th className="px-4 py-3 text-center w-[25%]">市販ソフト</th>
                <th className="px-4 py-3 text-center w-[25%]">印刷会社</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {comparisonData.map((item, index) => (
                <tr
                  key={item.item.id}
                  className={
                    index < comparisonData.length - 1 ? 'border-b' : ''
                  }
                >
                  <td className="px-4 py-3 font-medium bg-white sticky left-0 z-10 border-r shadow-sm">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        {getIconForItem(item.item.id)}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">
                              {item.item.id === 'dev-period' && 'かかる時間'}
                              {item.item.id === 'cost' && '費用'}
                              {item.item.id === 'customization' &&
                                '自社に合わせやすさ'}
                              {item.item.id === 'maintenance' && '保守・運用'}
                              {item.item.id === 'usability' && '使いやすさ'}
                              {item.item.id === 'security' && '安全性'}
                              {item.item.id === 'scalability' && '将来の拡張性'}
                              {item.item.id === 'roi' && '費用の回収期間'}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.item.id === 'dev-period' &&
                              'システムが使えるようになるまでの期間'}
                            {item.item.id === 'cost' &&
                              '導入から運用までの総費用'}
                            {item.item.id === 'customization' &&
                              '自社の業務に合わせて調整できる範囲'}
                            {item.item.id === 'maintenance' &&
                              'システム導入後の管理や更新にかかる手間と費用'}
                            {item.item.id === 'usability' &&
                              '誰でも簡単に使えるかどうか'}
                            {item.item.id === 'security' &&
                              '情報漏洩などから守る対策'}
                            {item.item.id === 'scalability' &&
                              '事業拡大や新しい機能の追加のしやすさ'}
                            {item.item.id === 'roi' &&
                              '投資した費用がいつ頃回収できるか'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                  {/* 従来型 */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`
                                flex items-center justify-center
                                w-8 h-8 mb-1 rounded-full cursor-help
                                ${
                                  item.traditional.rating === '◎'
                                    ? 'bg-blue-100 text-primary'
                                    : item.traditional.rating === '○'
                                      ? 'bg-green-100 text-green-600'
                                      : item.traditional.rating === '△'
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-red-100 text-red-600'
                                }
                              `}
                            >
                              <span className="text-lg font-bold">
                                {item.traditional.rating}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.item.id === 'dev-period' &&
                              '要件定義からテストまで時間がかかり、大規模なシステムでは1年以上必要なこともあります'}
                            {item.item.id === 'cost' &&
                              'カスタム開発費用は規模によりますが、中規模システムでは500〜3,000万円程度が一般的です'}
                            {item.item.id === 'customization' &&
                              '業務フローに合わせて細部まで作り込めますが、変更のたびに費用が発生します'}
                            {item.item.id === 'maintenance' &&
                              '保守契約が必要で、専門家がいないと運用の負担が大きくなります'}
                            {item.item.id === 'usability' &&
                              '設計品質により使いやすさが大きく左右されます'}
                            {item.item.id === 'security' &&
                              '柔軟なセキュリティ設計が可能ですが、保守が途切れるとリスクが高まります'}
                            {item.item.id === 'scalability' &&
                              'しっかりした設計なら高い拡張性を確保できますが、追加開発にはコストと時間がかかります'}
                            {item.item.id === 'roi' &&
                              '初期投資が大きいため、通常2〜3年程度の回収期間が必要です'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-xs text-gray-600">
                        {item.item.id === 'dev-period' && '4〜8ヶ月程度'}
                        {item.item.id === 'cost' && '500〜3,000万円'}
                        {item.item.id === 'customization' &&
                          '高い自由度だが工数も多い'}
                        {item.item.id === 'maintenance' &&
                          '月額10〜30万円の保守費用'}
                        {item.item.id === 'usability' &&
                          '設計次第で大きく変わる'}
                        {item.item.id === 'security' && '保守次第でリスク変動'}
                        {item.item.id === 'scalability' &&
                          '追加開発に時間とコスト'}
                        {item.item.id === 'roi' && '2〜3年程度'}
                      </span>
                    </div>
                  </td>
                  {/* パッケージソフト */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`
                                flex items-center justify-center
                                w-8 h-8 mb-1 rounded-full cursor-help
                                ${
                                  item.package.rating === '◎'
                                    ? 'bg-blue-100 text-primary'
                                    : item.package.rating === '○'
                                      ? 'bg-green-100 text-green-600'
                                      : item.package.rating === '△'
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-red-100 text-red-600'
                                }
                              `}
                            >
                              <span className="text-lg font-bold">
                                {item.package.rating}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.item.id === 'dev-period' &&
                              '比較的早く導入できるが、カスタマイズ部分は追加時間が必要'}
                            {item.item.id === 'cost' &&
                              '初期費用は抑えられるが、継続的なライセンス費用と拡張費用が発生'}
                            {item.item.id === 'customization' &&
                              '標準機能は充実しているが、特殊な業務フローへの対応は限定的'}
                            {item.item.id === 'maintenance' &&
                              '基本的なサポートは充実しているが、カスタマイズ部分は別途対応が必要'}
                            {item.item.id === 'usability' &&
                              '標準機能は使いやすいが、カスタマイズ部分との操作感の違いが生じることも'}
                            {item.item.id === 'security' &&
                              '多くのユーザーに使われているため、セキュリティ対策は充実している'}
                            {item.item.id === 'scalability' &&
                              '標準機能の範囲内での拡張は容易だが、パッケージの想定外の機能追加は制限あり'}
                            {item.item.id === 'roi' &&
                              '効果的に活用できれば1〜2年程度での投資回収が可能'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-xs text-gray-600">
                        {item.item.id === 'dev-period' &&
                          'カスタマイズに1〜3ヶ月'}
                        {item.item.id === 'cost' && '30万円〜(年間)'}
                        {item.item.id === 'customization' &&
                          '標準機能内なら容易'}
                        {item.item.id === 'maintenance' && '基本サポートは充実'}
                        {item.item.id === 'usability' && '標準機能は使いやすい'}
                        {item.item.id === 'security' &&
                          '大規模なセキュリティ対策'}
                        {item.item.id === 'scalability' &&
                          '標準機能内なら拡張可能'}
                        {item.item.id === 'roi' && '1〜2年程度'}
                      </span>
                    </div>
                  </td>
                  {/* 印刷会社 */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`
                                flex items-center justify-center
                                w-8 h-8 mb-1 rounded-full cursor-help
                                ${
                                  item.ninuma.rating === '◎'
                                    ? 'bg-blue-200 text-blue-700 border-2 border-blue-400'
                                    : item.ninuma.rating === '○'
                                      ? 'bg-green-100 text-green-600'
                                      : item.ninuma.rating === '△'
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-red-100 text-red-600'
                                }
                              `}
                            >
                              <span className="text-lg font-bold">
                                {item.ninuma.rating}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {item.item.id === 'dev-period' &&
                              '必要な機能から順に小さく始めて、徐々に拡張していくため早期に効果を得られます'}
                            {item.item.id === 'cost' &&
                              '必要な機能だけに絞り、無駄を省いたシステム設計で適切なコスト配分を実現します'}
                            {item.item.id === 'customization' &&
                              'お客様の仕事の流れを丁寧にヒアリングし、アジャイル開発で柔軟に対応します'}
                            {item.item.id === 'maintenance' &&
                              '明確な月額料金でサポートや改善が含まれた安心プラン'}
                            {item.item.id === 'usability' &&
                              '実際に使う方の声を継続的に取り入れて改善する体制'}
                            {item.item.id === 'security' &&
                              '中小企業の予算に合わせた現実的なセキュリティ対策を提案'}
                            {item.item.id === 'scalability' &&
                              '事業成長に合わせて段階的に機能を拡張できる柔軟な設計思想'}
                            {item.item.id === 'roi' &&
                              '効果の高い機能から順に導入することで早期に投資効果を実感'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-green-600 font-medium text-xs">
                        {item.item.id === 'dev-period' &&
                          '最短1ヶ月から使い始められる'}
                        {item.item.id === 'cost' && '初期投資を分散可能'}
                        {item.item.id === 'customization' &&
                          '業務に合わせた設計'}
                        {item.item.id === 'maintenance' &&
                          'わかりやすい月額料金体系'}
                        {item.item.id === 'usability' && '継続的な改善サイクル'}
                        {item.item.id === 'security' &&
                          'コストパフォーマンスの高い対策'}
                        {item.item.id === 'scalability' &&
                          '段階的な機能拡張が可能'}
                        {item.item.id === 'roi' && '約1年程度'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute top-[40%] -left-2 md:hidden pointer-events-none opacity-40">
          <div className="w-6 h-12 bg-gray-300 rounded-r-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>左スクロール</title>
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
        </div>
        <div className="absolute top-[40%] -right-2 md:hidden pointer-events-none opacity-40">
          <div className="w-6 h-12 bg-gray-300 rounded-l-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>右スクロール</title>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-3 text-sm">
        <div className="flex items-center m-1">
          <div className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full border-2 border-blue-400 mr-1">
            <span className="font-bold">◎</span>
          </div>
          <span>とても良い</span>
        </div>
        <div className="flex items-center m-1">
          <div className="bg-green-100 text-green-600 w-6 h-6 flex items-center justify-center rounded-full mr-1">
            <span className="font-bold">○</span>
          </div>
          <span>良い</span>
        </div>
        <div className="flex items-center m-1">
          <div className="bg-yellow-100 text-yellow-600 w-6 h-6 flex items-center justify-center rounded-full mr-1">
            <span className="font-bold">△</span>
          </div>
          <span>普通</span>
        </div>
        <div className="flex items-center m-1">
          <div className="bg-red-100 text-red-600 w-6 h-6 flex items-center justify-center rounded-full mr-1">
            <span className="font-bold">×</span>
          </div>
          <span>あまり良くない</span>
        </div>
      </div>
    </div>
  );
};

export default SystemComparisonTable;
