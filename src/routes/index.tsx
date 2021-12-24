import React, { ReactNode, lazy, Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";

// components
import LoadingScreen from "../components/loadingscreen";
import MainGuard from "../components/MainGuard";
import GuestGuard from "../components/GuestGuard";
import AuthGuard from "../components/AuthGuard";
import AdminGuard from "../components/AdminGuard";
import AdminGuestGuard from "../components/AdminGuestGuard";

import VendorDashboard from "../layout/vendordashboard";
import AdminDashboard from "../layout/admindashboard";

import NotFound from "../views/page404";

export function renderRoutes(routes: RouteItem[] = []) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route, idx) => {
          const Component = route.component;
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const type = route.type;
          return (
            <Route
              key={`routes-${idx}`}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    {route.routes && route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component type={type} />
                    )}
                  </Layout>
                </Guard>
              }
            />
          );
        })}
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </Suspense>
  );
}

type RouteItem = {
  exact?: boolean;
  guard?: any;
  path: string;
  component?: any;
  type?: number;
  layout?: ({ children }: { children: ReactNode }) => JSX.Element;
  routes?: {
    component: any;
    path: string;
    exact?: boolean;
  }[];
};

const routes: RouteItem[] = [
  // Others Routes
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("../views/page404")),
  },

  // Routes
  {
    exact: true,
    path: "/",
    component: lazy(() => import("../views/home")),
  },
  {
    exact: true,
    path: "/painel-usuario",
    guard: AuthGuard,
    component: lazy(() => import("../views/userdashboard")),
  },
  {
    exact: true,
    path: "/editar-pedido",
    guard: AuthGuard,
    component: lazy(() => import("../views/userdashboard/editpedido")),
  },
  {
    exact: true,
    path: "/falar-com-vendedor",
    guard: AuthGuard,
    component: lazy(() => import("../views/userdashboard/contactvendor")),
  },
  {
    exact: true,
    path: "/edituser",
    guard: AuthGuard,
    component: lazy(() => import("../views/userdashboard/edituser")),
  },
  {
    exact: true,
    path: "/vendor-dashboard",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(() => import("../views/vendordashboard")),
  },
  {
    exact: true,
    path: "/configurepayment",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(() => import("../views/vendordashboard/configurepayment")),
  },

  {
    exact: true,
    path: "/editaccount",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(() => import("../views/vendordashboard/editaccount")),
  },
  {
    exact: true,
    path: "/purchasedetail",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(() => import("../views/vendordashboard/purchasedetail")),
  },
  {
    exact: true,
    path: "/productcatalog",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(() => import("../views/vendordashboard/productcatalog")),
  },
  {
    exact: true,
    path: "/addproduct",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(
      () => import("../views/vendordashboard/productcatalog/addproduct")
    ),
  },
  {
    exact: true,
    path: "/lives",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(() => import("../views/vendordashboard/lives")),
  },
  {
    exact: true,
    path: "/liveschedule",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(
      () => import("../views/vendordashboard/lives/liveschedule")
    ),
  },
  {
    exact: true,
    path: "/startlive",
    guard: AuthGuard,
    layout: VendorDashboard,
    component: lazy(() => import("../views/vendordashboard/lives/startlive")),
  },

  {
    exact: true,
    path: "/vendedor",
    guard: GuestGuard,
    component: lazy(() => import("../views/vendor")),
    type: 0,
  },
  {
    exact: true,
    path: "/cliente",
    guard: GuestGuard,
    component: lazy(() => import("../views/vendor")),
    type: 1,
  },

  {
    exact: true,
    path: "/login",
    guard: GuestGuard,
    component: lazy(() => import("../views/login")),
  },

  {
    exact: true,
    path: "/blog",
    component: lazy(() => import("../views/blog")),
  },

  {
    exact: true,
    path: "/blog/:blogId",
    component: lazy(() => import("../views/blog/detail")),
  },

  {
    exact: true,
    path: "/termos",
    component: lazy(() => import("../views/term")),
  },

  {
    exact: true,
    path: "/politicas",
    component: lazy(() => import("../views/policy")),
  },

  {
    exact: true,
    path: "/admin",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/dashboard")),
  },

  {
    exact: true,
    path: "/admin/login",
    guard: AdminGuestGuard,
    component: lazy(() => import("../views/admin/login")),
  },

  {
    exact: true,
    path: "/admin/dashboard",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/dashboard")),
  },

  {
    exact: true,
    path: "/admin/blog",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/blog")),
  },
  {
    exact: true,
    path: "admin/blog/edit",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/blog/edit")),
  },
  {
    exact: true,
    path: "admin/blog/edit/:blogId",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/blog/edit")),
  },

  {
    exact: true,
    path: "/admin/user",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/user")),
  },
  {
    exact: true,
    path: "/admin/vendedores",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/vendedores")),
  },
  {
    exact: true,
    path: "/admin/compradores",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/compradores")),
  },

  {
    exact: true,
    path: "/admin/vendedores/:vendedorID",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/vendedores/edit")),
  },

  {
    exact: true,
    path: "/admin/compradores/:compradorID",
    guard: AdminGuard,
    layout: AdminDashboard,
    component: lazy(() => import("../views/admin/compradores/edit")),
  },
];

export default routes;
