import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-image.png";
import { useContext } from "react";
import { roleContext } from "../context/CreateContex";

export const BannerSection = () => {
  const { setRole } = useContext(roleContext)
  const navigate = useNavigate();
  const handleRole = (selectedRole) => {
    localStorage.setItem("loginRole", selectedRole);
    navigate("/login");
    setRole(selectedRole);
  }
  return (
    <section className="bg-blue-500 text-white min-h-[85vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to Quiz App
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Test your knowledge with interactive quizzes, track your scores, and
            improve your skills through fun learning.
          </p>

          <button
            onClick={() => handleRole("user")}
            className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition btn "
          >
            Start Quiz
          </button>
        </div>

        <div className="flex justify-center">
          <img src={heroImg} alt="Quiz Hero" className="w-full max-w-md" />
        </div>
      </div>
    </section>
  );
};
