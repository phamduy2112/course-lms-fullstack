import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { Provider } from "react-redux";
import { store } from './store/store.ts';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Router DOM
import { RouterProvider } from "react-router-dom";
import { router } from './router/index.tsx';
import { ThemeProvider } from './components/theme/theme-provider.tsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </ThemeProvider>
);
