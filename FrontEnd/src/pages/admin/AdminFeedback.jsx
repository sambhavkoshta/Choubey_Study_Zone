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
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Feedback Management
        </h2>
        <div className="mt-2 md:mt-0">
          <span className="text-sm font-medium text-gray-500">
            Showing page {currentPage} of {totalPages}
          </span>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback) => (
                    <tr key={feedback._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <FaUserCircle className="text-gray-400 text-lg" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {feedback.user?.firstname} {feedback.user?.lastname}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-md truncate">{feedback.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{feedback.rating}</span>
                          <FaStar className="text-yellow-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => confirmDelete(feedback._id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                        >
                          <FaTrash className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="text-gray-400 text-lg">
                          <FaStar className="w-12 h-12 mx-auto opacity-20" />
                        </div>
                        <p className="text-gray-500 text-lg font-medium">No feedbacks available</p>
                        <p className="text-gray-400 text-sm">Feedbacks will appear here when users submit them</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="hidden md:flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border text-sm font-medium rounded-md ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fade-in">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-600">
                Are you sure you want to delete this feedback? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteFeedback}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
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