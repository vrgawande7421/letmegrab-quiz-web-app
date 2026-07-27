import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getQuizById, submitQuiz } from "../../api/services/admin/AdminService";
import QuestionCard from "./QuestionCard";
import { Header } from "../../component/Header";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");

  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswerList, setUserAnswerList] = useState([]);

  const [isQuizStart, setIsQuizStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchQuiz = async () => {
    try {
      const response = await getQuizById(id);

      if (response.data.success) {
        setQuizTitle(response.data.data.title);
        setQuestions(response.data.data.questions || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load quiz");
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.warning("Please Select Answer");
      return;
    }

    const answerList = [...userAnswerList, selectedAnswer];

    if (index === questions.length - 1) {
      handleSubmit(answerList);
      return;
    }

    setUserAnswerList(answerList);
    setSelectedAnswer(null);
    setIndex((prev) => prev + 1);
  };

  const handleSubmit = async (answerList) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const userId = user?.data?._id;
      const email = user?.data?.email;

      if (!userId || !email) {
        toast.error("User session not found. Please login again.");
        navigate("/login");
        return;
      }

      const response = await submitQuiz({
        quizId: id,
        answers: answerList,
        userId,
        email,
      });

      if (response.data.success) {
        toast.success("Quiz submitted successfully!");
        localStorage.setItem("result", JSON.stringify(response.data.data));
        navigate("/result");
      }
    } catch (error) {
      console.log("Submit error:", error);
      toast.error(error.response?.data?.message || "Failed to submit quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isQuizStart) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizStart]);

  useEffect(() => {
    if (timeLeft !== 0 || !isQuizStart) return;

    toast.error("Time Over! Submitting quiz...");

    const answerList =
      selectedAnswer !== null
        ? [...userAnswerList, selectedAnswer]
        : userAnswerList;

    handleSubmit(answerList);
  }, [timeLeft]);

  if (questions.length < 10) {
    return (
      <div className="text-center mt-20">
        <Header />
        <h2 className="text-2xl font-bold text-red-600 mt-10">
          Admin not added 10 questions
        </h2>
        <button
          onClick={() => navigate("/quiz-list")}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Back to Quiz List
        </button>
      </div>
    );
  }

  if (!isQuizStart) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-5">
        <h2 className="text-3xl font-bold">{quizTitle}</h2>

        <p>Total Questions : {questions.length}</p>

        <button
          onClick={() => setIsQuizStart(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 cursor-pointer font-semibold"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Timer */}
      <div className="flex justify-end mb-5">
        <h2 className="text-xl font-bold text-red-600">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </h2>
      </div>

      {/* Question */}
      <QuestionCard
        question={questions[index]}
        currentQuestion={index + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />

      {/* Next */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-semibold"
        >
          {isSubmitting
            ? "Submitting..."
            : index === questions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
