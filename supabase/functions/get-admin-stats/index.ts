// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { createClient } from 'jsr:@supabase/supabase-js';
// import { corsHeaders } from '../_shared/cors.ts'; // TODO: 必要に応じて cors.ts を作成・調整

// CORSヘッダー（暫定、必要に応じて _shared/cors.ts に移動）
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // ローカルテスト用、本番では制限推奨
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

// AdminStatsWithGraphs 型定義 (Server Action の型定義と合わせる)
interface AdminStatsWithGraphs {
  totalUsers: number;
  newUsers: {
    count: number;
    trend: number;
  };
  activeUsers: {
    count: number;
    trend: number;
  };
  pendingContacts: number;
  graphs: {
    userStats: Array<{
      date: string;
      totalUsers: number;
      activeUsers: number;
      newUsers: number;
    }>;
    activityStats: Array<{
      date: string;
      logins: number;
      registrations: number;
      contacts: number;
    }>;
  };
}

Deno.serve(async (req: Request) => {
  // reqに型を追加
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Supabaseクライアントを初期化 (環境変数から)
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Missing Supabase environment variables.');
    }

    // Authorizationヘッダーから JWT または service_role_key を取得 ← このコメントとロジックを変更
    // const authHeader = req.headers.get('Authorization');
    // const effectiveKey = authHeader?.replace('Bearer ', '') || serviceRoleKey; // ← この行を削除またはコメントアウト

    // 常に service_role を使用する
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      // effectiveKey の代わりに serviceRoleKey を直接使用
      auth: {
        persistSession: false,
        autoRefreshToken: false, // service_role or user JWT doesn't need refresh
        detectSessionInUrl: false,
      },
    });

    // --- 1. 日付範囲の計算 ---
    const now = new Date();
    const endDate = new Date(now); // 今日
    // トレンド計算とグラフのために過去60日分取得
    const startDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    // --- 2. PostgreSQL 関数の呼び出し ---
    const [overallStatsResult, dailyStatsResult] = await Promise.all([
      supabase.rpc('get_overall_admin_stats'),
      supabase.rpc('get_daily_admin_stats', {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      }),
    ]);

    // エラーハンドリング
    if (overallStatsResult.error) throw overallStatsResult.error;
    if (dailyStatsResult.error) throw dailyStatsResult.error;

    // 型ガードを追加
    if (
      !overallStatsResult.data ||
      typeof overallStatsResult.data.totalUsers !== 'number' ||
      typeof overallStatsResult.data.pendingContacts !== 'number'
    ) {
      throw new Error(
        'Invalid data structure returned from get_overall_admin_stats'
      );
    }
    const overallStats: { totalUsers: number; pendingContacts: number } =
      overallStatsResult.data;

    if (!Array.isArray(dailyStatsResult.data)) {
      throw new Error(
        'Invalid data structure returned from get_daily_admin_stats'
      );
    }
    // dailyStats の型アサーションまたはバリデーションを追加
    // rpcの戻り値の型を仮定義
    interface DailyStatRow {
      stat_date: string;
      new_users: string | number; // rpcは数値を文字列で返すことがあるため
      active_users: string | number;
      contacts: string | number;
    }
    const dailyStats: Array<{
      stat_date: string;
      new_users: number;
      active_users: number;
      contacts: number;
    }> = dailyStatsResult.data.map((item: DailyStatRow) => ({
      // itemに型を指定
      stat_date: item.stat_date,
      new_users: Number(item.new_users) || 0,
      active_users: Number(item.active_users) || 0,
      contacts: Number(item.contacts) || 0,
    }));

    // --- 3. データの処理と集計 ---

    let newUsersThisMonth = 0;
    let newUsersLastMonth = 0;
    let activeUsersLast30Days = 0;
    let previousActiveUsers = 0; // 60日前から30日前

    // 日付文字列をDateオブジェクトに変換して比較しやすくする
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstDayOfMonthStr = firstDayOfMonth.toISOString().split('T')[0]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstDayOfLastMonthStr = firstDayOfLastMonth
      .toISOString()
      .split('T')[0]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0]!;

    for (const day of dailyStats) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const statDateStr = day.stat_date.split('T')[0]!; // non-null assertion を追加

      // 今月の新規ユーザー
      if (statDateStr >= firstDayOfMonthStr) {
        newUsersThisMonth += day.new_users;
      }
      // 先月の新規ユーザー
      else if (statDateStr >= firstDayOfLastMonthStr) {
        newUsersLastMonth += day.new_users;
      }

      // 過去30日間のアクティブユーザー
      if (statDateStr >= thirtyDaysAgoStr) {
        activeUsersLast30Days += day.active_users;
      }
      // 60日前から30日前のアクティブユーザー
      else {
        previousActiveUsers += day.active_users;
      }
    }

    // トレンド計算
    const newUsersTrend = newUsersLastMonth
      ? ((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100
      : newUsersThisMonth > 0
        ? 100
        : 0; // 先月が0なら今月がプラスなら100%増

    const activeUsersTrend = previousActiveUsers
      ? ((activeUsersLast30Days - previousActiveUsers) / previousActiveUsers) *
        100
      : activeUsersLast30Days > 0
        ? 100
        : 0; // 前期間が0なら

    // --- 4. グラフ用データの作成 (過去30日分) ---
    const userStatsGraph: AdminStatsWithGraphs['graphs']['userStats'] = [];
    const activityStatsGraph: AdminStatsWithGraphs['graphs']['activityStats'] =
      [];

    // 過去30日間のデータにフィルタリング
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const last30DaysStats = dailyStats.filter(
      (day) => day.stat_date.split('T')[0]! >= thirtyDaysAgoStr
    ); // non-null assertion を追加

    // 累計ユーザー数を計算（総数から逆算）
    let cumulativeTotalUsers = overallStats.totalUsers;
    // 直近30日の日別データを逆順（新しい -> 古い）で処理
    const reversedLast30Days = [...last30DaysStats].reverse();
    const dailyTotalUsersMap = new Map<string, number>();

    reversedLast30Days.forEach((day, index) => {
      dailyTotalUsersMap.set(day.stat_date, cumulativeTotalUsers);
      // 次の日（過去方向）の累計は、今日の新規ユーザー分を引く
      if (index < reversedLast30Days.length - 1) {
        cumulativeTotalUsers -= day.new_users;
        // マイナスにならないようにガード
        if (cumulativeTotalUsers < 0) cumulativeTotalUsers = 0;
      }
    });

    // グラフデータを生成 (古い -> 新しい順にする)
    last30DaysStats.forEach((day) => {
      const dateStr = day.stat_date; // YYYY-MM-DDTHH:mm:ssZ 形式
      const displayDate = new Date(dateStr).toISOString(); // ISO文字列で統一

      userStatsGraph.push({
        date: displayDate,
        totalUsers: dailyTotalUsersMap.get(dateStr) ?? 0, // Mapから取得
        activeUsers: day.active_users,
        newUsers: day.new_users,
      });
      activityStatsGraph.push({
        date: displayDate,
        logins: day.active_users, // active_users を logins の代わりに使用
        registrations: day.new_users,
        contacts: day.contacts,
      });
    });

    // --- 5. 最終結果の整形 ---
    const result: AdminStatsWithGraphs = {
      totalUsers: overallStats.totalUsers,
      newUsers: {
        count: newUsersThisMonth,
        trend: Number.parseFloat(newUsersTrend.toFixed(1)), // 小数点以下1桁に丸める
      },
      activeUsers: {
        count: activeUsersLast30Days,
        trend: Number.parseFloat(activeUsersTrend.toFixed(1)), // 小数点以下1桁に丸める
      },
      pendingContacts: overallStats.pendingContacts,
      graphs: {
        userStats: userStatsGraph,
        activityStats: activityStatsGraph,
      },
    };

    // --- 6. レスポンスを返す ---
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in get-admin-stats function:', error); // エラーログに詳細を追加
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      }), // エラーメッセージを確実にする
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-admin-stats' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
