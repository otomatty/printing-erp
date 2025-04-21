import React from 'react';
import type { Metadata } from 'next';
import PageHero from '~/components/custom/page-hero'; // ページタイトル表示用に流用

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ニイヌマ企画印刷',
  description:
    'ニイヌマ企画印刷のプライバシーポリシー（個人情報保護方針）について説明します。',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-50">
      <PageHero title="プライバシーポリシー" subtitle="個人情報保護方針" />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white p-8">
          <div className="text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4 border-b pb-2">
              1. 個人情報の取得について
            </h2>
            <p className="mb-6">
              当社は、偽りその他不正の手段によらず適正に個人情報を取得致します。お客様から個人情報をご提供いただく場合、その利用目的をあらかじめ明示し、お客様の同意を得た上で取得します。
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              2. 個人情報の利用目的
            </h2>
            <p className="mb-4">
              当社は、個人情報を以下の利用目的の達成に必要な範囲内で利用致します。以下に定めのない目的で個人情報を利用する場合、あらかじめご本人の同意を得た上で行ないます。
            </p>
            <ul className="list-disc list-outside pl-5 space-y-2 mb-6">
              <li>
                ご注文いただいた商品の発送、および関連するアフターサービス
              </li>
              <li>
                お見積りのご依頼・ご相談・お問い合わせに対する回答及び資料送付
              </li>
              <li>各種商品・サービスに関する情報提供、アンケート調査</li>
              <li>当社サービスの改善・開発</li>
              <li>（その他、具体的な利用目的があれば追記）</li>
            </ul>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              3. 個人情報の安全管理について
            </h2>
            <p className="mb-6">
              当社は、取り扱う個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              4. 個人情報の委託について
            </h2>
            <p className="mb-6">
              当社は、個人情報の取り扱いの全部または一部を第三者に委託する場合は、当該第三者について厳正な調査を行い、取り扱いを委託された個人情報の安全管理が図られるよう当該第三者に対する必要かつ適切な監督を行います。（例：商品の配送業務を運送業者に委託する場合など）
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              5. 個人情報の第三者提供について
            </h2>
            <p className="mb-6">
              当社は、個人情報保護法等の法令に定めのある場合を除き、個人情報をあらかじめご本人の同意を得ることなく、第三者に提供致しません。
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              6. 個人情報の開示・訂正等について
            </h2>
            <p className="mb-6">
              当社は、ご本人から自己の個人情報についての開示の請求がある場合、速やかに開示を致します。その際、ご本人であることが確認できない場合には、開示に応じません。
              個人情報の内容に誤りがあり、ご本人から訂正・追加・削除の請求がある場合、調査の上、速やかにこれらの請求に対応致します。その際、ご本人であることが確認できない場合には、これらの請求に応じません。
              当社の個人情報の取り扱いにつきまして、上記の請求・お問い合わせ等ございましたら、下記までご連絡くださいますようお願い申し上げます。
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              7. Cookie（クッキー）その他の技術の利用
            </h2>
            <p className="mb-6">
              当サイトでは、サービスの利便性向上や利用状況の把握、広告配信等のためにCookieを使用する場合があります。Cookieを無効化されたいユーザーは、Webブラウザの設定を変更することによりCookieを無効化することができます。但し、Cookieを無効化すると、当サイトの一部の機能をご利用いただけなくなる場合があります。
              {/* TODO: Google Analytics などを使用している場合は、その旨とオプトアウト方法について記載 */}
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              8. プライバシーポリシーの変更
            </h2>
            <p className="mb-6">
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
              当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ホームページに掲載したときから効力を生じるものとします。
            </p>

            <h2 className="text-2xl font-semibold text-primary mt-10 mb-4 border-b pb-2">
              9. お問い合わせ窓口
            </h2>
            <div className="mb-6">
              <p>
                本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
                <br />
                事業者名称: ニイヌマ企画印刷
                <br />
                所在地: 〒022-0003 岩手県大船渡市盛町字みどり町4-12
                <br />
                電話番号: 0192-26-2160
                <br />
                Eメールアドレス: nkikaku@crocus.ocn.ne.jp
              </p>
            </div>
            <p className="text-sm text-gray-500">
              制定日: {new Date().toLocaleDateString('ja-JP')}
              {/* TODO: 正式な制定日を設定 */}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
