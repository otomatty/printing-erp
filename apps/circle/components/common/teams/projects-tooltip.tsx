'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import type { Project } from '~/mock-data/projects';
import { Box } from 'lucide-react';

interface ProjectsTooltipProps {
  projects: Project[];
}

export function ProjectsTooltip({ projects }: ProjectsTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Box className="size-4" />
            <span>{projects.length}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={8} className="p-2">
          <div className="flex flex-col gap-1">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center gap-1.5">
                <project.icon className="size-4 shrink-0" />
                <span className="text-sm w-full text-left">
                  {project?.name}
                </span>
                <div className="shrink-0">
                  <project.status.icon />
                </div>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
