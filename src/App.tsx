import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter, useNavigation } from 'react-router';
import MainLayout from './components/Layout/Main/MainLayout';
import { SidebarMenuPlacement } from './components/Layout/Navigation/MainMenu/MainMenu';
import { LayoutProvider, useLayoutContext } from './components/Providers/LayoutContext/LayoutContext';
import { proxyPrefix } from './config';
import { IconDefinitions } from './lib/utils/definitions';
import { getInitialMenuItem, routes } from './pages/routes';
import SidebarDemo from './pages/SidebarDemo';
import { ToastrProvider, useToastr } from './components/Providers/ToastrContext/ToastrContext';
import Toastr from './components/UI/Toastr/Toastr';

const queryClient = new QueryClient();

const TemplateLayout = () => {

  const menuItems = [
    {
      id: 'home',
      title: 'Home',
      tooltip: 'Home',
      iconName: IconDefinitions.home,
      placement: SidebarMenuPlacement.Top,
      url: '/'
    },
    {
      id: 'demo',
      title: 'demo',
      tooltip: 'Demo',
      url: '/demo',
      iconName: IconDefinitions.themes,
      duotone: true,
      placement: SidebarMenuPlacement.Top,
      sidebar: <SidebarDemo />
    },
  ]

  const nav = useNavigation();
  const loading = nav.state === 'loading';
  const { pageTitle, breadcrumbItems } = useLayoutContext();
  const [drawerRequest, setDrawerRequest] = useState<{ item: string; key: number; } | null>(null);

  return (
    <MainLayout
      loading={loading}
      currentMenuItem={getInitialMenuItem(location.pathname)}
      pageTitle={pageTitle}
      breadcrumbItems={breadcrumbItems}
      menuItems={menuItems}
      drawerRequest={drawerRequest}
    />
  )
}

const TemplateToastr = () => {
  const { toasts, dequeue } = useToastr();

  return (
    <Toastr
      duration={15000}
      toasts={toasts}
      removeToastrItem={dequeue}
    />
  );
}

export default function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <TemplateLayout />,
        children: routes,
      }
    ],
    { basename: proxyPrefix || undefined }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <ToastrProvider>
          <RouterProvider router={router} />
          <TemplateToastr />
        </ToastrProvider>
      </LayoutProvider>
    </QueryClientProvider>

  )
}
