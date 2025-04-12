'use client';

import { Button } from '@kit/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@kit/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@kit/ui/popover';
import { useAtomValue } from 'jotai';
import { statusCountsAtom } from '~/store/issues-store';
import { status as allStatus, type Status } from '~/mock-data/status';
import { CheckIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

interface StatusSelectorProps {
  status: Status;
  onChange: (status: Status) => void;
}

export function StatusSelector({ status, onChange }: StatusSelectorProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(status.id);

  // const { filterByStatus } = useIssuesStore(); // 古いフックを削除
  // TODO: Replace with statusCountsAtom when available
  const statusCounts = useAtomValue(statusCountsAtom);

  useEffect(() => {
    setValue(status.id);
  }, [status.id]);

  const handleStatusChange = (statusId: string) => {
    setValue(statusId);
    setOpen(false);

    const newStatus = allStatus.find((s) => s.id === statusId);
    if (newStatus) {
      onChange(newStatus);
    }
  };

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            className="flex items-center justify-center"
            size="sm"
            variant="secondary"
            aria-expanded={open}
          >
            {(() => {
              const selectedItem = allStatus.find((item) => item.id === value);
              if (selectedItem) {
                const Icon = selectedItem.icon;
                return <Icon />;
              }
              return null;
            })()}
            <span>
              {value ? allStatus.find((s) => s.id === value)?.name : 'To do'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Set status..." />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {allStatus.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleStatusChange(item.id)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon />
                      {item.name}
                    </div>
                    {value === item.id && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                    {/* TODO: Display count using statusCountsAtom */}
                    <span className="text-muted-foreground text-xs">
                      {statusCounts ? (statusCounts[item.id] ?? 0) : 0}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
