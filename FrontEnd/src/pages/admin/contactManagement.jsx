import { useState, useEffect } from "react";
import API from "../../api";
import { toast } from "react-toastify";
import { FaEye, FaTrash, FaTimesCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchDate, setSearchDate] = useState("");
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

  const filteredContacts = searchDate
    ? contacts.filter((contact) =>
        format(new Date(contact.createdAt), "yyyy-MM-dd") === searchDate
      )
    : contacts;

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * contactsPerPage,
    currentPage * contactsPerPage
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contact Management
      </h1>

      {/* Filter & Pagination Controls */}
      <div className="flex justify-between mb-4">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="border rounded p-2 shadow-sm focus:outline-none"
        />
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded mx-1 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded mx-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading contacts...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedContacts.map((contact) => (
                <tr key={contact._id} className="text-center border-b hover:bg-gray-100 transition">
                  <td className="border p-3">{contact.name}</td>
                  <td className="border p-3">{contact.email}</td>
                  <td className="border p-3">{contact.phone}</td>
                  <td className="border p-3">
                    {format(new Date(contact.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="border p-3 flex justify-center gap-3">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2"
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowViewModal(true);
                      }}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2"
                      onClick={() => {
                        setDeleteId(contact._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Contact Modal */}
      {showViewModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Contact Details</h3>
              <MdClose
                className="text-gray-500 cursor-pointer text-2xl"
                onClick={() => setShowViewModal(false)}
              />
            </div>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Phone:</strong> {selectedContact.phone}</p>
            <p><strong>Message:</strong> {selectedContact.message}</p>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full"
              onClick={() => setShowViewModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Are you sure?</h3>
            <p className="text-gray-600 mb-4">Do you really want to delete this contact? This action cannot be undone.</p>
            <div className="flex justify-between gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
