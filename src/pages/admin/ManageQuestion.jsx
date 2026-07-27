import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import { deleteQuestion, getQuizById } from "../../api/services/admin/AdminService";
import QuestionModal from "./QuestionModal";
import ConfirmModal from "../../component/ConfirmModel";

const ManageQuestion = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await getQuizById(quizId);
      setQuiz(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleAddQuestion = () => {
    if (quiz.questions.length >= 10) {
      toast.warning("Maximum 10 Questions Allowed");
      return;
    }

    setIsEdit(false);
    setEditQuestion(null);
    setShowModal(true);
  };

  const handleEdit = (question) => {
    setIsEdit(true);
    setEditQuestion(question);
    setShowModal(true);
  };

  const openDeleteConfirmation = (questionId) => {
    setDeleteQuestionId(questionId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteQuestionId) return;

    try {
      setDeleting(true);
      await deleteQuestion(quizId, deleteQuestionId);
      toast.success("Question deleted successfully");
      setShowDeleteModal(false);
      setDeleteQuestionId(null);
      fetchQuiz();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete question");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-3">
        <FaSpinner className="animate-spin text-blue-600 text-4xl" />
        <h2 className="text-xl font-semibold text-gray-700">Loading Quiz Details...</h2>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center mt-10 text-red-600">
        Quiz not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700 transition"
          >
            ← Back
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <p className="text-gray-500">
            {quiz.questions.length} / 10 Questions
          </p>
        </div>

        <button
          onClick={handleAddQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer font-medium transition"
        >
          + Add Question
        </button>
      </div>

      <div className="space-y-4">
        {quiz.questions.length === 0 ? (
          <div className="border rounded-lg p-6 text-center text-gray-500">
            No Questions Added
          </div>
        ) : (
          quiz.questions.map((item, index) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex justify-center items-center font-bold">
                    {index + 1}
                  </div>

                  <h2 className="font-semibold text-gray-800">
                    {item.question}
                  </h2>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer transition text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openDeleteConfirmation(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="grid grid-cols-2 gap-3">
                {item.options.map((option, i) => (
                  <div
                    key={i}
                    className={`border rounded px-3 py-2 flex justify-between items-center text-sm ${
                      i === item.correctAnswer
                        ? "bg-green-50 border-green-500 text-green-800 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <span>
                      {String.fromCharCode(65 + i)}. {option}
                    </span>

                    {i === item.correctAnswer && (
                      <span className="text-green-600 text-xs font-bold">
                        ✓ Correct
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <QuestionModal
          quizId={quizId}
          fetchQuiz={fetchQuiz}
          setShowModal={setShowModal}
          isEdit={isEdit}
          editQuestion={editQuestion}
        />
      )}

      {/* Delete Question Confirmation Modal */}
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Question"
        message="Are you sure you want to delete this question?"
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteQuestionId(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
    </div>
  );
};

export default ManageQuestion;