'use client';

import { useState } from 'react';
import { ThemeToggle } from '@kit/ui/theme-toggle';
import { ColorThemeToggle } from '~/components/custom/color-theme-toggle';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { useColorTheme } from '~/components/color-theme-provider';

export default function ThemeShowcasePage() {
  const { colorTheme } = useColorTheme();
  const [email, setEmail] = useState('');

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">テーマカラーショーケース</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ColorThemeToggle />
          </div>
        </div>

        <div className="grid gap-8">
          {/* セクション1: 基本カラー */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">基本カラー</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-primary rounded-md" />
                <span className="text-sm font-medium">Primary</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-secondary rounded-md" />
                <span className="text-sm font-medium">Secondary</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-accent rounded-md" />
                <span className="text-sm font-medium">Accent</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-destructive rounded-md" />
                <span className="text-sm font-medium">Destructive</span>
              </div>
            </div>
          </section>

          {/* セクション2: 拡張カラー */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">拡張カラー</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-primary-light rounded-md" />
                <span className="text-sm font-medium">Primary Light</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-primary-lighter rounded-md" />
                <span className="text-sm font-medium">Primary Lighter</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-primary-dark rounded-md" />
                <span className="text-sm font-medium">Primary Dark</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-primary-darker rounded-md" />
                <span className="text-sm font-medium">Primary Darker</span>
              </div>
            </div>
          </section>

          {/* セクション3: グラデーション */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">グラデーション</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-theme-gradient rounded-md" />
                <span className="text-sm font-medium">Theme Gradient</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-full h-20 bg-theme-gradient-subtle rounded-md" />
                <span className="text-sm font-medium">
                  Theme Gradient Subtle
                </span>
              </div>
            </div>
          </section>

          {/* セクション4: UIコンポーネント */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">UIコンポーネント</h2>

            <Tabs defaultValue="buttons" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="buttons">ボタン</TabsTrigger>
                <TabsTrigger value="cards">カード</TabsTrigger>
                <TabsTrigger value="forms">フォーム</TabsTrigger>
              </TabsList>
              <TabsContent
                value="buttons"
                className="p-4 border rounded-md mt-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">標準ボタン</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button>デフォルト</Button>
                      <Button variant="secondary">セカンダリ</Button>
                      <Button variant="destructive">削除</Button>
                      <Button variant="outline">アウトライン</Button>
                      <Button variant="ghost">ゴースト</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">カスタムボタン</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn-primary px-4 py-2 rounded-md"
                      >
                        カスタム
                      </button>
                      <button
                        type="button"
                        className="bg-primary-light text-primary-foreground px-4 py-2 rounded-md"
                      >
                        Light
                      </button>
                      <button
                        type="button"
                        className="bg-accent text-accent-foreground px-4 py-2 rounded-md"
                      >
                        アクセント
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="cards" className="p-4 border rounded-md mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>標準カード</CardTitle>
                      <CardDescription>
                        Shadcn/UIデフォルトスタイル
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>現在のテーマ: {colorTheme}</p>
                    </CardContent>
                    <CardFooter>
                      <Button>アクション</Button>
                    </CardFooter>
                  </Card>

                  <div className="card p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">カスタムカード</h3>
                    <p className="mb-4">カスタムクラスを使ったカードスタイル</p>
                    <button
                      type="button"
                      className="bg-primary text-primary-foreground px-3 py-1.5 text-sm rounded"
                    >
                      ボタン
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="forms" className="p-4 border rounded-md mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="standard-email">標準入力</Label>
                      <Input
                        id="standard-email"
                        type="email"
                        placeholder="メールアドレスを入力"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <Button type="submit">送信</Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="custom-email"
                        className="text-sm font-medium"
                      >
                        カスタム入力
                      </label>
                      <input
                        id="custom-email"
                        type="email"
                        placeholder="メールアドレスを入力"
                        className="form-input w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-primary px-4 py-2 rounded-md"
                    >
                      送信
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* セクション5: 印刷ビジネス固有スタイル */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              印刷ビジネス向けスタイル
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-40 overflow-hidden rounded-lg">
                <div className="absolute inset-0 print-texture" />
                <div className="relative z-10 flex items-center justify-center h-full p-6 bg-white/80 dark:bg-black/80">
                  <p className="text-center">印刷テクスチャオーバーレイ</p>
                </div>
              </div>

              <div className="border border-theme rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  テーマボーダー
                </h3>
                <p className="mb-4">
                  印刷物のエッジを想起させるボーダースタイル
                </p>
                <div className="border-t-2 border-theme-light pt-2">
                  <span className="text-sm">セクション区切り</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">利用方法</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>右上のカラーセレクターでテーマカラーを切り替えられます</li>
            <li>ダーク/ライトモードと併用可能です</li>
            <li>すべてのUIコンポーネントがテーマに自動対応します</li>
            <li>
              独自のコンポーネントには{' '}
              <code className="bg-muted px-1 py-0.5 rounded">.btn-primary</code>{' '}
              のようなクラスが使えます
            </li>
            <li>
              カラーバリエーションには{' '}
              <code className="bg-muted px-1 py-0.5 rounded">
                .bg-primary-light
              </code>{' '}
              のようなユーティリティが使えます
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
