'use client';

import React from 'react';

interface PaymentPlanOption {
  value: number;
  label: string;
}

interface PaymentPlanTableProps {
  installmentOptions: PaymentPlanOption[];
  getMonthlyPayment: (installments: number) => number;
  getModernTotalPrice: (installments: number) => number;
}

export function PaymentPlanTable({
  installmentOptions,
  getMonthlyPayment,
  getModernTotalPrice,
}: PaymentPlanTableProps) {
  return (
    <div className="bg-white p-6 rounded-lg border mb-6 hidden md:block">
      <h4 className="text-lg font-bold mb-4">お支払いプラン一覧</h4>
      <div className="grid gap-4">
        <div className="grid grid-cols-4 gap-2 font-medium text-sm text-muted-foreground border-b pb-2">
          <div>お支払いプラン</div>
          <div>月々のお支払い</div>
          <div>お支払い回数</div>
          <div>お支払い総額</div>
        </div>
        {installmentOptions.map((option) => (
          <div
            key={option.value}
            className="grid grid-cols-4 gap-2 py-3 border-b last:border-0"
          >
            <div className="font-medium">{option.label}</div>
            <div className="font-bold text-primary">
              {getMonthlyPayment(option.value).toLocaleString()}円
            </div>
            <div>{option.value === 1 ? '一括' : `${option.value}回`}</div>
            <div>
              {getModernTotalPrice(option.value).toLocaleString()}円
              {option.value === 1 && (
                <span className="text-xs text-green-600 block">
                  (5%割引適用)
                </span>
              )}
            </div>
          </div>
        ))}
        <p className="text-sm text-muted-foreground mt-4">
          ※分割払いは開発開始時から月々定額でのお支払いとなります。お支払い方法の詳細はお問い合わせください。
          {installmentOptions.length > 4 && (
            <span>
              {' '}
              月々の支払い金額が大きい場合は、より長期の分割払いプランもご用意しています。
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
