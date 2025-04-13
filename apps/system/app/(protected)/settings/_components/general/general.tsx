'use client';

import { useState } from 'react';
import { SystemSettings } from './system';
import { NotificationSettings } from './notification';
import { Settings, Bell } from 'lucide-react';
import {
  SegmentedControl,
  SegmentedControlContent,
} from '../ui/segmented-control';

export function GeneralSettings() {
  const [activeSegment, setActiveSegment] = useState('system');

  const segmentOptions = [
    {
      value: 'system',
      label: 'システム設定',
      icon: <Settings className="h-4 w-4" />,
    },
    {
      value: 'notifications',
      label: '通知設定',
      icon: <Bell className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-6">
      <SegmentedControl
        options={segmentOptions}
        value={activeSegment}
        onValueChange={setActiveSegment}
        className="w-full max-w-md mb-6"
      />

      <SegmentedControlContent value="system" activeValue={activeSegment}>
        <SystemSettings />
      </SegmentedControlContent>

      <SegmentedControlContent
        value="notifications"
        activeValue={activeSegment}
      >
        <NotificationSettings />
      </SegmentedControlContent>
    </div>
  );
}
