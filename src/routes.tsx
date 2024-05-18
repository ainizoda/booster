import { lazy } from "react";
import { RouteObject } from "react-router";

const WelcomePage = lazy(() => import("./pages/welcome"));
const RegisterPage = lazy(() => import("./pages/register"));

export const routerConfig: RouteObject[] = [
  { path: "/", element: <WelcomePage /> },
  { path: "/register", element: <RegisterPage /> },
];
