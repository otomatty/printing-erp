import Link from 'next/link';
import { Eye, Mail, Phone } from 'lucide-react';
import { FilterSection } from './filter-section';
import { Pagination } from './pagination';

interface InquiryStatus {
  label: string;
  color: string;
}

interface InquiryPriority {
  label: string;
  color: string;
}

export interface Inquiry {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  subject: string;
  status: string;
  priority: string;
  created_at: string;
  assigned_to_name?: string | null;
}

interface InquiriesTableProps {
  inquiries: Inquiry[];
  getStatusDetails: (status: string) => InquiryStatus;
  getPriorityDetails: (priority: string) => InquiryPriority;
}

export function InquiriesTable({
  inquiries,
  getStatusDetails,
  getPriorityDetails,
}: InquiriesTableProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <FilterSection />

      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-4 py-3 font-medium">問い合わせ番号</th>
              <th className="px-4 py-3 font-medium">お名前</th>
              <th className="px-4 py-3 font-medium">連絡先</th>
              <th className="px-4 py-3 font-medium">件名</th>
              <th className="px-4 py-3 font-medium">ステータス</th>
              <th className="px-4 py-3 font-medium">優先度</th>
              <th className="px-4 py-3 font-medium">日付</th>
              <th className="px-4 py-3 font-medium">担当者</th>
              <th className="px-4 py-3 font-medium">アクション</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inquiries.map((inquiry) => {
              const { label: statusLabel, color: statusColor } =
                getStatusDetails(inquiry.status);
              const { label: priorityLabel, color: priorityColor } =
                getPriorityDetails(inquiry.priority);

              return (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">
                    <Link
                      href={`/system/inquiries/${inquiry.id}`}
                      className="text-gray-900 hover:text-primary"
                    >
                      {inquiry.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">{inquiry.customer_name}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="flex items-center">
                        <Mail size={14} className="mr-1 text-gray-400" />
                        {inquiry.customer_email}
                      </span>
                      {inquiry.customer_phone && (
                        <span className="flex items-center mt-1">
                          <Phone size={14} className="mr-1 text-gray-400" />
                          {inquiry.customer_phone}
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-sm max-w-xs truncate"
                    title={inquiry.subject}
                  >
                    <Link
                      href={`/system/inquiries/${inquiry.id}`}
                      className="text-gray-900 hover:text-primary"
                    >
                      {inquiry.subject}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full ${statusColor} text-xs`}
                    >
                      {statusLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full ${priorityColor} text-xs`}
                    >
                      {priorityLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(inquiry.created_at).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {inquiry.assigned_to_name || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      href={`/system/inquiries/${inquiry.id}`}
                      className="text-primary hover:text-blue-800 flex items-center"
                    >
                      <Eye size={16} className="mr-1" />
                      詳細
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={inquiries.length}
        currentPage={1}
        itemsPerPage={10}
      />
    </div>
  );
}
