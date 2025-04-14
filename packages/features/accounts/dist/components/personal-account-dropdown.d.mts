import * as react from 'react';
import { User } from '@supabase/supabase-js';

declare function PersonalAccountDropdown({ className, user, signOutRequested, showProfileName, paths, features, account, }: {
    user: User;
    account?: {
        id: string | null;
        name: string | null;
        picture_url: string | null;
    };
    signOutRequested: () => unknown;
    paths: {
        home: string;
    };
    features: {
        enableThemeToggle: boolean;
    };
    showProfileName?: boolean;
    className?: string;
}): react.JSX.Element;

export { PersonalAccountDropdown };
