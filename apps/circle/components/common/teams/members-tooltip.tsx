'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import type { User } from '~/mock-data/users';

interface MembersTooltipProps {
  members: User[];
}

export function MembersTooltip({ members }: MembersTooltipProps) {
  const displayedMembers = members.slice(0, 3);
  const remainingCount = members.length - displayedMembers.length;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex -space-x-2">
            {displayedMembers.map((member) => (
              <Avatar
                key={member.id}
                className="size-6 border-2 border-container"
              >
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name[0]}
                </AvatarFallback>
              </Avatar>
            ))}
            {remainingCount > 0 && (
              <div className="size-6 rounded-full bg-sidebar border-2 border-container flex items-center justify-center text-xs z-[5]">
                +{remainingCount}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={8} className="p-2">
          <div className="flex flex-col gap-1">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-1.5">
                <Avatar className="size-5">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback className="text-[10px]">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{member.name}</span>
                <span className="text-xs text-muted-foreground mt-[1px]">
                  {' '}
                  - {member.email}
                </span>
                <span className="text-xs text-muted-foreground mt-[1px]">
                  ( {member.role} )
                </span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
