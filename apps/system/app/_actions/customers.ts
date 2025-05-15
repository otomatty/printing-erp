'use server';

// モック用サーバーアクション

// 顧客の型定義
export interface Customer {
  /** 顧客ID */
  id: string;
  /** 顧客名 */
  name: string;
  /** 担当者名 */
  contact: string;
  /** メールアドレス */
  email: string;
  /** 電話番号 */
  phone: string;
  /** 最終注文日 */
  lastOrder: string;
}

// モックデータ定義
const mockCustomers: Customer[] = [
  {
    id: 'cus-001',
    name: '株式会社サンプル',
    contact: '山田太郎',
    email: 'yamada@sample.co.jp',
    phone: '03-1234-5678',
    lastOrder: '2023-05-15',
  },
  {
    id: 'cus-002',
    name: '○○商事',
    contact: '佐藤花子',
    email: 'sato@xx-design.co.jp',
    phone: '03-9876-5432',
    lastOrder: '2023-06-10',
  },
  {
    id: 'cus-003',
    name: '△△印刷',
    contact: '鈴木花子',
    email: 'hanako@printing.com',
    phone: '080-1111-2222',
    lastOrder: '2023-04-20',
  },
  {
    id: 'cus-004',
    name: '××デザイン事務所',
    contact: '高橋一郎',
    email: 'takahashi@design.co.jp',
    phone: '050-3333-4444',
    lastOrder: '2023-03-05',
  },
  {
    id: 'cus-005',
    name: '□□出版',
    contact: '佐野優子',
    email: 'sano@publishing.co.jp',
    phone: '070-5555-6666',
    lastOrder: '2023-02-28',
  },
];

// 取得系モック
export async function fetchCustomers(): Promise<Customer[]> {
  return mockCustomers;
}

// 通知用関数
function notify(message: string) {
  alert(message);
}

// 送信系モック
export async function createCustomer(): Promise<{ success: boolean }> {
  notify('顧客を作成しました');
  return { success: true };
}

export async function updateCustomer(): Promise<{ success: boolean }> {
  notify('顧客を更新しました');
  return { success: true };
}

export async function deleteCustomer(): Promise<{ success: boolean }> {
  notify('顧客を削除しました');
  return { success: true };
}
