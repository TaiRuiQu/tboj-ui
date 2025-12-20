import { Breadcrumbs } from '@/features/navigation/breadcrumbs';
import { CollapsedTrigger } from '@/features/navigation/collapsed-trigger';
import AppSidebar from '@/features/navigation/sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">
        <CollapsedTrigger />
        <div className="container mx-auto max-w-[1600px]">
          <div className="mb-2 flex md:hidden px-2">
            <Link href="/home" aria-label="ZYZOJ">
              <Image
                width={120}
                height={32}
                src="/nav-logo-small_light.png"
                alt="ZYZOJ Logo"
                className="h-auto w-[120px] dark:invert"
              />
            </Link>
          </div>
          <header className="flex shrink-0 items-center gap-2">
            <Breadcrumbs />
          </header>
          <main id="app-body">
            <div>{children}</div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
