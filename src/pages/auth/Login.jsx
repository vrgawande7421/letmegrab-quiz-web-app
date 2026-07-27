import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUserCheck, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { roleContext } from "../../context/CreateContex";
import { login } from "../../api/services/auth/Auth";
import { Header } from "../../component/Header";

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(roleContext);

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedRole = localStorage.getItem("loginRole") || "";

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setLoginDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginDetail;

    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await login({
        email,
        password,
      });

      const user = response.data;
      if (selectedRole && selectedRole !== user?.data?.role) {
        toast.error(`Account role mismatch. Please login as ${selectedRole}`);
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true);
      toast.success(`Welcome back, ${user?.data?.name || "User"}!`);

      if (user?.data?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/quiz-list", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-between">
      <Header />

      <div className="flex-1 flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          
          {selectedRole && (
            <div className="flex justify-center mb-4">
              <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedRole} Login Portal
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl mx-auto mb-3 shadow-md">
              <FaUserCheck />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-xs mt-1">Please enter your credentials to sign in</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
        
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={loginDetail.email}
                  onChange={handleOnChange}
                  placeholder="name@example.com"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

        
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginDetail.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

          
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-gray-600 pt-2">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>

      <footer className="text-center py-4 text-xs text-gray-400">
        Quiz App Platform &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Login;
