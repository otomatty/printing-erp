'use client';

import React, { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { toPng } from 'html-to-image';
import { useRouter } from 'next/navigation';

export function FabMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRequestFeedback = async () => {
    // Capture only the visible viewport using html-to-image
    const dataUrl = await toPng(document.body, {
      width: window.innerWidth,
      height: window.innerHeight,
      style: {
        transform: `translate(-${window.scrollX}px, -${window.scrollY}px)`,
        transformOrigin: 'top left',
      },
    });
    // Pass screenshot via query param or state
    try {
      sessionStorage.setItem('feedback_screenshot', dataUrl);
    } catch (e) {
      console.error('Failed to store screenshot in sessionStorage', e);
    }
    // Use full browser navigation to avoid large router state headers
    window.location.href = '/development/requests/new';
  };

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <div className="fixed bottom-6 right-6 z-50">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
            >
              <Plus />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={5} className="w-56">
            <DropdownMenuItem onSelect={handleRequestFeedback}>
              このページについて要望する
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </MotionConfig>
  );
}
