import AppSidebar from '@/features/navigation/sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';
import { Breadcrumbs } from '@/features/navigation/breadcrumbs';
import { CollapsedTrigger } from '@/features/navigation/collapsed-trigger';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">
        <CollapsedTrigger />
        <div className="container mx-auto max-w-[1600px]">
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
