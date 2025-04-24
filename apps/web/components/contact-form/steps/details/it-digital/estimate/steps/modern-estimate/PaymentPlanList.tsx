'use client';

import React from 'react';

interface PaymentPlanOption {
  value: number;
  label: string;
}

interface PaymentPlanListProps {
  installmentOptions: PaymentPlanOption[];
  getMonthlyPayment: (installments: number) => number;
  getModernTotalPrice: (installments: number) => number;
}

export function PaymentPlanList({
  installmentOptions,
  getMonthlyPayment,
  getModernTotalPrice,
}: PaymentPlanListProps) {
  return (
    <div className="bg-white p-4 rounded-lg border mb-6 md:hidden">
      <h4 className="text-lg font-bold mb-4">お支払いプラン一覧</h4>
      <ul className="space-y-4">
        {installmentOptions.map((option) => (
          <li
            key={option.value}
            className="flex flex-col space-y-1 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{option.label}</span>
              <span className="font-bold text-primary">
                {getMonthlyPayment(option.value).toLocaleString()}円
              </span>
            </div>
            <div className="text-sm text-muted-foreground text-right">
              {getModernTotalPrice(option.value).toLocaleString()}円
            </div>
            {option.value === 1 && (
              <div className="text-xs text-green-600">
                一括払い時に5%割引適用
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground mt-4">
        ※分割払いは開発開始時から月々定額でのお支払いとなります。
        {installmentOptions.length > 4 && (
          <span>
            {' '}
            月々の支払い金額が大きい場合は、より長期の分割払いプランもご用意しています。
          </span>
        )}
      </p>
    </div>
  );
}
