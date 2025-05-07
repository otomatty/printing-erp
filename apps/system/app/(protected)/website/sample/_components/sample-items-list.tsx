'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@kit/ui/card';
import type { SampleItem } from '~/types/sample';

interface SampleItemsListProps {
  sampleItems: SampleItem[];
}

export default function SampleItemsList({ sampleItems }: SampleItemsListProps) {
  if (sampleItems.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        サンプル項目がありません。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sampleItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-32 object-cover rounded"
              />
            )}
            {item.description && (
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
