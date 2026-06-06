import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter, useNavigation } from 'react-router';
import MainLayout from './components/Layout/Main/MainLayout';
import { SidebarMenuPlacement } from './components/Layout/Navigation/MainMenu/MainMenu';
import { LayoutProvider, useLayoutContext } from './components/Providers/LayoutContext/LayoutContext';
import { proxyPrefix } from './config';
import { IconDefinitions } from './lib/utils/definitions';
import { getInitialMenuItem, routes } from './pages/routes';
import SidebarDemo from './pages/SidebarDemo';

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
    <LayoutProvider>
      <RouterProvider router={router} />
    </LayoutProvider>
  )
}
