import avatarUrl from '@/features/user/lib/avatar-url';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { type User } from '@/shared/types/user';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { redirect } from 'next/navigation';

export function SidebarUser({ user }: { user: User | null | undefined }) {
  if (!user?._id) {
    redirect('/login');
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={avatarUrl(user.avatar)} alt={user.uname} />
            <AvatarFallback className="rounded-lg">
              {user.uname.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.uname}</span>
            <span className="truncate text-xs">{user.mail}</span>
          </div>
          <HugeiconsIcon icon={ArrowDown01Icon} className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
