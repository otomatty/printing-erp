import { ArrowLeft, Filter, Plus, Search, Users } from 'lucide-react';
import Link from 'next/link';

// 顧客対応記録のモックデータ
const interactionsData = [
  {
    id: 'int-001',
    customerId: 'cus-001',
    customerName: '株式会社サンプル',
    contactName: '山田太郎',
    interactionType: '電話',
    subject: '納期確認の問い合わせ',
    date: '2023/06/15 14:30',
    staff: '佐藤',
    content:
      '次回の印刷物の納期について確認あり。6月末までに納品できるか問い合わせ。確認して折り返すと回答。',
  },
  {
    id: 'int-002',
    customerId: 'cus-002',
    customerName: '○○商事',
    contactName: '佐藤次郎',
    interactionType: 'メール',
    subject: '価格見積りの依頼',
    date: '2023/06/14 10:15',
    staff: '鈴木',
    content:
      '新しいパンフレットの印刷費用について見積り依頼あり。詳細資料を送付してもらい、見積り作成中。',
  },
  {
    id: 'int-003',
    customerId: 'cus-001',
    customerName: '株式会社サンプル',
    contactName: '山田太郎',
    interactionType: '訪問',
    subject: '新規プロジェクト打ち合わせ',
    date: '2023/06/10 13:00',
    staff: '高橋',
    content:
      '新しいカタログ制作についての打ち合わせ。デザイン案を3パターン提案することに。7月中旬までに初稿を提出予定。',
  },
  {
    id: 'int-004',
    customerId: 'cus-003',
    customerName: '△△印刷',
    contactName: '鈴木花子',
    interactionType: '電話',
    subject: 'クレーム対応',
    date: '2023/06/08 09:45',
    staff: '佐藤',
    content:
      '印刷物の色味についてクレームあり。サンプルを確認して再印刷対応することに。翌週月曜に再納品予定。',
  },
  {
    id: 'int-005',
    customerId: 'cus-004',
    customerName: '××デザイン事務所',
    contactName: '高橋一郎',
    interactionType: 'メール',
    subject: '発注確定連絡',
    date: '2023/06/05 16:20',
    staff: '鈴木',
    content:
      '先日見積りした名刺印刷について発注確定の連絡あり。データ入稿は来週月曜の予定。',
  },
];

export default function CustomerInteractionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/system/customers"
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="mr-2" />
            顧客対応記録
          </h1>
        </div>
        <Link
          href="/system/customers/interactions/new"
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-1" size={16} />
          新規対応記録
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="キーワードで検索..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex gap-2">
            <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2">
              <option value="">すべての顧客</option>
              <option value="cus-001">株式会社サンプル</option>
              <option value="cus-002">○○商事</option>
              <option value="cus-003">△△印刷</option>
              <option value="cus-004">××デザイン事務所</option>
              <option value="cus-005">□□出版</option>
            </select>
            <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2">
              <option value="">すべての対応種別</option>
              <option value="電話">電話</option>
              <option value="メール">メール</option>
              <option value="訪問">訪問</option>
              <option value="来社">来社</option>
            </select>
            <button
              type="button"
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
            >
              <Filter size={16} />
              詳細条件
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500 text-sm">
                <th className="px-4 py-3 font-medium">日時</th>
                <th className="px-4 py-3 font-medium">顧客名</th>
                <th className="px-4 py-3 font-medium">担当者</th>
                <th className="px-4 py-3 font-medium">種別</th>
                <th className="px-4 py-3 font-medium">件名</th>
                <th className="px-4 py-3 font-medium">対応者</th>
                <th className="px-4 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {interactionsData.map((interaction) => (
                <tr key={interaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{interaction.date}</td>
                  <td className="px-4 py-3 font-medium text-primary">
                    <Link href={`/system/customers/${interaction.customerId}`}>
                      {interaction.customerName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {interaction.contactName}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        interaction.interactionType === '電話'
                          ? 'bg-blue-100 text-blue-800'
                          : interaction.interactionType === 'メール'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {interaction.interactionType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{interaction.subject}</td>
                  <td className="px-4 py-3 text-sm">{interaction.staff}</td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      href={`/system/customers/interactions/${interaction.id}`}
                      className="text-primary hover:text-blue-800"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 px-4">
          <p className="text-sm text-gray-500">全15件中 1-5件を表示</p>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400"
              disabled
            >
              前へ
            </button>
            <button
              type="button"
              className="px-3 py-1 border rounded-md bg-white"
            >
              1
            </button>
            <button
              type="button"
              className="px-3 py-1 border rounded-md bg-gray-50"
            >
              2
            </button>
            <button
              type="button"
              className="px-3 py-1 border rounded-md bg-gray-50"
            >
              3
            </button>
            <button
              type="button"
              className="px-3 py-1 border rounded-md bg-gray-50"
            >
              次へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
