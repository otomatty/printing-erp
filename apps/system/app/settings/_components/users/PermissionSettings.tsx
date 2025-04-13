'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import { Switch } from '@kit/ui/switch';
import { Button } from '@kit/ui/button';
import { Shield, Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';

interface Permission {
  id: string;
  name: string;
  enabled: boolean;
}

interface Role {
  id: string;
  role: string;
  description: string;
  permissions: {
    [key: string]: boolean;
  };
}

export function PermissionSettings() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      role: '管理者',
      description:
        'すべての機能にアクセスできます。ユーザー管理、システム設定の変更が可能です。',
      permissions: {
        ダッシュボード: true,
        注文管理: true,
        顧客管理: true,
        在庫管理: true,
        製造管理: true,
        見積り管理: true,
        お問い合わせ管理: true,
        システム設定: true,
      },
    },
    {
      id: 'staff',
      role: 'スタッフ',
      description:
        '日常業務に必要な機能にアクセスできますが、システム設定の変更はできません。',
      permissions: {
        ダッシュボード: true,
        注文管理: true,
        顧客管理: true,
        在庫管理: true,
        製造管理: true,
        見積り管理: true,
        お問い合わせ管理: true,
        システム設定: false,
      },
    },
    {
      id: 'viewer',
      role: '閲覧者',
      description: '閲覧のみ可能です。データの編集や新規作成はできません。',
      permissions: {
        ダッシュボード: true,
        注文管理: true,
        顧客管理: true,
        在庫管理: false,
        製造管理: false,
        見積り管理: false,
        お問い合わせ管理: false,
        システム設定: false,
      },
    },
  ]);

  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isNewRole, setIsNewRole] = useState(false);
  const [availablePermissions] = useState([
    'ダッシュボード',
    '注文管理',
    '顧客管理',
    '在庫管理',
    '製造管理',
    '見積り管理',
    'お問い合わせ管理',
    'システム設定',
    'レポート閲覧',
    'ユーザー管理',
  ]);

  const handleAddRole = () => {
    setIsNewRole(true);
    const newPermissions: { [key: string]: boolean } = {};
    for (const perm of availablePermissions) {
      newPermissions[perm] = false;
    }

    setCurrentRole({
      id: '',
      role: '',
      description: '',
      permissions: newPermissions,
    });
    setIsRoleDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setIsNewRole(false);
    setCurrentRole(role);
    setIsRoleDialogOpen(true);
  };

  const handleTogglePermission = (roleId: string, permission: string) => {
    setRoles(
      roles.map((role) => {
        if (role.id === roleId) {
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [permission]: !role.permissions[permission],
            },
          };
        }
        return role;
      })
    );
  };

  const handleSaveRole = () => {
    if (!currentRole || !currentRole.role) return;

    if (isNewRole) {
      // 新規追加の場合
      const newId = currentRole.role.toLowerCase().replace(/\s+/g, '_');
      setRoles([...roles, { ...currentRole, id: newId }]);
    } else {
      // 編集の場合
      setRoles(
        roles.map((role) => (role.id === currentRole.id ? currentRole : role))
      );
    }

    setIsRoleDialogOpen(false);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>ユーザー権限設定</CardTitle>
          <CardDescription>
            各ユーザー役割ごとに権限を設定します。
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleAddRole}>
          <Plus className="h-4 w-4 mr-2" />
          役割追加
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roles.map((roleData) => (
            <div key={roleData.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="mb-2 font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    {roleData.role}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {roleData.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditRole(roleData)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    編集
                  </Button>
                  {roleData.id !== 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteRole(roleData.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      削除
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Object.entries(roleData.permissions).map(([perm, value]) => (
                  <div key={perm} className="flex items-center space-x-2">
                    <Switch
                      id={`${roleData.id}-${perm}`}
                      checked={value}
                      onCheckedChange={() =>
                        handleTogglePermission(roleData.id, perm)
                      }
                      disabled={roleData.id === 'admin'}
                    />
                    <Label
                      htmlFor={`${roleData.id}-${perm}`}
                      className="text-sm"
                    >
                      {perm}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 役割編集/追加ダイアログ */}
        {currentRole && (
          <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {isNewRole ? '新しい役割を追加' : '役割を編集'}
                </DialogTitle>
                <DialogDescription>
                  役割の名前と説明、および各機能へのアクセス権限を設定します。
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">役割名</Label>
                  <Input
                    id="role-name"
                    value={currentRole.role}
                    onChange={(e) =>
                      setCurrentRole({ ...currentRole, role: e.target.value })
                    }
                    placeholder="例: 営業担当"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-description">説明</Label>
                  <Textarea
                    id="role-description"
                    value={currentRole.description}
                    onChange={(e) =>
                      setCurrentRole({
                        ...currentRole,
                        description: e.target.value,
                      })
                    }
                    placeholder="この役割の説明を入力してください"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="mb-2 block">権限設定</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border rounded-md p-3">
                    {availablePermissions.map((perm) => (
                      <div key={perm} className="flex items-center space-x-2">
                        <Switch
                          id={`edit-${perm}`}
                          checked={currentRole.permissions[perm] || false}
                          onCheckedChange={(checked) =>
                            setCurrentRole({
                              ...currentRole,
                              permissions: {
                                ...currentRole.permissions,
                                [perm]: checked,
                              },
                            })
                          }
                        />
                        <Label htmlFor={`edit-${perm}`} className="text-sm">
                          {perm}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRoleDialogOpen(false)}
                >
                  キャンセル
                </Button>
                <Button onClick={handleSaveRole}>保存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
