"use client";

import { Header } from "../../../src/components/header";
import { authClient } from "../../../src/lib/auth-client";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: sessionPending } = authClient.useSession();

  return (
    <div className="flex min-h-svh flex-col">
      <Header
        onSignOut={() => authClient.signOut()}
        session={session}
        sessionPending={sessionPending}
      />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
