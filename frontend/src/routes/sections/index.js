import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
import DashboardLayout from 'src/layouts/dashboard/layout';
import { LoadingScreen } from 'src/components/loading-screen';
// config
import { BASE_URL, PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes, HomePage } from './main';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: `${BASEURL}/index.html`,
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },
    // {
    //   path: '/app/index.html',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: PATH_AFTER_LOGIN,
      element: (
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <HomePage />
          </Suspense>
        </DashboardLayout>
        // <MainLayout>
        //   <HomePage />
        // </MainLayout>
      ),
    },

    // // Main routes
    // ...mainRoutes,

    // No match 404
    { path: '*', element: <h1>{window.location.pathname}</h1> },
  ]);
}
