'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@kit/ui/button';
import { Calculator } from 'lucide-react';

interface MobileEstimateButtonProps {
  href: string;
  label?: string;
}

export default function MobileEstimateButton({
  href,
  label = 'かんたん見積もりを試す',
}: MobileEstimateButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-lg md:hidden">
      <Link href={href} className="block">
        <Button
          className="w-full py-6 text-base font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all"
          size="lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          {label}
        </Button>
      </Link>
    </div>
  );
}
