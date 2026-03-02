import { NavLink, Outlet } from 'react-router-dom'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/shared/routes'

const tasks = [
  { path: ROUTES.VIRTUALIZED_LIST, label: '1.1 Virtualized List' },
  { path: ROUTES.EXPENSIVE_TABLE, label: '1.2 Expensive Table' },
  { path: ROUTES.LARGE_FORM, label: '1.3 Large Form' },
  { path: ROUTES.INFINITE_SCROLL, label: '2.1 Infinite Scroll' },
  { path: ROUTES.DEPENDENT_QUERIES, label: '2.2 Dependent Queries' },
  { path: ROUTES.REQUEST_BATCHING, label: '2.3 Request Batching' },
]

export function Layout() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <span className="font-semibold">React Tasks</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Tasks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tasks.map((task) => (
                  <SidebarMenuItem key={task.path}>
                    <SidebarMenuButton asChild>
                      <NavLink to={task.path}>{task.label}</NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
