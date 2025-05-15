import type React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font, // Fontのインポートはサーバー側での登録に必要だが、コンポーネント側では直接使わないことが多い
  Image, // 画像を使う場合
} from '@react-pdf/renderer';
import type { EstimateWithItems, EstimateItem } from '~/types/estimate';
import { format } from 'date-fns'; // 日付フォーマット用

// スタイル定義 (Tailwind CSSは使えないので注意！)
// フォントファミリー名はサーバーアクションで登録したものと一致させる
const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP', // 登録したフォントファミリー
    fontSize: 10,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold', // 'bold' を数値ではなく文字列で指定
    marginBottom: 10,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 9,
  },
  customerInfo: {
    textAlign: 'left',
    maxWidth: '60%', // 長くなりすぎないように
  },
  estimateMeta: {
    textAlign: 'right',
  },
  metaItem: {
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 3,
  },
  table: {
    // @ts-ignore: display 'flex' is valid but not in TS definition?
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // デフォルト白
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2', // ヘッダー背景色
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontWeight: 'bold',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  colName: { width: '40%' }, // 幅を調整
  colAmount: { width: '15%', textAlign: 'right' },
  colQuantity: { width: '10%', textAlign: 'right' }, // 使わないが型定義のために残す
  colUnitPrice: { width: '15%', textAlign: 'right' }, // 使わないが型定義のために残す
  colDuration: { width: '10%', textAlign: 'center' }, // 工数表示用
  colNote: { width: '20%' }, // 幅を調整
  totals: {
    marginTop: 20,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // 右寄せ
    marginBottom: 5,
  },
  totalLabel: {
    width: '70%', // ラベルの幅を調整
    textAlign: 'right',
    fontWeight: 'bold',
    paddingRight: 10,
  },
  totalValue: {
    width: '30%', // 値の幅を調整
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  notesSection: {
    marginTop: 20,
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 10,
  },
  noteItem: {
    marginBottom: 3,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  highlight: {
    color: '#107C10', // 緑色で割引を強調
  },
  discountText: {
    fontSize: 9,
    color: '#107C10',
  },
  strikethrough: {
    textDecoration: 'line-through',
    fontSize: 9,
    color: '#666666',
  },
  infoBox: {
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    backgroundColor: '#f9fafb',
  },
  infoTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 9,
  },
});

// 日付をフォーマットするヘルパー関数
const formatDate = (date: string | Date | undefined): string => {
  if (!date) return '-';
  try {
    return format(new Date(date), 'yyyy年MM月dd日');
  } catch {
    return String(date); // フォーマット失敗時は元の値を表示
  }
};

// 金額をフォーマットするヘルパー関数
const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return '-';
  return `¥${amount.toLocaleString()}`;
};

// 割引率を計算するヘルパー関数
const calculateDiscountRate = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice === 0) return 0;
  return Math.round((1 - discountedPrice / originalPrice) * 100);
};

interface EstimateDocumentProps {
  estimate: EstimateWithItems;
}

export const EstimateDocument: React.FC<EstimateDocumentProps> = ({
  estimate,
}) => {
  // 元の価格を計算（メタデータから）
  const hasDiscount =
    estimate.originalPrice !== undefined &&
    estimate.originalPrice > estimate.totalAmount;
  const discountRate = hasDiscount
    ? calculateDiscountRate(estimate.originalPrice || 0, estimate.totalAmount)
    : 0;
  const savingsAmount = hasDiscount
    ? (estimate.originalPrice || 0) - estimate.totalAmount
    : 0;

  // 明細アイテムのレンダリング
  const renderItem = (item: EstimateItem, index: number) => (
    <View style={styles.tableRow} key={item.id || `item-${index}`} wrap={false}>
      <Text style={{ ...styles.tableCol, ...styles.colName }}>{item.name}</Text>
      <Text style={{ ...styles.tableCol, ...styles.colAmount }}>
        {formatCurrency(item.amount)}
      </Text>
      <Text style={{ ...styles.tableCol, ...styles.colDuration }}>
        {item.duration ? `${item.duration}人日` : '-'}
      </Text>
      <Text style={{ ...styles.tableCol, ...styles.colNote }}>
        {/* 割引率を表示せず、必須機能/任意機能のみ表示 */}
        {item.note?.includes('必須機能')
          ? '必須機能'
          : item.note?.includes('（')
            ? '任意機能'
            : item.note || ''}
      </Text>
    </View>
  );

  // 合計金額の表示
  const renderTotals = () => {
    // 税抜き価格（割引適用済み）
    const subtotalPrice = estimate.totalAmount;
    // 消費税（10%）
    const taxAmount = Math.round(subtotalPrice * 0.1);
    // 税込み合計
    const totalWithTax = subtotalPrice + taxAmount;

    // 総工数を計算
    const totalDuration = estimate.items.reduce(
      (sum, item) => sum + (item.duration || 0),
      0
    );

    return (
      <View style={styles.totals}>
        {/* 割引情報の表示 */}
        {hasDiscount && (
          <>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>従来価格:</Text>
              <Text style={styles.totalValue}>
                <Text style={styles.strikethrough}>
                  {formatCurrency(estimate.originalPrice)}
                </Text>
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>コスト削減額:</Text>
              <Text style={styles.totalValue}>
                <Text style={styles.highlight}>
                  -{formatCurrency(savingsAmount)}
                </Text>
              </Text>
            </View>
          </>
        )}

        {/* 総工数 */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>総工数:</Text>
          <Text style={styles.totalValue}>{totalDuration}人日</Text>
        </View>

        {/* 税抜き価格 */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>割引後価格（税抜）:</Text>
          <Text style={styles.totalValue}>{formatCurrency(subtotalPrice)}</Text>
        </View>

        {/* 特急料金がある場合 */}
        {estimate.rushFee !== undefined && estimate.rushFee > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>特急料金:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(estimate.rushFee)}
            </Text>
          </View>
        )}

        {/* 消費税 */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>消費税（10%）:</Text>
          <Text style={styles.totalValue}>{formatCurrency(taxAmount)}</Text>
        </View>

        {/* 最終合計（税込） */}
        <View style={{ ...styles.totalRow, marginTop: 5 }}>
          <Text style={{ ...styles.totalLabel, fontSize: 12 }}>
            合計金額（税込）:
          </Text>
          <Text
            style={{ ...styles.totalValue, fontSize: 12, fontWeight: 'bold' }}
          >
            {formatCurrency(totalWithTax)}
          </Text>
        </View>
      </View>
    );
  };

  // 備考の表示
  const renderNotes = () => {
    const notesArray = Array.isArray(estimate.notes)
      ? estimate.notes
      : estimate.notes
        ? [estimate.notes]
        : [];
    if (notesArray.length === 0 && !estimate.rushFeeNote) return null;

    return (
      <View style={styles.notesSection}>
        <Text
          style={{
            ...styles.sectionTitle,
            borderBottomWidth: 0,
            marginTop: 0,
            marginBottom: 5,
          }}
        >
          備考
        </Text>
        {estimate.rushFeeNote && (
          <Text style={styles.noteItem}>
            ※ 特急料金: {estimate.rushFeeNote}
          </Text>
        )}
        {notesArray.map((note, index) => (
          <Text
            style={styles.noteItem}
            key={`note-${index}-${note.substring(0, 10)}`}
          >
            ・{note}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <Document title={`見積書_${estimate.estimateNumber}`} author="印刷会社">
      <Page size="A4" style={styles.page} wrap>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.title}>御 見 積 書</Text>
        </View>

        {/* 顧客情報と見積もりメタ情報 */}
        <View style={styles.subHeader}>
          <View style={styles.customerInfo}>
            <Text style={{ marginBottom: 5 }}>{estimate.customerName} 様</Text>
            {estimate.customerDepartment && (
              <Text>{estimate.customerDepartment}</Text>
            )}
            {/* 住所など必要なら追加 */}
          </View>
          <View style={styles.estimateMeta}>
            <Text style={styles.metaItem}>
              見積番号: {estimate.estimateNumber}
            </Text>
            <Text style={styles.metaItem}>
              発行日: {formatDate(estimate.issueDate)}
            </Text>
            {estimate.validUntil && (
              <Text style={styles.metaItem}>
                有効期限: {formatDate(estimate.validUntil)}
              </Text>
            )}
            {/* 必要なら担当者などを追加 */}
            {estimate.salesPerson && (
              <Text style={styles.metaItem}>担当: {estimate.salesPerson}</Text>
            )}
          </View>
        </View>

        {/* プロジェクト概要など */}
        {estimate.projectName && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>件名</Text>
            <Text>{estimate.projectName}</Text>
          </View>
        )}

        {/* 開発期間表示 */}
        {estimate.deadline && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>開発期間</Text>
            <Text>
              {estimate.deadline === 'flexible'
                ? '柔軟に対応'
                : estimate.deadline === 'asap'
                  ? 'できるだけ早く'
                  : estimate.deadline === '1month'
                    ? '1ヶ月以内'
                    : estimate.deadline === '3months'
                      ? '3ヶ月以内'
                      : estimate.deadline === '6months'
                        ? '6ヶ月以内'
                        : '未定'}
              {estimate.totalDuration &&
                ` （想定作業日数: 約${estimate.totalDuration}人日）`}
            </Text>
          </View>
        )}

        {estimate.deliveryDate && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>納品予定日</Text>
            <Text>{formatDate(estimate.deliveryDate)}</Text>
          </View>
        )}
        {estimate.paymentTerms && (
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>お支払い条件</Text>
            <Text>{estimate.paymentTerms}</Text>
          </View>
        )}

        {/* プロジェクト詳細情報を先に表示 */}
        {estimate.description && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>プロジェクト詳細</Text>
            <Text>{estimate.description}</Text>
          </View>
        )}

        {/* 実装要件情報 */}
        {estimate.implementationRequirements && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>実装要件</Text>
            <View style={styles.infoBox}>
              {/* デザイン関連 */}
              <Text style={styles.infoTitle}>デザイン関連</Text>
              <View style={{ marginBottom: 8 }}>
                <Text style={styles.infoContent}>
                  ・デザイン:{' '}
                  {estimate.implementationRequirements.hasDesign === true
                    ? 'お客様が提供'
                    : estimate.implementationRequirements.hasDesign ===
                        'entrust'
                      ? '弊社に一任'
                      : '協働で作成'}
                  {estimate.implementationRequirements.designFormat &&
                    estimate.implementationRequirements.designFormat !==
                      'none' &&
                    ` (${estimate.implementationRequirements.designFormat})`}
                </Text>
                <Text style={styles.infoContent}>
                  ・ブランドガイドライン:{' '}
                  {estimate.implementationRequirements.hasBrandGuidelines ===
                  true
                    ? 'お客様が提供'
                    : estimate.implementationRequirements.hasBrandGuidelines ===
                        'entrust'
                      ? '弊社に一任'
                      : '協働で作成'}
                </Text>
                {estimate.implementationRequirements.designCost &&
                  estimate.implementationRequirements.designCost.amount > 0 && (
                    <Text
                      style={{
                        ...styles.infoContent,
                        color: '#107C10',
                        fontSize: 8,
                        marginTop: 2,
                      }}
                    >
                      → 追加費用:{' '}
                      {formatCurrency(
                        estimate.implementationRequirements.designCost.amount
                      )}{' '}
                      / 工数:{' '}
                      {estimate.implementationRequirements.designCost.duration}
                      人日
                    </Text>
                  )}
              </View>

              {/* アセット関連 */}
              <Text style={styles.infoTitle}>アセット関連</Text>
              <View style={{ marginBottom: 8 }}>
                <Text style={styles.infoContent}>
                  ・ロゴ:{' '}
                  {estimate.implementationRequirements.hasLogo === true
                    ? 'お客様が提供'
                    : estimate.implementationRequirements.hasLogo === 'entrust'
                      ? '弊社に一任'
                      : '協働で作成'}
                </Text>
                <Text style={styles.infoContent}>
                  ・画像素材:{' '}
                  {estimate.implementationRequirements.hasImages === true
                    ? 'お客様が提供'
                    : estimate.implementationRequirements.hasImages ===
                        'entrust'
                      ? '弊社に一任'
                      : '協働で作成'}
                </Text>
                <Text style={styles.infoContent}>
                  ・アイコン:{' '}
                  {estimate.implementationRequirements.hasIcons === true
                    ? 'お客様が提供'
                    : estimate.implementationRequirements.hasIcons === 'entrust'
                      ? '弊社に一任'
                      : '協働で作成'}
                </Text>
                <Text style={styles.infoContent}>
                  ・カスタムフォント:{' '}
                  {estimate.implementationRequirements.hasCustomFonts === true
                    ? 'お客様が提供'
                    : estimate.implementationRequirements.hasCustomFonts ===
                        'entrust'
                      ? '弊社に一任'
                      : '協働で作成'}
                </Text>
                {estimate.implementationRequirements.assetsCost &&
                  estimate.implementationRequirements.assetsCost.amount > 0 && (
                    <Text
                      style={{
                        ...styles.infoContent,
                        color: '#107C10',
                        fontSize: 8,
                        marginTop: 2,
                      }}
                    >
                      → 追加費用:{' '}
                      {formatCurrency(
                        estimate.implementationRequirements.assetsCost.amount
                      )}{' '}
                      / 工数:{' '}
                      {estimate.implementationRequirements.assetsCost.duration}
                      人日
                    </Text>
                  )}
              </View>

              {/* コンテンツ関連 */}
              <Text style={styles.infoTitle}>コンテンツ関連</Text>
              <View>
                <Text style={styles.infoContent}>
                  ・テキストコンテンツ:{' '}
                  {estimate.implementationRequirements.hasContent === true
                    ? 'お客様が提供'
                    : estimate.implementationRequirements.hasContent ===
                        'entrust'
                      ? '弊社に一任'
                      : '協働で作成'}
                </Text>
                {estimate.implementationRequirements.contentCost &&
                  estimate.implementationRequirements.contentCost.amount >
                    0 && (
                    <Text
                      style={{
                        ...styles.infoContent,
                        color: '#107C10',
                        fontSize: 8,
                        marginTop: 2,
                      }}
                    >
                      → 追加費用:{' '}
                      {formatCurrency(
                        estimate.implementationRequirements.contentCost.amount
                      )}{' '}
                      / 工数:{' '}
                      {estimate.implementationRequirements.contentCost.duration}
                      人日
                    </Text>
                  )}
              </View>

              {/* 実装要件の合計 */}
              {estimate.implementationRequirements.totalAdditionalCost &&
                estimate.implementationRequirements.totalAdditionalCost > 0 && (
                  <View
                    style={{
                      marginTop: 12,
                      paddingTop: 8,
                      borderTopWidth: 1,
                      borderTopColor: '#cccccc',
                    }}
                  >
                    <Text
                      style={{
                        ...styles.infoContent,
                        fontWeight: 'bold',
                        fontSize: 9,
                      }}
                    >
                      実装要件による追加費用合計:{' '}
                      {formatCurrency(
                        estimate.implementationRequirements.totalAdditionalCost
                      )}{' '}
                      / 追加工数:{' '}
                      {estimate.implementationRequirements.additionalDuration}
                      人日
                    </Text>
                  </View>
                )}
            </View>
          </View>
        )}

        {/* 明細テーブル */}
        <Text style={styles.sectionTitle}>見積明細</Text>
        <View style={styles.table}>
          {/* テーブルヘッダー */}
          <View style={styles.tableHeaderRow} fixed>
            <Text style={{ ...styles.tableColHeader, ...styles.colName }}>
              項目
            </Text>
            <Text style={{ ...styles.tableColHeader, ...styles.colAmount }}>
              金額
            </Text>
            <Text style={{ ...styles.tableColHeader, ...styles.colDuration }}>
              工数
            </Text>
            <Text style={{ ...styles.tableColHeader, ...styles.colNote }}>
              備考
            </Text>
          </View>
          {/* テーブルボディ */}
          {estimate.items.map(renderItem)}
        </View>

        {/* 合計 */}
        {renderTotals()}

        {/* 備考 */}
        {renderNotes()}

        {/* フッター (ページ番号など) */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed // 各ページに固定表示
        />
      </Page>
    </Document>
  );
};

// デフォルトエクスポートを追加 (Next.jsでの動的インポートなどで必要になる場合がある)
export default EstimateDocument;
