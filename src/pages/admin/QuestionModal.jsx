import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { addQuestion, updateQuestion } from "../../api/services/admin/AdminService";
import { useState ,useEffect } from "react";



const QuestionModal = ({
  quizId,
  fetchQuiz,
  setShowModal,
  isEdit,
  editQuestion,
}) => {
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && editQuestion) {
      setQuestionData({
        question: editQuestion.question,
        options: [...editQuestion.options],
        correctAnswer: editQuestion.correctAnswer,
      });
    }
  }, [isEdit, editQuestion]);

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;

    setQuestionData((prev) => ({
      ...prev,
      [name]:
        name === "correctAnswer"
          ? Number(value)
          : value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionData.options];

    updatedOptions[index] = value;

    setQuestionData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { question, options, correctAnswer } = questionData;

    if (!question.trim()) {
      toast.warning("Question is required");
      return;
    }

    if (options.some((item) => item.trim() === "")) {
      toast.warning("All options are required");
      return;
    }

    if (correctAnswer < 0 || correctAnswer > 3) {
      toast.warning("Correct answer must be between 0 and 3");
      return;
    }

    try {
      setLoading(true);

      if (isEdit) {
        await updateQuestion(
          quizId,
          editQuestion._id,
          questionData
        );

        toast.success("Question updated successfully");
      } else {
        await addQuestion(
          quizId,
          questionData
        );

        toast.success("Question added successfully");
      }

      fetchQuiz();

      setShowModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }; return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">
          {isEdit ? "Edit Question" : "Add Question"}
        </h2>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Question
            </label>

            <input
              type="text"
              name="question"
              value={questionData.question}
              onChange={handleQuestionChange}
              placeholder="Enter Question"
              className="w-full border rounded px-3 py-2 outline-none"
            />
          </div>

        
          {questionData.options.map((option, index) => (
            <div key={index} className="mb-3">
              <label className="block mb-2 font-medium">
                Option {String.fromCharCode(65 + index)}
              </label>

              <input
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, e.target.value)
                }
                placeholder={`Option ${String.fromCharCode(
                  65 + index
                )}`}
                className="w-full border rounded px-3 py-2 outline-none"
              />
            </div>
          ))}

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Correct Answer
            </label>

            <select
              name="correctAnswer"
              value={questionData.correctAnswer}
              onChange={handleQuestionChange}
              className="w-full border rounded px-3 py-2 outline-none"
            >
              <option value={0}>Option A</option>
              <option value={1}>Option B</option>
              <option value={2}>Option C</option>
              <option value={3}>Option D</option>
            </select>
          </div>

          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-5 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Saving...</span>
                </>
              ) : isEdit ? (
                "Update Question"
              ) : (
                "Add Question"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;