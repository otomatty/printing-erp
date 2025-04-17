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
    // フォールバック処理: デフォルトのフォントを登録
    try {
      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { src: 'Helvetica', fontWeight: 'normal' },
          { src: 'Helvetica-Bold', fontWeight: 'bold' },
        ],
      });
      fontsRegistered = true;
      console.log('Fallback fonts registered.');
    } catch (fallbackError) {
      console.error('Failed to register fallback fonts:', fallbackError);
      // ここでエラーを投げるのではなく、デフォルトフォントに任せる
    }
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
    // 必要な値のバリデーション
    if (!estimateData || !estimateData.items) {
      console.error('Invalid estimate data provided');
      return null;
    }

    // フォントを登録 (まだ登録されていなければ)
    await registerFonts();

    // React要素をPDF Bufferにレンダリング
    const pdfBuffer = await renderToBuffer(
      <EstimateDocument estimate={estimateData} />
    );

    return pdfBuffer;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    // より詳細なエラー情報をログに出力
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return null; // エラー時は null を返す
  }
};
