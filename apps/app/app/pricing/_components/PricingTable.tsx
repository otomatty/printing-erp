import React from 'react';

export interface Plan {
  name: string;
  price: string;
  users: string;
  support: string;
  popular: boolean;
}
export interface PricingTableProps {
  plans: Plan[];
}

export function PricingTable({ plans }: PricingTableProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 overflow-x-auto">
        <table className="w-full text-center table-auto border-collapse">
          <thead>
            <tr>
              <th className="p-4" />
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className={`p-4 border ${plan.popular ? 'bg-primary text-white' : ''}`}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border">価格</td>
              {plans.map((plan) => (
                <td key={plan.name} className="p-4 border font-bold">
                  {plan.price}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border">ユーザー数</td>
              {plans.map((plan) => (
                <td key={plan.name} className="p-4 border">
                  {plan.users}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border">サポート</td>
              {plans.map((plan) => (
                <td key={plan.name} className="p-4 border">
                  {plan.support}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
