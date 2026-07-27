const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  if (!question) return null;

  return (
    <div className="bg-white rounded-lg shadow-md border p-6">
      {/* Question Count */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">
          Question {currentQuestion} / {totalQuestions}
        </h2>
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold mb-6">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all ${selectedAnswer === index
                ? "border-blue-600 bg-blue-50"
                : "hover:bg-gray-100"
              }`}
          >
            <input
              type="radio"
              name="answer"
              checked={selectedAnswer === index}
              onChange={() => setSelectedAnswer(index)}
              className="mr-3"
            />

            <span className="font-medium mr-3">
              {String.fromCharCode(65 + index)}.
            </span>

            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;