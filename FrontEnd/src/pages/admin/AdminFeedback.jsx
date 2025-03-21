import { useEffect, useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import { FaUserCircle, FaTrash, FaStar } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch Feedbacks API
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/feedbacks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        params: { page: currentPage },
      });
      setFeedbacks(res.data.feedbacks || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      toast.error("Error fetching feedbacks!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [currentPage]);

  // ✅ Delete Confirmation Modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  // ✅ Delete Feedback API
  const deleteFeedback = async () => {
    try {
      await API.delete(`/feedbacks/${deleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      toast.success("Feedback deleted successfully!");
      fetchFeedbacks();
    } catch (error) {
      toast.error("Error deleting feedback!");
    } finally {
      closeModal();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Feedback Management</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <>
          {/* ✅ Responsive Table */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full min-w-max border border-gray-200">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border p-3">User</th>
                  <th className="border p-3">Message</th>
                  <th className="border p-3">Rating</th>
                  <th className="border p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback) => (
                    <tr key={feedback._id} className="hover:bg-gray-50 transition">
                      <td className="border p-3 flex items-center gap-2">
                        <FaUserCircle className="text-gray-500 text-lg" />
                        {feedback.user?.firstname} {feedback.user?.lastname}
                      </td>
                      <td className="border p-3">{feedback.message}</td>
                      <td className="border p-3 flex items-center gap-1">
                        {feedback.rating} <FaStar className="text-yellow-500" />
                      </td>
                      <td className="border p-3">
                        <button
                          onClick={() => confirmDelete(feedback._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">No feedbacks available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination */}
          <div className="flex justify-between mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transition-all">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this feedback?</p>
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition">
                Cancel
              </button>
              <button onClick={deleteFeedback} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
