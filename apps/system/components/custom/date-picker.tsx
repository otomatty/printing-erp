'use client';

import type React from 'react';
import { useState, useEffect } from 'react';

interface DatePickerProps {
  /** 初期値として表示するISOフォーマットの日時文字列 */
  initialValue?: string;
  /** 日付変更時に呼ばれるコールバック */
  onChange: (value: string) => void;
  /** 必須入力フラグ */
  required?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  initialValue,
  onChange,
  required = false,
  className = '',
}) => {
  const [value, setValue] = useState(initialValue ?? '');

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setValue(newVal);
    onChange(newVal);
  };

  return (
    <input
      type="datetime-local"
      value={value}
      onChange={handleChange}
      required={required}
      className={`border rounded-md p-2 ${className}`}
    />
  );
};
