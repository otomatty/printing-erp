import type { InquiryStats, AgentWorkload } from '../../../../types/inquiries';

// モックのお問い合わせ統計データ
export const mockInquiryStats: InquiryStats = {
  total: 10,
  by_status: {
    new: 3,
    in_progress: 3,
    waiting: 1,
    resolved: 2,
    closed: 1,
  },
  by_type: {
    quote_request: 3,
    product_inquiry: 2,
    order_status: 1,
    complaint: 2,
    support: 2,
    other: 0,
  },
  by_priority: {
    low: 3,
    medium: 5,
    high: 1,
    urgent: 1,
  },
  overdue: 2,
  avg_response_time: 2.3, // 2.3時間
  avg_resolution_time: 24.5, // 24.5時間
};

// モックの担当者稼働状況データ
export const mockAgentWorkloads: AgentWorkload[] = [
  {
    agent_id: 'USR-001',
    agent_name: '田中',
    assigned_inquiries: 1,
    open_inquiries: 0,
    resolved_today: 1,
    avg_resolution_time: 26.2,
  },
  {
    agent_id: 'USR-002',
    agent_name: '佐藤',
    assigned_inquiries: 1,
    open_inquiries: 0,
    resolved_today: 1,
    avg_resolution_time: 0.5,
  },
  {
    agent_id: 'USR-003',
    agent_name: '山田',
    assigned_inquiries: 1,
    open_inquiries: 1,
    resolved_today: 0,
    avg_resolution_time: 18.3,
  },
  {
    agent_id: 'USR-004',
    agent_name: '伊藤',
    assigned_inquiries: 1,
    open_inquiries: 1,
    resolved_today: 0,
    avg_resolution_time: 22.1,
  },
  {
    agent_id: 'USR-005',
    agent_name: '中村',
    assigned_inquiries: 1,
    open_inquiries: 0,
    resolved_today: 1,
    avg_resolution_time: 0.5,
  },
  {
    agent_id: 'USR-006',
    agent_name: '高橋',
    assigned_inquiries: 1,
    open_inquiries: 1,
    resolved_today: 0,
    avg_resolution_time: 10.7,
  },
  {
    agent_id: 'USR-007',
    agent_name: '小林',
    assigned_inquiries: 1,
    open_inquiries: 1,
    resolved_today: 0,
    avg_resolution_time: 15.4,
  },
];
