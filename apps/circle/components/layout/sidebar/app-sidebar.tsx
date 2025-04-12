'use client';

import { Github } from 'lucide-react';
import {
  Box,
  ContactRound,
  FolderKanban,
  Inbox,
  UserRound,
} from 'lucide-react';
import * as React from 'react';

import { HelpButton } from '~/components/layout/sidebar/help-button';
import { NavInbox } from '~/components/layout/sidebar/nav-inbox';
import { NavTeams } from '~/components/layout/sidebar/nav-teams';
import { NavWorkspace } from '~/components/layout/sidebar/nav-workspace';
import { OrgSwitcher } from '~/components/layout/sidebar/org-switcher';
import { Button } from '@kit/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@kit/ui/sidebar';
import { teams } from '~/mock-data/Teams';
import Link from 'next/link';
import { X } from 'lucide-react';

const data = {
  inbox: [
    {
      name: 'Inbox',
      url: '#',
      icon: Inbox,
    },
    {
      name: 'My issues',
      url: '#',
      icon: FolderKanban,
    },
  ],
  workspace: [
    {
      name: 'Teams',
      url: '/lndev-ui/teams',
      icon: ContactRound,
    },
    {
      name: 'Projects',
      url: '/lndev-ui/projects',
      icon: Box,
    },
    {
      name: 'Members',
      url: '/lndev-ui/members',
      icon: UserRound,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [open, setOpen] = React.useState(true);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <OrgSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavInbox inbox={data.inbox} />
        <NavWorkspace workspace={data.workspace} />
        <NavTeams items={teams.filter((t) => t.joined)} />
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex flex-col gap-2">
          {open && (
            <div className="group/sidebar relative flex flex-col gap-2 rounded-lg border p-4 text-sm w-full">
              <button
                className="absolute top-2.5 right-2 z-10 cursor-pointer"
                onClick={() => setOpen(!open)}
                type="button"
              >
                <X className="size-4" />
              </button>
              <div className="text-balance text-lg font-semibold leading-tight group-hover/sidebar:underline">
                Fine components coded by lndev.
              </div>
              <div>
                A fun collection of small, well-coded components to streamline
                your development process.
              </div>
              <Link
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0"
                href="https://ui.lndev.me"
              >
                <span className="sr-only">Deploy to Vercel</span>
              </Link>
              <Button size="sm" className="w-full">
                <Link
                  href="https://ui.lndev.me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ui.lndev.me
                </Link>
              </Button>
            </div>
          )}
          <div className="w-full flex items-center justify-between">
            <HelpButton />
            <Button size="icon" variant="secondary" asChild>
              <Link
                href="https://github.com/ln-dev7/circle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
