import React from 'react';
import Router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './components/ToastProvider';

const queryClient = new QueryClient()

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default App
