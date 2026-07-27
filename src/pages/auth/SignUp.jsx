import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaUserPlus, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { register } from "../../api/services/auth/Auth";
import { Header } from "../../component/Header";

const SignUp = () => {
  const [userDetail, setUserDetail] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = userDetail;

    if (!username || !email || !password || !confirmPassword) {
      toast.warning("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: username,
        email,
        password,
      };

      const response = await register(payload);
      toast.success(response.data.message || "Registration Successful!");

      setUserDetail({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
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
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl mx-auto mb-3 shadow-md">
              <FaUserPlus />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-xs mt-1">Join Quiz App to test and expand your knowledge</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Full Name / Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="username"
                  value={userDetail.username}
                  onChange={handleOnChange}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={userDetail.email}
                  onChange={handleOnChange}
                  placeholder="name@example.com"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userDetail.password}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userDetail.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-center text-sm text-gray-600 pt-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Login
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

export default SignUp;