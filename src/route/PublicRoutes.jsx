import { lazy } from "react";


const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const HomePage = lazy(() => import("../pages/HomePage"));
export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
];
