import { PlusCircle, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/avatar';
import { Textarea } from '@kit/ui/textarea';

type ProductionNotesProps = {
  jobId: string;
};

// モックのメモデータ
const mockNotes = [
  {
    id: 'note-1',
    user: {
      name: '佐藤営業',
      avatar: '/avatars/sato.jpg',
      initials: 'ST',
    },
    content:
      '顧客との打ち合わせで、印刷後の光沢感について強い希望がありました。マットPP加工で対応予定です。',
    timestamp: '2023/07/05 14:30',
  },
  {
    id: 'note-2',
    user: {
      name: '田中製造',
      avatar: '/avatars/tanaka.jpg',
      initials: 'TN',
    },
    content:
      'デザインデータのトンボがずれています。DTP担当に修正依頼しました。',
    timestamp: '2023/07/06 10:15',
  },
  {
    id: 'note-3',
    user: {
      name: '鈴木デザイン',
      avatar: '/avatars/suzuki.jpg',
      initials: 'SZ',
    },
    content: 'トンボ修正完了しました。修正バージョンをアップロードしています。',
    timestamp: '2023/07/06 11:30',
  },
  {
    id: 'note-4',
    user: {
      name: '佐藤営業',
      avatar: '/avatars/sato.jpg',
      initials: 'ST',
    },
    content: '顧客から校正データの承認が取れました。製造へ進めてください。',
    timestamp: '2023/07/07 16:45',
  },
];

export function ProductionNotes({ jobId }: ProductionNotesProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">作業メモ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* メモリスト */}
            {mockNotes.map((note) => (
              <div key={note.id} className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={note.user.avatar} alt={note.user.name} />
                  <AvatarFallback>{note.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{note.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {note.timestamp}
                    </p>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 新規メモ入力 */}
          <div className="mt-6">
            <Textarea
              placeholder="メモを入力..."
              className="resize-none mb-2"
              rows={3}
            />
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                ファイルを添付
              </Button>
              <Button size="sm">
                <Send className="h-4 w-4 mr-2" />
                送信
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">お客様からの指示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm font-medium mb-2">
              2023/07/04 - お客様からの依頼事項
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>印刷色は前回の印刷物と統一感を持たせること</li>
              <li>納品時には白手袋での梱包対応をすること</li>
              <li>サンプルを10部別途用意すること</li>
              <li>納品書には発注番号「PO-20230704」を記載すること</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
