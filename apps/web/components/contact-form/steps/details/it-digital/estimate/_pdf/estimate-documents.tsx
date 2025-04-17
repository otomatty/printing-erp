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
  colName: { width: '40%' }, // 幅調整
  colUnitPrice: { width: '15%', textAlign: 'right' },
  colQuantity: { width: '10%', textAlign: 'right' },
  colAmount: { width: '20%', textAlign: 'right' },
  colNote: { width: '15%' }, // Note列を追加する場合
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

interface EstimateDocumentProps {
  estimate: EstimateWithItems;
}

export const EstimateDocument: React.FC<EstimateDocumentProps> = ({
  estimate,
}) => {
  // 明細アイテムのレンダリング
  const renderItem = (item: EstimateItem, index: number) => (
    <View style={styles.tableRow} key={item.id || `item-${index}`} wrap={false}>
      <Text style={{ ...styles.tableCol, ...styles.colName }}>{item.name}</Text>
      <Text style={{ ...styles.tableCol, ...styles.colUnitPrice }}>
        {formatCurrency(item.unitPrice)}
      </Text>
      <Text style={{ ...styles.tableCol, ...styles.colQuantity }}>
        {item.quantity}
      </Text>
      <Text style={{ ...styles.tableCol, ...styles.colAmount }}>
        {formatCurrency(item.amount)}
      </Text>
      {/* <Text style={{...styles.tableCol, ...styles.colNote}}>{item.note ?? ''}</Text> */}
    </View>
  );

  // 合計金額の表示
  const renderTotals = () => (
    <View style={styles.totals}>
      {/* 必要に応じて小計や税などを追加 */}
      {estimate.rushFee !== undefined && estimate.rushFee > 0 && (
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>特急料金:</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(estimate.rushFee)}
          </Text>
        </View>
      )}
      <View style={{ ...styles.totalRow, marginTop: 5 }}>
        <Text style={{ ...styles.totalLabel, fontSize: 12 }}>合計金額:</Text>
        <Text
          style={{ ...styles.totalValue, fontSize: 12, fontWeight: 'bold' }}
        >
          {formatCurrency(estimate.totalAmount)}
        </Text>
      </View>
    </View>
  );

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
    <Document
      title={`見積書_${estimate.estimateNumber}`}
      author="Niinuma Kikaku Inc."
    >
      <Page size="A4" style={styles.page} wrap>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.title}>御 見 積 書</Text>
        </View>

        {/* 顧客情報と見積もりメタ情報 */}
        <View style={styles.subHeader}>
          <View style={styles.customerInfo}>
            <Text style={{ marginBottom: 5 }}>
              {estimate.customerName} 御中
            </Text>
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

        {/* 明細テーブル */}
        <Text style={styles.sectionTitle}>見積明細</Text>
        <View style={styles.table}>
          {/* テーブルヘッダー */}
          <View style={styles.tableHeaderRow} fixed>
            <Text style={{ ...styles.tableColHeader, ...styles.colName }}>
              項目
            </Text>
            <Text style={{ ...styles.tableColHeader, ...styles.colUnitPrice }}>
              単価
            </Text>
            <Text style={{ ...styles.tableColHeader, ...styles.colQuantity }}>
              数量
            </Text>
            <Text style={{ ...styles.tableColHeader, ...styles.colAmount }}>
              金額
            </Text>
            {/* <Text style={{...styles.tableColHeader, ...styles.colNote}}>備考</Text> */}
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
