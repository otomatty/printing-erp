import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import type { AgentWorkload } from '../_data';
import { Avatar, AvatarFallback } from '@kit/ui/avatar';

type AgentWorkloadsProps = {
  agents: AgentWorkload[];
};

export function AgentWorkloads({ agents }: AgentWorkloadsProps) {
  // 担当案件数でソート
  const sortedAgents = [...agents].sort(
    (a, b) => b.assigned_inquiries - a.assigned_inquiries
  );

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">担当者稼働状況</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAgents.map((agent) => (
            <div
              key={agent.agent_id}
              className="flex items-center justify-between p-2 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {agent.agent_name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{agent.agent_name}</p>
                  <p className="text-xs text-muted-foreground">
                    本日解決: {agent.resolved_today}件
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm">担当案件</p>
                  <p className="text-sm font-medium">
                    {agent.assigned_inquiries}件
                  </p>
                </div>
                <Badge
                  variant={agent.open_inquiries > 0 ? 'outline' : 'secondary'}
                  className={
                    agent.open_inquiries > 0
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      : ''
                  }
                >
                  {agent.open_inquiries}件 対応中
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
