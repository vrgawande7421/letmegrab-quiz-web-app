const ConfirmModal = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">

        <h2 className="text-xl font-bold mb-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;