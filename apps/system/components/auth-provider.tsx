'use client';

import { useAuthChangeListener } from '@kit/supabase/hooks/use-auth-change-listener';

import pathsConfig from '~/config/paths.config';

export function AuthProvider(props: React.PropsWithChildren) {
  useAuthChangeListener({
    appHomePath: pathsConfig.app.home,
    onEvent: (event, session) => {
      console.log(
        '[AUTH-PROVIDER-ADMIN] Auth state change event:',
        event,
        'Session exists:',
        !!session,
        'User ID:',
        session?.user?.id
      );
    },
  });

  return props.children;
}
