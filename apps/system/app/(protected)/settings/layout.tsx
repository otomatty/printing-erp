import type React from 'react';

import { SettingsNavigation } from './navigation';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4 bg-muted/40">
        <SettingsNavigation />
      </aside>
      <main className="flex-1 p-6 container">{children}</main>
    </div>
  );
}
