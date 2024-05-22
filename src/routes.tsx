import { lazy } from "react";
import { RouteObject } from "react-router";

const WelcomePage = lazy(() => import("./pages/welcome"));
const RegisterPage = lazy(() => import("./pages/register"));
const LoadingScreenPage = lazy(() => import("./pages/loadingScreen"));
const HomePage = lazy(() => import("./pages/home"));

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <WelcomePage />,
  },
  { path: "/register", element: <RegisterPage /> },
  { path: "/loading-screen", element: <LoadingScreenPage /> },
  { path: "/home", element: <HomePage /> },
];
