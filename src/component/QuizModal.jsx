import { FaSpinner } from "react-icons/fa";

const QuizModal = ({
  open,
  onClose,
  quizTitle,
  setQuizTitle,
  onSave,
  isEdit,
  saving,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">

        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">
            {isEdit ? "Edit Quiz" : "Create Quiz"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="block mb-2 font-medium">
            Quiz Title
          </label>

          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter Quiz Title"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={saving}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin text-sm" />
                <span>{isEdit ? "Updating..." : "Creating..."}</span>
              </>
            ) : isEdit ? (
              "Update Quiz"
            ) : (
              "Create Quiz"
            )}
          </button>

        </div>

      </div>
    </div>
  );
};

export default QuizModal;