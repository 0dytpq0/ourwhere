'use client';

import { AuthStoreProvider } from '@/providers/js-auth.store.provider';
import QueryProvider from '@/providers/query.provider';
import { PropsWithChildren } from 'react';

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      {children}
      {/* <AuthStoreProvider>{children}</AuthStoreProvider> */}
    </QueryProvider>
  );
}

export default ProviderLayout;
