'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Switch } from '@kit/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';
import {
  UserPlus,
  Pencil,
  UserX,
  UserCheck,
  Users,
  UserCircle,
} from 'lucide-react';
import {
  SegmentedControl,
  SegmentedControlContent,
} from '../ui/segmented-control';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: '管理者',
      email: 'admin@example.com',
      role: '管理者',
      status: '有効',
      lastLogin: '2023/07/05 10:30',
    },
    {
      id: 2,
      name: '佐藤次郎',
      email: 'sato@example.com',
      role: 'スタッフ',
      status: '有効',
      lastLogin: '2023/07/04 15:45',
    },
    {
      id: 3,
      name: '田中花子',
      email: 'tanaka@example.com',
      role: 'スタッフ',
      status: '有効',
      lastLogin: '2023/07/05 09:15',
    },
    {
      id: 4,
      name: '山田太郎',
      email: 'yamada@example.com',
      role: '閲覧者',
      status: '無効',
      lastLogin: '2023/06/28 11:20',
    },
  ]);

  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [activeSegment, setActiveSegment] = useState('user-list');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = () => {
    setIsNewUser(true);
    setCurrentUser({
      id: 0,
      name: '',
      email: '',
      role: 'スタッフ',
      status: '有効',
      lastLogin: '-',
    });
    setIsUserDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setIsNewUser(false);
    setCurrentUser(user);
    setIsUserDialogOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setActiveSegment('user-detail');
  };

  const handleBackToList = () => {
    setActiveSegment('user-list');
    setSelectedUser(null);
  };

  const handleToggleStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === '有効' ? '無効' : '有効' }
          : user
      )
    );
  };

  const handleSaveUser = () => {
    if (!currentUser || !currentUser.name || !currentUser.email) return;

    if (isNewUser) {
      const newId = Math.max(0, ...users.map((u) => u.id)) + 1;
      setUsers([...users, { ...currentUser, id: newId }]);
    } else {
      setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    }

    setIsUserDialogOpen(false);
  };

  const segmentOptions = [
    {
      value: 'user-list',
      label: 'ユーザー一覧',
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: 'user-detail',
      label: selectedUser ? `${selectedUser.name}の詳細` : 'ユーザー詳細',
      icon: <UserCircle className="h-4 w-4" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>ユーザー管理</CardTitle>
          <CardDescription>
            システムを利用するユーザーの追加・編集を行います。
          </CardDescription>
          <SegmentedControl
            options={segmentOptions}
            value={activeSegment}
            onValueChange={setActiveSegment}
            className="mt-4 max-w-md"
          />
        </div>
        <Button size="sm" onClick={handleAddUser}>
          <UserPlus className="h-4 w-4 mr-2" />
          新規ユーザー追加
        </Button>
      </CardHeader>
      <CardContent>
        <SegmentedControlContent value="user-list" activeValue={activeSegment}>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-muted">
                <tr className="text-left text-muted-foreground text-sm">
                  <th className="px-4 py-3 font-medium">ユーザー名</th>
                  <th className="px-4 py-3 font-medium">メールアドレス</th>
                  <th className="px-4 py-3 font-medium">役割</th>
                  <th className="px-4 py-3 font-medium">ステータス</th>
                  <th className="px-4 py-3 font-medium">最終ログイン</th>
                  <th className="px-4 py-3 font-medium">アクション</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleViewUser(user)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleViewUser(user);
                      }
                    }}
                    tabIndex={0}
                  >
                    <td className="px-4 py-3 text-sm font-medium">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-muted rounded-full text-xs">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === '有効'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.lastLogin}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          編集
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={
                            user.status === '有効'
                              ? 'text-destructive'
                              : 'text-green-600'
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(user.id);
                          }}
                        >
                          {user.status === '有効' ? (
                            <>
                              <UserX className="h-4 w-4 mr-1" />
                              無効化
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4 mr-1" />
                              有効化
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SegmentedControlContent>

        <SegmentedControlContent
          value="user-detail"
          activeValue={activeSegment}
        >
          {selectedUser ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={handleBackToList}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleBackToList();
                    }
                  }}
                >
                  ← ユーザー一覧に戻る
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleEditUser(selectedUser)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  編集
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    名前
                  </h3>
                  <p className="text-lg font-medium">{selectedUser.name}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    メールアドレス
                  </h3>
                  <p>{selectedUser.email}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    役割
                  </h3>
                  <span className="px-2 py-1 bg-muted rounded-full text-xs">
                    {selectedUser.role}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    ステータス
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedUser.status === '有効'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    最終ログイン
                  </h3>
                  <p>{selectedUser.lastLogin}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                ユーザーを選択してください
              </p>
              <Button
                variant="outline"
                onClick={handleBackToList}
                className="mt-4"
              >
                ユーザー一覧に戻る
              </Button>
            </div>
          )}
        </SegmentedControlContent>
      </CardContent>

      {/* ユーザー編集/追加ダイアログ */}
      {currentUser && (
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isNewUser ? '新規ユーザー追加' : 'ユーザー編集'}
              </DialogTitle>
              <DialogDescription>
                ユーザー情報を入力してください。保存ボタンをクリックすると変更が適用されます。
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">ユーザー名</Label>
                <Input
                  id="name"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">役割</Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value) =>
                    setCurrentUser({ ...currentUser, role: value })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="役割を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="管理者">管理者</SelectItem>
                    <SelectItem value="スタッフ">スタッフ</SelectItem>
                    <SelectItem value="閲覧者">閲覧者</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={currentUser.status === '有効'}
                  onCheckedChange={(checked) =>
                    setCurrentUser({
                      ...currentUser,
                      status: checked ? '有効' : '無効',
                    })
                  }
                />
                <Label htmlFor="status">アカウントを有効にする</Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsUserDialogOpen(false)}
              >
                キャンセル
              </Button>
              <Button onClick={handleSaveUser}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
