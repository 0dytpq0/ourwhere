'use client';

import { PropsWithChildren } from 'react';

function GlobalLayout({ children }: PropsWithChildren) {
  // const { setUser } = useAuthStore((state) => state);

  // const { mutate: getUserSession } = useMutation({
  //   mutationFn: () => api.auth.getUserSession(),
  //   onSuccess: (data) => {
  //     setUser(data);
  //   }
  // });

  // useEffect(() => {
  //   getUserSession();
  // }, []);
  return <>{children}</>;
}

export default GlobalLayout;
