import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;

  return (
    <SidebarProvider>
      <AppSidebar
        user={{ id: user.id, name: user.name, email: user.email, image: user.image ?? null }}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center px-4">
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0 md:p-6 md:pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p className="p-4 text-sm text-muted-foreground">Chargement…</p>}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
