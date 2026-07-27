import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../component/Header";
import { useContext } from "react";
import { roleContext } from "../context/CreateContex";

const CommonLayout = () => {

const user = JSON.parse(localStorage.getItem("user") || "null");
const {setRole}=useContext(roleContext)
  if(!user?.token){
    localStorage.removeItem("loginRole")
  setRole("")
  return <Navigate to={"/home"}  replace />
  }
  else{
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
  }
};

export default CommonLayout;
