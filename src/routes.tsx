import { lazy } from "react";
import { RouteObject } from "react-router";
import { AuthChecker, Sidebar } from "./components";

const WelcomePage = lazy(() => import("./pages/welcome"));
const RegisterPage = lazy(() => import("./pages/register"));
const LoadingScreenPage = lazy(() => import("./pages/loadingScreen"));
const HomePage = lazy(() => import("./pages/home"));
const TasksPage = lazy(() => import("./pages/tasks"));
const ReferralsPage = lazy(() => import("./pages/referrals"));
const CrashPage = lazy(() => import("./pages/crash"));

export const routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <AuthChecker navigateOnSuccess="/home" />,
  },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/loading-screen", element: <LoadingScreenPage /> },
  { path: "/crash", element: <CrashPage /> },
  {
    element: <Sidebar />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      { path: "/tasks", element: <TasksPage /> },
      { path: "/referrals", element: <ReferralsPage /> },
    ],
  },
];
