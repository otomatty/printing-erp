'use server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import path from 'node:path';
import fs from 'node:fs/promises'; // Node.js の fs/promises を使用
import { EstimateDocument } from '../../components/contact-form/steps/details/it-digital/estimate/_pdf/estimate-documents'; // ★ 後で作成するコンポーネント
import type { EstimateWithItems } from '../../types/estimate'; // ★ 型定義ファイル
import { Font } from '@react-pdf/renderer';

// フォントファイルのパス (プロジェクトルートからの相対パス)
// TODO: 実際に使用するフォントファイル名に合わせてください
const FONT_DIR = path.join(process.cwd(), 'public', 'fonts');
const REGULAR_FONT_PATH = path.join(FONT_DIR, 'NotoSansJP-Regular.ttf');
const BOLD_FONT_PATH = path.join(FONT_DIR, 'NotoSansJP-Bold.ttf');

// フォントの登録 (一度だけ実行されるように)
let fontsRegistered = false;
const registerFonts = async () => {
  if (fontsRegistered) return;
  try {
    // ファイルの存在確認を追加
    await fs.access(REGULAR_FONT_PATH);
    await fs.access(BOLD_FONT_PATH);

    Font.register({
      family: 'NotoSansJP',
      fonts: [
        { src: REGULAR_FONT_PATH, fontWeight: 'normal' },
        { src: BOLD_FONT_PATH, fontWeight: 'bold' },
      ],
    });
    fontsRegistered = true;
    console.log('Fonts registered successfully.');
  } catch (error) {
    console.error('Failed to register fonts:', error);
    console.error(
      `Please ensure font files exist at: ${REGULAR_FONT_PATH} and ${BOLD_FONT_PATH}`
    );
    // ここでエラーを投げるか、フォールバック処理をするか検討
    throw new Error(
      `Font registration failed. Check if fonts exist at ${FONT_DIR}`
    );
  }
};

/**
 * 見積もりデータからPDFを生成するサーバーアクション
 * @param estimateData - 見積もりデータ (EstimateWithItems 型)
 * @returns 生成されたPDFのBuffer、またはエラー発生時は null
 */
export const generatePdfAction = async (
  estimateData: EstimateWithItems
): Promise<Buffer | null> => {
  try {
    // フォントを登録 (まだ登録されていなければ)
    await registerFonts();

    // React要素をPDF Bufferにレンダリング
    const pdfBuffer = await renderToBuffer(
      <EstimateDocument estimate={estimateData} />
    );

    return pdfBuffer;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    // TODO: より詳細なエラーハンドリング (例: Sentryへの送信など)
    return null; // エラー時は null を返す (あるいはエラーオブジェクトを返す)
  }
};
