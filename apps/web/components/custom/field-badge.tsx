import React from 'react';

export type FieldBadgeProps = {
  variant: 'required' | 'optional';
  className?: string;
};

export default function FieldBadge({
  variant,
  className = '',
}: FieldBadgeProps) {
  const baseClass = 'inline-block px-2 py-0.5 rounded-full text-xs font-medium';
  const variantClass =
    variant === 'required'
      ? 'bg-red-100 text-red-600'
      : 'bg-gray-100 text-gray-600';
  return (
    <span className={`${baseClass} ${variantClass} ${className}`}>
      {variant === 'required' ? '必須' : '任意'}
    </span>
  );
}
