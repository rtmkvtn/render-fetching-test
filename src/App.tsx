import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { queryClient } from '@/api/queryClient'
import { Layout } from '@/shared/components/Layout'
import { ROUTES } from '@/shared/routes'
import { VirtualizedList } from '@/tasks/task-1-1/VirtualizedList'
import { ExpensiveTable } from '@/tasks/task-1-2/ExpensiveTable'
import { LargeForm } from '@/tasks/task-1-3/LargeForm'
import { InfiniteList } from '@/tasks/task-2-1/InfiniteList'
import { DependentQueries } from '@/tasks/task-2-2/DependentQueries'
import { ProductGrid } from '@/tasks/task-2-3/ProductGrid'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={<Navigate to={ROUTES.VIRTUALIZED_LIST} replace />}
            />
            <Route
              path={ROUTES.VIRTUALIZED_LIST}
              element={<VirtualizedList />}
            />
            <Route path={ROUTES.EXPENSIVE_TABLE} element={<ExpensiveTable />} />
            <Route path={ROUTES.LARGE_FORM} element={<LargeForm />} />
            <Route path={ROUTES.INFINITE_SCROLL} element={<InfiniteList />} />
            <Route
              path={ROUTES.DEPENDENT_QUERIES}
              element={<DependentQueries />}
            />
            <Route path={ROUTES.REQUEST_BATCHING} element={<ProductGrid />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
