import { useState, useEffect } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import { FaEye, FaTrash } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { format } from "date-fns";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;
  const adminToken = localStorage.getItem("adminToken");
  useEffect(() => {
    fetchContacts();
  }, []);
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await API.get("/contact/all", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setContacts(response.data);
    } catch (error) {
      toast.error("Failed to load contacts!");
    }
    setLoading(false);
  };
  const handleDelete = async () => {
    if (deleteId) {
      try {
        await API.delete(`/contact/${deleteId}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        toast.success("Contact deleted successfully!");
        fetchContacts();
      } catch (error) {
        toast.error("Failed to delete contact!");
      }
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const paginatedContacts = contacts.slice(
    (currentPage - 1) * contactsPerPage,
    currentPage * contactsPerPage
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Contact Management
        </h2>
        <div className="text-sm text-gray-500 mt-1 md:mt-0">
          Managing user inquiries and messages
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : paginatedContacts.length === 0 ? (
          <div className="py-16 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No contacts found</h3>
            <p className="mt-1 text-sm text-gray-500">There are no contacts in the system yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{contact.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {format(new Date(contact.createdAt), "dd MMM yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowViewModal(true);
                          }}
                        >
                          <FaEye className="text-xs" />
                          <span>View</span>
                        </button>
                        <button
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                          onClick={() => {
                            setDeleteId(contact._id);
                            setShowDeleteModal(true);
                          }}
                        >
                          <FaTrash className="text-xs" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>
          
          <div className="flex">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageToShow;
              if (totalPages <= 5) {
                pageToShow = i + 1;
              } else if (currentPage <= 3) {
                pageToShow = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageToShow = totalPages - 4 + i;
              } else {
                pageToShow = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageToShow}
                  onClick={() => setCurrentPage(pageToShow)}
                  className={`w-10 h-10 flex items-center justify-center border-t border-b ${
                    i === 0 && currentPage > 3 && totalPages > 5 ? "border-l" : ""
                  } ${
                    i === 4 && currentPage < totalPages - 2 && totalPages > 5 ? "border-r" : ""
                  } ${
                    currentPage === pageToShow
                      ? "bg-blue-600 text-white border-blue-600 font-bold"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  } ${
                    pageToShow === 1 && currentPage > 3 && totalPages > 5 ? "rounded-l-md" : ""
                  } ${
                    pageToShow === totalPages && currentPage < totalPages - 2 && totalPages > 5 ? "rounded-r-md" : ""
                  } transition-all`}
                >
                  {pageToShow}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center"
          >
            Next
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {showViewModal && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fade-in">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Contact Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <HiX size={20} />
              </button>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Phone
                  </label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Date Received
                  </label>
                  <p className="text-gray-900">
                    {format(new Date(selectedContact.createdAt), "MMMM dd, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Message
                  </label>
                  <div className="mt-1 bg-gray-50 p-3 rounded-md text-gray-700 max-h-40 overflow-y-auto">
                    {selectedContact.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-colors"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-fade-in">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FaTrash className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Contact</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this contact? This action cannot be undone and all data 
                associated with this contact will be permanently removed from the system.
              </p>
              <div className="flex space-x-3 justify-center">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContactManagement;