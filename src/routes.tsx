import { lazy } from "react";
import { RouteObject } from "react-router";

const WelcomePage = lazy(() => import("./pages/welcome"));

export const routerConfig: RouteObject[] = [
  { path: "/", element: <WelcomePage /> },
];
