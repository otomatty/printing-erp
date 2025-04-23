// 型のエクスポート
export * from '../../../../types/inquiries';

// モックデータのインポート
import { mockInquiries } from './mock-inquiries';
import { mockInquiryStats, mockAgentWorkloads } from './mock-stats';

// お問い合わせデータの取得関数
export async function fetchInquiries() {
  // 実際のAPIからのデータ取得を想定
  return mockInquiries;
}

// 特定のお問い合わせの取得関数
export async function fetchInquiryById(id: string) {
  // 実際のAPIからのデータ取得を想定
  const inquiry = mockInquiries.find((inq) => inq.id === id);
  return inquiry || null;
}

// 絞り込み条件付きのお問い合わせ取得関数
export async function fetchInquiriesByFilter(filter: {
  status?: string[];
  type?: string[];
  priority?: string[];
  search?: string;
  assigned_to?: string;
}) {
  // 実際のAPIからのデータ取得を想定
  let filteredInquiries = [...mockInquiries];

  // ステータスでフィルタリング
  if (filter.status && filter.status.length > 0) {
    filteredInquiries = filteredInquiries.filter((inq) =>
      filter.status?.includes(inq.status)
    );
  }

  // 種類でフィルタリング
  if (filter.type && filter.type.length > 0) {
    filteredInquiries = filteredInquiries.filter((inq) =>
      filter.type?.includes(inq.type)
    );
  }

  // 優先度でフィルタリング
  if (filter.priority && filter.priority.length > 0) {
    filteredInquiries = filteredInquiries.filter((inq) =>
      filter.priority?.includes(inq.priority)
    );
  }

  // 担当者でフィルタリング
  if (filter.assigned_to) {
    filteredInquiries = filteredInquiries.filter(
      (inq) => inq.assigned_to === filter.assigned_to
    );
  }

  // 検索語でフィルタリング
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filteredInquiries = filteredInquiries.filter(
      (inq) =>
        inq.subject.toLowerCase().includes(searchLower) ||
        inq.content.toLowerCase().includes(searchLower) ||
        inq.customer_name.toLowerCase().includes(searchLower)
    );
  }

  return filteredInquiries;
}

// 統計データの取得関数
export async function fetchInquiryStats() {
  // 実際のAPIからのデータ取得を想定
  return mockInquiryStats;
}

// 担当者稼働状況の取得関数
export async function fetchAgentWorkloads() {
  // 実際のAPIからのデータ取得を想定
  return mockAgentWorkloads;
}

// お問い合わせ状態の詳細取得関数
export function getStatusDetails(status: string) {
  // 状態に応じたラベルと色情報を返す
  const statusMap: Record<string, { label: string; color: string }> = {
    new: {
      label: '新規',
      color: 'bg-blue-300 text-blue-900',
    },
    in_progress: {
      label: '対応中',
      color: 'bg-amber-300 text-amber-900',
    },
    waiting: {
      label: '回答待ち',
      color: 'bg-purple-300 text-purple-900',
    },
    resolved: {
      label: '解決済',
      color: 'bg-green-300 text-green-900',
    },
    closed: {
      label: '完了',
      color: 'bg-gray-300 text-gray-900',
    },
  };

  return (
    statusMap[status] || { label: '不明', color: 'bg-gray-100 text-gray-800' }
  );
}

// お問い合わせタイプの詳細取得関数
export function getTypeDetails(type: string) {
  // 種類に応じたラベルとアイコン情報を返す
  const typeMap: Record<string, { label: string; icon: string }> = {
    quote_request: {
      label: '見積依頼',
      icon: 'calculator',
    },
    product_inquiry: {
      label: '製品相談',
      icon: 'help-circle',
    },
    order_status: {
      label: '注文状況',
      icon: 'package',
    },
    complaint: {
      label: '苦情・クレーム',
      icon: 'alert-triangle',
    },
    support: {
      label: 'サポート',
      icon: 'life-buoy',
    },
    other: {
      label: 'その他',
      icon: 'more-horizontal',
    },
  };

  return typeMap[type] || { label: '不明', icon: 'help-circle' };
}

// 優先度の詳細取得関数
export function getPriorityDetails(priority: string) {
  // 優先度に応じたラベルと色情報を返す
  const priorityMap: Record<
    string,
    { label: string; color: string; icon: string }
  > = {
    low: {
      label: '低',
      color: 'bg-blue-100 text-blue-800',
      icon: 'arrow-down',
    },
    medium: {
      label: '中',
      color: 'bg-gray-100 text-gray-800',
      icon: 'minus',
    },
    high: {
      label: '高',
      color: 'bg-orange-100 text-orange-800',
      icon: 'arrow-up',
    },
    urgent: {
      label: '緊急',
      color: 'bg-red-100 text-red-800',
      icon: 'alert-circle',
    },
  };

  return (
    priorityMap[priority] || {
      label: '不明',
      color: 'bg-gray-100 text-gray-800',
      icon: 'help-circle',
    }
  );
}
