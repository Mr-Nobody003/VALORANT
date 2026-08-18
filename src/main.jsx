import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { get, set, del } from 'idb-keyval'
import { registerSW } from 'virtual:pwa-register'
import App from './App.jsx'
import './index.css'

// Setup PWA Auto-Update
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload to update?")) {
      updateSW(true)
    }
  },
})

const idbPersister = {
  persistClient: async (client) => {
    await set('reactQueryClient', client)
  },
  restoreClient: async () => {
    return await get('reactQueryClient')
  },
  removeClient: async () => {
    await del('reactQueryClient')
  },
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: idbPersister }}
    >
      <App />
    </PersistQueryClientProvider>
  </StrictMode>,
)
