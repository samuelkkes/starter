"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Logout02Icon,
  SparklesIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { Avatar } from "glyph-avatar/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth-client";

const navigation = [
  {
    label: "Général",
    items: [
      { title: "Accueil", href: "/", icon: Home01Icon },
      { title: "Profil", href: "/profile", icon: UserIcon },
    ],
  },
];

export function AppSidebar({
  user,
}: {
  user: { id: string; name: string; email: string; image: string | null };
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <HugeiconsIcon icon={SparklesIcon} className="size-4" />
              </div>
              <span className="text-base font-semibold tracking-tight">Starter</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname === item.href}
                      render={<Link href={item.href} />}
                    >
                      <HugeiconsIcon icon={item.icon} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="rounded-2xl border border-sidebar-border bg-background p-1 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip={user.name} render={<Link href="/profile" />}>
              <Avatar
                value={user.image ?? user.id}
                alt={user.name}
                size={32}
                className="[&_svg]:size-full!"
              />
              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Se déconnecter"
              onClick={async () => {
                await signOut();
                router.push("/login");
                router.refresh();
              }}
            >
              <HugeiconsIcon icon={Logout02Icon} />
              <span>Se déconnecter</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
