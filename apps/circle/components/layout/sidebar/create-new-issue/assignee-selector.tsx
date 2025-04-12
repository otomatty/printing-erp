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
// import { useIssuesStore } from '~/store/issues-store'; // 古いストアを削除
// TODO: Add an atom in issues-store.ts to efficiently get counts per assignee
// import { useAtomValue } from 'jotai';
import { useAtomValue } from 'jotai';
import { assigneeCountsAtom } from '~/store/issues-store';
import { type User, users } from '~/mock-data/users';
import { CheckIcon, UserCircle } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';

interface AssigneeSelectorProps {
  assignee: User | null;
  onChange: (assignee: User | null) => void;
}

export function AssigneeSelector({
  assignee,
  onChange,
}: AssigneeSelectorProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(assignee?.id || null);

  // const { filterByAssignee } = useIssuesStore(); // 古いフックを削除
  // TODO: Replace with assigneeCountsAtom when available
  const assigneeCounts = useAtomValue(assigneeCountsAtom);

  useEffect(() => {
    setValue(assignee?.id || null);
  }, [assignee]);

  const handleAssigneeChange = (userId: string) => {
    if (userId === 'unassigned') {
      setValue(null);
      onChange(null);
    } else {
      setValue(userId);
      const newAssignee = users.find((u) => u.id === userId);
      if (newAssignee) {
        onChange(newAssignee);
      }
    }
    setOpen(false);
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
            {value ? (
              (() => {
                const selectedUser = users.find((user) => user.id === value);
                if (selectedUser) {
                  return (
                    <Avatar className="size-5">
                      <AvatarImage
                        src={selectedUser.avatarUrl}
                        alt={selectedUser.name}
                      />
                      <AvatarFallback>
                        {selectedUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  );
                }
                return <UserCircle className="size-5" />;
              })()
            ) : (
              <UserCircle className="size-5" />
            )}
            <span>
              {value
                ? users.find((user) => user.id === value)?.name
                : 'Unassigned'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Assign to..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="unassigned"
                  onSelect={() => handleAssigneeChange('unassigned')}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <UserCircle className="size-5" />
                    Unassigned
                  </div>
                  {value === null && (
                    <CheckIcon size={16} className="ml-auto" />
                  )}
                  <span className="text-muted-foreground text-xs">
                    {assigneeCounts ? (assigneeCounts.unassigned ?? 0) : 0}
                  </span>
                </CommandItem>
                {users
                  .filter((user) => user.teamIds.includes('CORE'))
                  .map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      onSelect={() => handleAssigneeChange(user.id)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-5">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {user.name}
                      </div>
                      {value === user.id && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                      {/* TODO: Display count using assigneeCountsAtom */}
                      <span className="text-muted-foreground text-xs">
                        {assigneeCounts ? (assigneeCounts[user.id] ?? 0) : 0}
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
