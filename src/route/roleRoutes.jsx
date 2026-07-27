import { lazy } from "react";
import { ProtectedRoute } from "../component/ProtectedRoute";
const QuizList=lazy(()=>import("../pages/user/QuizList"))
const ManageQuestion = lazy(() => import("../pages/admin/ManageQuestion"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Admin = lazy(() => import("../pages/admin/AdminPannel"));
const Quiz = lazy(() => import("../pages/user/UserQuiz"));
const Result = lazy(() => import("../pages/user/Result"));
const AdminResult = lazy(() => import("../pages/admin/AdminResult"));
const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));

const authRoute = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

export const userRoutes = [
{
    path: "/quiz/:id",
    element: <Quiz />,
},

  {

    path: "/result",
    element: (
        <Result />
    ),
  },
  {
    path: "/quiz/:id",
    element: <Quiz />,
},
  {

    path: "/quiz-list",
    element: (
        <QuizList/>
    ),
  },
];

export const adminRoutes = [
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "result-history",
    element: <AdminResult />,
  },
  {
    path: "manage-question/:quizId",
    element: <ManageQuestion />,
  },
];

export const allRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
  ...userRoutes,
  ...adminRoutes,
  ...authRoute,
];
