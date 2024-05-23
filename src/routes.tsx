import { lazy } from "react";
import { RouteObject } from "react-router";
import { Sidebar } from "./components/layouts";
import { AuthChecker } from "./components";

const WelcomePage = lazy(() => import("./pages/welcome"));
const RegisterPage = lazy(() => import("./pages/register"));
const LoadingScreenPage = lazy(() => import("./pages/loadingScreen"));
const HomePage = lazy(() => import("./pages/home"));
const TasksPage = lazy(() => import("./pages/tasks"));
const ReferralsPage = lazy(() => import("./pages/referrals"));

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <AuthChecker />,
  },
  { path: "/register", element: <RegisterPage /> },
  { path: "/loading-screen", element: <LoadingScreenPage /> },
  {
    element: <Sidebar />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/tasks", element: <TasksPage /> },
      { path: "/referrals", element: <ReferralsPage /> },
    ],
  },
];
