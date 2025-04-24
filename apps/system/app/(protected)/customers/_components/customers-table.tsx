'use client';

import Link from 'next/link';
import { Search, Mail, Phone, Eye } from 'lucide-react';
import type { Customer } from '../../../_actions/customers';

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="顧客名や担当者名で検索..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">すべての顧客</option>
          <option value="active">アクティブな顧客</option>
          <option value="inactive">非アクティブな顧客</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-4 py-3 font-medium">顧客ID</th>
              <th className="px-4 py-3 font-medium">顧客名</th>
              <th className="px-4 py-3 font-medium">担当者</th>
              <th className="px-4 py-3 font-medium">連絡先</th>
              <th className="px-4 py-3 font-medium">最終注文日</th>
              <th className="px-4 py-3 font-medium">アクション</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{customer.id}</td>
                <td className="px-4 py-3 font-medium">{customer.name}</td>
                <td className="px-4 py-3 text-sm">{customer.contact}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      <Mail size={14} className="mr-1 text-gray-400" />
                      {customer.email}
                    </span>
                    <span className="flex items-center mt-1">
                      <Phone size={14} className="mr-1 text-gray-400" />
                      {customer.phone}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{customer.lastOrder}</td>
                <td className="px-4 py-3 text-sm">
                  <Link
                    href={`/customers/${customer.id}`}
                    className="text-primary hover:text-blue-800 flex items-center"
                  >
                    <Eye size={16} className="mr-1" />
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <p className="text-sm text-gray-500">
          全{customers.length}件中 1-{customers.length}件を表示
        </p>
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
            className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400"
            disabled
          >
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}
