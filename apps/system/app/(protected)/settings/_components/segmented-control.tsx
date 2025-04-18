'use client';

import type * as React from 'react';
import { cn } from '@kit/ui/utils';

export interface SegmentOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onValueChange,
  className,
}: SegmentedControlProps) {
  return (
    <div className={cn('flex p-1 bg-muted rounded-md', className)}>
      {options.map((option) => (
        <button
          type="button"
          key={option.value}
          onClick={() => onValueChange(option.value)}
          className={cn(
            'flex items-center justify-center gap-2 flex-1 py-2 px-3 text-sm font-medium rounded transition-all',
            value === option.value
              ? 'bg-card text-card-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          )}
        >
          {option.icon && <span className="h-4 w-4">{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

interface SegmentedControlContentProps {
  value: string;
  activeValue: string;
  children: React.ReactNode;
}

export function SegmentedControlContent({
  value,
  activeValue,
  children,
}: SegmentedControlContentProps) {
  if (value !== activeValue) return null;

  return <div className="mt-6">{children}</div>;
}
