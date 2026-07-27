import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { getAllResults } from "../../api/services/admin/AdminService";
import { Header } from "../../component/Header";

const AdminResult = () => {
  const navigate = useNavigate();
  const [resultList, setResultList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllResults();
      if (response.data.success) {
        setResultList(response.data.data);
      }
    } catch (err) {
      console.log("Fetch results error:", err);
      setError("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);


  const stats = useMemo(() => {
    if (!resultList.length) return { total: 0, avgScore: 0, topScore: 0 };
    const total = resultList.length;
    const avgScore = Math.round(
      resultList.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0) / total
    );
    const topScore = Math.max(...resultList.map((r) => Math.round((r.score / r.totalQuestions) * 100)));
    return { total, avgScore, topScore };
  }, [resultList]);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return resultList;
    const q = search.toLowerCase();
    return resultList.filter(
      (r) =>
        r.email?.toLowerCase().includes(q) ||
        r.quizTitle?.toLowerCase().includes(q)
    );
  }, [resultList, search]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="max-w-6xl w-full mx-auto p-6 space-y-6 flex-1">
    
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Quiz Result History
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              View scores and performance of all users who submitted quizzes
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition shadow-sm"
          >
            ← Back
          </button>
        </div>


        {!loading && !error && resultList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <span className="text-gray-500 text-xs font-semibold uppercase">Total Attempts</span>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <span className="text-gray-500 text-xs font-semibold uppercase">Average Score</span>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.avgScore}%</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <span className="text-gray-500 text-xs font-semibold uppercase">Top Score</span>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.topScore}%</p>
            </div>
          </div>
        )}

        {!loading && !error && resultList.length > 0 && (
          <input
            type="text"
            placeholder="Search by email or quiz title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
          />
        )}

        
        {loading && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm flex flex-col items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
            <p className="text-sm font-medium text-gray-600">Loading Quiz Results...</p>
          </div>
        )}

   
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-center font-medium">
            {error}
          </div>
        )}

       
        {!loading && !error && resultList.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">
            No Quiz Results Found
          </div>
        )}

  
        {!loading && !error && filteredResults.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white font-semibold">
                    <th className="border-b p-3 text-center">No</th>
                    <th className="border-b p-3">Quiz Title</th>
                    <th className="border-b p-3">User Email</th>
                    <th className="border-b p-3 text-center">Total Questions</th>
                    <th className="border-b p-3 text-center">Correct</th>
                    <th className="border-b p-3 text-center">Incorrect</th>
                    <th className="border-b p-3 text-center">Score</th>
                    <th className="border-b p-3 text-center">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredResults.map((item, index) => {
                    const percentage = item.totalQuestions > 0 ? Math.round((item.score / item.totalQuestions) * 100) : 0;
                    return (
                      <tr key={item._id || index} className="hover:bg-gray-50 transition">
                        <td className="p-3 text-center font-medium text-gray-500">{index + 1}</td>
                        <td className="p-3 font-semibold text-gray-800">{item.quizTitle}</td>
                        <td className="p-3 text-gray-600">{item.email}</td>
                        <td className="p-3 text-center font-medium">{item.totalQuestions}</td>
                        <td className="p-3 text-center font-semibold text-green-600">{item.correctAnswers}</td>
                        <td className="p-3 text-center font-semibold text-red-600">{item.wrongAnswers}</td>
                        <td className="p-3 text-center">
                          <span className="font-bold text-gray-900">{item.score}</span>
                          <span className="text-gray-500 text-xs ml-1">({percentage}%)</span>
                        </td>
                        <td className="p-3 text-center text-gray-500 text-xs">
                          {item.submittedAt
                            ? new Date(item.submittedAt).toLocaleDateString()
                            : new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminResult;
