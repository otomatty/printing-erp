/**
 * ProfileWithRole型の定義
 */
type ProfileWithRole = {
    id: string;
    email: string | null;
    fullName: string | null;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
};
/**
 * 現在のユーザーが管理者かどうかを確認します
 */
declare function checkIsAdmin(): Promise<boolean>;
/**
 * 認証状態とプロフィール情報を取得します
 * @returns {Promise<{ isAuthenticated: boolean; profile: ProfileWithRole | null }>}
 */
declare function getAuthState(): Promise<{
    isAuthenticated: boolean;
    profile: null;
} | {
    isAuthenticated: boolean;
    profile: ProfileWithRole;
}>;

export { checkIsAdmin, getAuthState };
