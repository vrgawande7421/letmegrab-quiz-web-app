import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { BannerSection } from "../component/BannerSection";
import { useEffect } from "react";
import { Header } from "../component/Header";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  if (user?.token) {
    if (user?.data?.role == "admin") {
      return <Navigate to={"/admin"} replace />;
    } else {
      return <Navigate to={"/quiz-list"} replace />;
    }
  }
  return (
    <>
      <Header />
      <BannerSection />
    </>
  );
};
export default HomePage;
