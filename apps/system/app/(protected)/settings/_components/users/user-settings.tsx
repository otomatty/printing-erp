'use client';

import { useState } from 'react';
import { UserManagement } from './user-management';
import { PermissionSettings } from './permission-settings';
import { Users, Shield } from 'lucide-react';
import {
  SegmentedControl,
  SegmentedControlContent,
} from '../ui/segmented-control';

export function UserSettings() {
  const [activeSegment, setActiveSegment] = useState('users');

  const segmentOptions = [
    {
      value: 'users',
      label: 'ユーザー管理',
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: 'permissions',
      label: '権限設定',
      icon: <Shield className="h-4 w-4" />,
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

      <SegmentedControlContent value="users" activeValue={activeSegment}>
        <UserManagement />
      </SegmentedControlContent>

      <SegmentedControlContent value="permissions" activeValue={activeSegment}>
        <PermissionSettings />
      </SegmentedControlContent>
    </div>
  );
}
