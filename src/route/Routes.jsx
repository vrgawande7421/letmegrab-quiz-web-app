import { lazy } from "react";
import { allRoutes } from "./roleRoutes";

const CommonLayout = lazy(() => import("../pages/CommonLayout"));
export const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: allRoutes,
  },
];
