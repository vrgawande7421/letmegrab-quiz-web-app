import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { roleContext } from "../context/CreateContex";
import { FaClipboardList } from "react-icons/fa";
import { toast } from "react-toastify";

export const Header = () => {
  const navigate = useNavigate();


  const { setRole, role, setLoggedIn } = useContext(roleContext);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleRole = (selectedRole) => {
    localStorage.setItem("loginRole", selectedRole);
    navigate("/login");
    setRole(selectedRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loginRole");

    setLoggedIn(false);
    toast.info("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaClipboardList className="text-2xl" />
          <h1 className="text-2xl font-bold">Quiz App</h1>
        </div>

        <div className="flex items-center gap-3">
          {!role && (
            <>
              <button className="btn" onClick={() => handleRole("user")}>
                User
              </button>

              <button className="btn" onClick={() => handleRole("admin")}>
                Admin
              </button>
            </>
          )}

          {role && !user?.token && (
            <>
              <button className="btn" onClick={() => navigate("/login")}>
                Login
              </button>

              <button className="btn" onClick={() => navigate("/signup")}>
                Signup
              </button>
            </>
          )}

          {user?.token && (
            <>

              <span className="font-semibold px-2">{user?.data?.name}</span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
