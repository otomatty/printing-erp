/*
 * QRコード生成クライアントコンポーネント
 * テキスト入力からQRコードを生成し、プレビューを表示する
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import { PageHeader } from '~/components/custom/page-header';
import { Container } from '~/components/custom/container';
import QRCodeStyling from 'qr-code-styling';
import { Card, CardContent } from '@kit/ui/card';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import { Button } from '@kit/ui/button';
import { Switch } from '@kit/ui/switch';
import { QrCode } from 'lucide-react';

export default function QrCodePageClient() {
  const [inputText, setInputText] = useState('');
  // カスタマイズ用ステート
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [margin, setMargin] = useState(10);
  const [dotColor, setDotColor] = useState('#000000');
  const [dotType, setDotType] = useState<'rounded' | 'dots' | 'square'>(
    'rounded'
  );
  const [bgColor, setBgColor] = useState('#ffffff');
  const [transparentBg, setTransparentBg] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<
    'png' | 'jpeg' | 'webp' | 'svg'
  >('png');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<
    'L' | 'M' | 'Q' | 'H'
  >('M');

  // QRCodeStylingインスタンスと描画コンテナの参照
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 初期化: QRCodeStylingオブジェクトを生成してコンテナに追加
  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: '',
      margin: 10,
      dotsOptions: { color: '#000', type: 'rounded' },
      backgroundOptions: { color: '#fff' },
    });
    if (containerRef.current && qrCodeRef.current) {
      qrCodeRef.current.append(containerRef.current);
    }
  }, []);

  // 設定変更時にリアルタイム更新
  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.update({
        data: inputText,
        width,
        height,
        margin,
        dotsOptions: { color: dotColor, type: dotType },
        backgroundOptions: { color: transparentBg ? 'transparent' : bgColor },
        qrOptions: { errorCorrectionLevel },
      });
    }
  }, [
    inputText,
    width,
    height,
    margin,
    dotColor,
    dotType,
    bgColor,
    errorCorrectionLevel,
    transparentBg,
  ]);

  // 透明背景ON時にJPEG選択中ならPNGにリセット
  useEffect(() => {
    if (transparentBg && selectedFormat === 'jpeg') {
      setSelectedFormat('png');
    }
  }, [transparentBg, selectedFormat]);

  // QRコードを選択形式でダウンロードするハンドラ
  const handleDownload = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        extension: selectedFormat,
        name: `qrcode_${Date.now()}`,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <PageHeader
        title="QRコード生成"
        description="テキストからQRコードを生成するツールページ"
        backLink={{ href: '/', label: 'ホームに戻る' }}
      />
      <Container className="flex-1 flex flex-col">
        {/* 設定とプレビューの２列レイアウト */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 設定メニュー */}
          <Card className="space-y-4">
            <CardContent className="space-y-4 p-8">
              <div>
                <Label htmlFor="qr-input">テキスト</Label>
                <Input
                  id="qr-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="例: https://example.com"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <Label htmlFor="width-input">幅 (px)</Label>
                <Input
                  id="width-input"
                  type="number"
                  min={150}
                  max={800}
                  value={width}
                  onChange={(e) => setWidth(+e.target.value)}
                  onBlur={(e) => {
                    const v = +e.target.value;
                    if (v > 800) setWidth(800);
                    else if (v < 150) setWidth(150);
                  }}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <Label htmlFor="height-input">高さ (px)</Label>
                <Input
                  id="height-input"
                  type="number"
                  min={150}
                  max={800}
                  value={height}
                  onChange={(e) => setHeight(+e.target.value)}
                  onBlur={(e) => {
                    const v = +e.target.value;
                    if (v > 800) setHeight(800);
                    else if (v < 150) setHeight(150);
                  }}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <Label htmlFor="margin-input">余白 (px)</Label>
                <Input
                  id="margin-input"
                  type="number"
                  value={margin}
                  onChange={(e) => setMargin(+e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <Label htmlFor="dot-color-input">ドット色</Label>
                <Input
                  id="dot-color-input"
                  type="color"
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="p-1 rounded"
                />
              </div>
              <div>
                <Label htmlFor="dot-type-select">ドット形状</Label>
                <Select
                  value={dotType}
                  onValueChange={(value) =>
                    setDotType(value as 'rounded' | 'dots' | 'square')
                  }
                >
                  <SelectTrigger id="dot-type-select" className="w-full">
                    <SelectValue placeholder="丸み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded">丸み</SelectItem>
                    <SelectItem value="dots">ドット</SelectItem>
                    <SelectItem value="square">四角形</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 背景を透明にするオプション */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="bg-transparent"
                  checked={transparentBg}
                  onCheckedChange={setTransparentBg}
                />
                <Label htmlFor="bg-transparent">透明背景</Label>
              </div>
              {!transparentBg && (
                <div>
                  <Label htmlFor="bg-color-input">背景色</Label>
                  <Input
                    id="bg-color-input"
                    type="color"
                    value={bgColor}
                    onChange={(e) => {
                      setBgColor(e.target.value);
                      setTransparentBg(false);
                    }}
                    className="p-1 rounded"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="error-correction-select">
                  エラー訂正レベル
                </Label>
                <Select
                  value={errorCorrectionLevel}
                  onValueChange={(value) =>
                    setErrorCorrectionLevel(value as 'L' | 'M' | 'Q' | 'H')
                  }
                >
                  <SelectTrigger
                    id="error-correction-select"
                    className="w-full"
                  >
                    <SelectValue placeholder={errorCorrectionLevel} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">L (低)</SelectItem>
                    <SelectItem value="M">M (中)</SelectItem>
                    <SelectItem value="Q">Q (高)</SelectItem>
                    <SelectItem value="H">H (最大)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          {/* プレビュー */}
          <div className="flex flex-col h-full min-h-0">
            <div className="flex-1 flex items-center justify-center w-full min-h-0 relative">
              {/* QRコードコンテナ (常にレンダリング) */}
              <div ref={containerRef} />
              {/* エンプティステートオーバーレイ */}
              {!inputText.trim() && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <QrCode className="h-16 w-16 mb-4" />
                  <span>テキストを入力するとQRコードが生成されます</span>
                </div>
              )}
            </div>
            {/* ダウンロード機能 */}
            <Card className="flex items-center justify-center space-x-4 bg-white p-4 my-4 mx-auto rounded-md">
              <Select
                value={selectedFormat}
                onValueChange={(value) =>
                  setSelectedFormat(value as 'png' | 'jpeg' | 'webp' | 'svg')
                }
              >
                <SelectTrigger id="format-select" className="w-32">
                  <SelectValue placeholder={selectedFormat.toUpperCase()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg" disabled={transparentBg}>
                    JPEG
                  </SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleDownload}>ダウンロード</Button>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
