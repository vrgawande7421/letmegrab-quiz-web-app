import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaHistory, FaSearch, FaQuestionCircle, FaLayerGroup, FaSpinner } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createQuiz,
  getAllQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../api/services/admin/AdminService";

import { Header } from "../../component/Header";
import QuizModal from "../../component/QuizModal";
import ConfirmModal from "../../component/ConfirmModel";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [quizList, setQuizList] = useState([]);
  const [search, setSearch] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) || "";
  if (user?.token) {
    if (user?.data?.role !== "admin") {
      return <Navigate to={"/quiz-list"} replace />;
    }
  }

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchQuiz = async (searchText = "") => {
    try {
      setLoading(true);
      const response = await getAllQuiz(searchText);
      setQuizList(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchQuiz(value);
  };

  const handleSaveQuiz = async () => {
    if (!quizTitle.trim()) {
      toast.warning("Quiz title is required");
      return;
    }

    try {
      setSaving(true);
      if (isEdit) {
        await updateQuiz(selectedQuiz._id, {
          title: quizTitle,
        });
        toast.success("Quiz updated successfully");
      } else {
        await createQuiz({
          title: quizTitle,
        });
        toast.success("Quiz created successfully");
      }

      fetchQuiz(search);

      setQuizTitle("");
      setSelectedQuiz(null);
      setShowQuizModal(false);
      setIsEdit(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save quiz");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuiz(selectedQuiz._id);

      setQuizList((prev) =>
        prev.filter((item) => item._id !== selectedQuiz._id)
      );

      toast.success("Quiz deleted successfully");
      setShowDeleteModal(false);
      setSelectedQuiz(null);

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete quiz");
    }
  };

  const totalQuestions = quizList.reduce((acc, curr) => acc + (curr.questions?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="max-w-6xl w-full mx-auto p-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
              <FaLayerGroup />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase">Total Quizzes</span>
              <p className="text-2xl font-bold text-gray-800">{quizList.length}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/result-history")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg cursor-pointer flex items-center gap-2 font-medium shadow-sm transition text-sm"
            >
              <FaHistory /> View Result History
            </button>

            <button
              onClick={() => {
                setIsEdit(false);
                setQuizTitle("");
                setSelectedQuiz(null);
                setShowQuizModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg cursor-pointer flex items-center gap-2 font-medium shadow-sm transition text-sm"
            >
              <FaPlus /> Create Quiz
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Quiz Title..."
            value={search}
            onChange={handleSearch}
            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 text-sm shadow-sm transition"
          />
        </div>

        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-blue-600 text-3xl" />
            <p className="text-sm font-medium text-gray-600">Loading Quizzes...</p>
          </div>
        ) : quizList.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm">
            <p className="text-lg font-semibold text-gray-700">No Quiz Found</p>
            <p className="text-xs text-gray-400 mt-1">Create your first quiz to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quizList.map((quiz, index) => (
              <div
                key={quiz._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-base flex-shrink-0">
                    {index + 1}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {quiz.title}
                    </h2>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        Total Questions: <strong>{quiz.questions?.length || 0}</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      setSelectedQuiz(quiz);
                      setQuizTitle(quiz.title);
                      setShowQuizModal(true);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-white p-2.5 rounded-lg cursor-pointer transition shadow-sm"
                    title="Edit Quiz Title"
                  >
                    <FaEdit size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg cursor-pointer transition shadow-sm"
                    title="Delete Quiz"
                  >
                    <FaTrash size={16} />
                  </button>

                  <button
                    onClick={() => navigate(`/manage-question/${quiz._id}`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg cursor-pointer font-medium text-sm transition shadow-sm"
                  >
                    Manage Questions →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <QuizModal
          open={showQuizModal}
          onClose={() => {
            setShowQuizModal(false);
            setQuizTitle("");
            setSelectedQuiz(null);
            setIsEdit(false);
          }}
          quizTitle={quizTitle}
          setQuizTitle={setQuizTitle}
          onSave={handleSaveQuiz}
          isEdit={isEdit}
          saving={saving}
        />

        <ConfirmModal
          open={showDeleteModal}
          title="Delete Quiz"
          message="Are you sure you want to delete this quiz?"
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedQuiz(null);
          }}
          onConfirm={handleDelete}
        />
      </main>
    </div >
  );
};

export default AdminDashboard;