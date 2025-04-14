'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'relative flex w-full rounded-lg p-1 bg-card shadow-sm',
      'border border-border/40',
      'overflow-hidden',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2.5',
      'text-sm font-medium ring-offset-background transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      // 非アクティブ状態
      'text-muted-foreground hover:text-foreground hover:bg-muted/50',
      // ホバー時の下線表示
      'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-200',
      'hover:after:scale-x-100',
      // アクティブ状態
      'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm',
      // アクティブ状態では下線を表示しない
      'data-[state=active]:after:scale-x-0 data-[state=active]:hover:after:scale-x-0',
      'active:scale-[0.98]',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background rounded-md',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      // アニメーション効果
      'animate-in fade-in-50 slide-in-from-bottom-3 duration-300 ease-out',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
