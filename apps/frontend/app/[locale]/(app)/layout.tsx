import { Header } from "../../../src/components/header";
import { getServerSession } from "../../../src/lib/auth-server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <div className="flex min-h-svh flex-col">
      <Header initialSession={session} />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
