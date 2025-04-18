import type React from 'react';

export default function SettingsLayout({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4 bg-muted/40">{navigation}</aside>
      <main className="flex-1 p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
