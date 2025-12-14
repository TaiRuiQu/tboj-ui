'use client';

import { useSidebar, SidebarTrigger } from '@/shared/components/ui/sidebar';

export function CollapsedTrigger() {
  const { state } = useSidebar();

  if (state !== 'collapsed') {
    return null;
  }

  return <SidebarTrigger />;
}
