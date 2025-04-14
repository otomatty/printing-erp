import { User } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    role: UserRole | null;
}
interface AuthContextType extends AuthState {
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
}
type UserRole = 'user' | 'client';
interface UserProfile {
    id: string;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
    full_name?: string;
    avatar_url?: string;
}

export type { AuthContextType, AuthState, UserProfile, UserRole };
