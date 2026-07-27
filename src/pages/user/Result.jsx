import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();

  const result = JSON.parse(localStorage.getItem("result")) || {};

  // Use percentage for performance evaluation so it works for any quiz length
  const percentage =
    result.totalQuestions > 0
      ? (result.correctAnswers / result.totalQuestions) * 100
      : 0;

  let message = "";
  let emoji = "";

  if (percentage >= 80) {
    emoji = "🎉";
    message = "Excellent";
  } else if (percentage >= 50) {
    emoji = "😊";
    message = "Good";
  } else {
    emoji = "😔";
    message = "Better Luck Next Time";
  }

  const handleRestart = () => {
    navigate("/quiz-list");
  };

  return (
    <div className="max-w-xl mx-auto mt-16 border rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-center mb-2">Quiz Result</h1>

      {result.quizTitle && (
        <p className="text-center text-gray-500 mb-6">{result.quizTitle}</p>
      )}

      <div className="space-y-4 text-lg">
        <div className="flex justify-between">
          <span>Total Questions</span>
          <span>{result.totalQuestions}</span>
        </div>

        <div className="flex justify-between text-green-600 font-semibold">
          <span>Correct Answers</span>
          <span>{result.correctAnswers}</span>
        </div>

        <div className="flex justify-between text-red-600 font-semibold">
          <span>Incorrect Answers</span>
          {/* Backend returns wrongAnswers — fixed from old incorrectAnswers */}
          <span>{result.wrongAnswers}</span>
        </div>

        <div className="flex justify-between font-bold border-t pt-3">
          <span>Score</span>
          <span>
            {result.correctAnswers} / {result.totalQuestions}
            <span className="ml-2 text-gray-500 font-normal text-base">
              ({Math.round(percentage)}%)
            </span>
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-5xl">{emoji}</h2>

        <h3 className="text-2xl font-bold mt-3">{message}</h3>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleRestart}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Result;
