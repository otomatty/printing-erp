'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kit/ui/tabs';
import type { ReactNode } from 'react';
import { Layers, Settings, Tag, Zap, FileText, Clock } from 'lucide-react';

// アイコンのマッピング
const ICON_MAP = {
  settings: Settings,
  tag: Tag,
  zap: Zap,
  fileText: FileText,
  clock: Clock,
  layers: Layers,
};

type IconName = keyof typeof ICON_MAP;

interface TabItem {
  id: string;
  label: string;
  iconName: IconName;
  content: ReactNode;
}

interface InquiryTabsProps {
  tabConfig: readonly TabItem[];
}

export default function InquiryTabs({ tabConfig }: InquiryTabsProps) {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-2">
        {tabConfig.map((item) => {
          const IconComponent = ICON_MAP[item.iconName];
          return (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="flex items-center gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {item.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabConfig.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
