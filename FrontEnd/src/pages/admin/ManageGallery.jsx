    import { useState, useEffect, useCallback } from "react";
    import { useDropzone } from "react-dropzone";
    import API from "../../api";
    import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";
    import { toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";

    const MAX_IMAGES_PER_UPLOAD = 5;
    const itemsPerPage = 8;

    const ManageGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedForDelete, setSelectedForDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        setLoading(true);
        try {
        const res = await API.get("/gallery");
        setGallery(res.data.images);
        } catch (error) {
        console.error("Error fetching gallery:", error);
        toast.error("Failed to fetch images!");
        } finally {
        setLoading(false);
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > MAX_IMAGES_PER_UPLOAD) {
        toast.error(`You can upload only up to ${MAX_IMAGES_PER_UPLOAD} images at a time.`);
        return;
        }
        const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setSelectedFiles(filesWithPreview);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        maxFiles: MAX_IMAGES_PER_UPLOAD,
    });

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
        toast.error("No files selected!");
        return;
        }
        setIsUploading(true);
        const formData = new FormData();
        selectedFiles.forEach((file) => {
        formData.append("images", file);
        });
        try {
        await API.post("/gallery", formData);
        toast.success("Images uploaded successfully!");
        setShowForm(false);
        setSelectedFiles([]);
        fetchGallery();
        } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Failed to upload images!");
        } finally {
        setIsUploading(false);
        }
    };

    const confirmDelete = (image) => {
        setSelectedForDelete(image);
        setShowDeleteModal(true);
    };

    // const deleteImage = async (id) => {
    //     try {
    //     await API.delete(`/gallery/${id}`);
    //     toast.success("Image deleted successfully!");
    //     if (currentImage && currentImage._id === id) {
    //         setCurrentImage(null);
    //     }
    //     setGallery(gallery.filter((img) => img._id !== id)); // Optimistic UI update
    //     setShowDeleteModal(false);
    //     fetchGallery();
    //     } catch (error) {
    //     console.error("Error deleting image:", error);
    //     toast.error("Failed to delete image!");
    //     }
    // };

    const deleteImage = async (id) => {
        try {
            await API.delete(`/gallery/${id}`);
            toast.success("Image deleted successfully!");
    
            const updatedGallery = gallery.filter((img) => img._id !== id);
            setGallery(updatedGallery); // Optimistic UI update
    
            if (currentImage && currentImage._id === id) {
                setCurrentImage(null);
            }
    
            // जब डिलीट के बाद पेज की सारी इमेज हट जाएं, तो पिछले पेज पर शिफ्ट करें
            const remainingImages = updatedGallery.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
            
            if (remainingImages.length === 0 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
    
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Failed to delete image!");
        }
    };
    

    useEffect(() => {
        const handleEsc = (e) => {
        if (e.key === "Escape") {
            setCurrentImage(null);
        }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const totalPages = Math.ceil(gallery.length / itemsPerPage);
    const paginatedGallery = gallery.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-screen-lg mx-auto p-6 overflow-auto bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Gallery</h2>
        <div className="flex justify-start mb-4">
            <button
            onClick={() => { setShowForm(true); setSelectedFiles([]); }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
            <FaPlus /> <span>Add Image</span>
            </button>
        </div>
        {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4">Upload Images</h3>
                <p className="text-gray-600 mb-2">(Max {MAX_IMAGES_PER_UPLOAD} images per upload)</p>
                <div {...getRootProps()} className="border-2 border-dashed p-6 text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
                <input {...getInputProps()} />
                <p>Drag & Drop images here, or click to select</p>
                </div>
                {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {selectedFiles.map((file, index) => (
                    <img key={index} src={file.preview} alt="Preview" className="w-full h-24 object-cover rounded-md" />
                    ))}
                </div>
                )}
                {isUploading && <div className="text-blue-500 mt-2">Uploading...</div>}
                <div className="flex justify-between mt-4">
                <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold" disabled={isUploading}>
                    Upload
                </button>
                <button onClick={() => { setShowForm(false); setSelectedFiles([]); }} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 font-semibold">
                    Cancel
                </button>
                </div>
            </div>
            </div>
        )}
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-left">All Images</h3>
        {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="p-2 border rounded-lg shadow animate-pulse">
                <div className="w-full h-40 bg-gray-300 rounded-md"></div>
                </div>
            ))}
            </div>
        ) : gallery.length === 0 ? (
            <p className="text-gray-500">No images available</p>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedGallery.map((image) => (
                <div key={image._id} className=" border rounded-lg shadow relative group">
                <img
                    src={image.url}
                    alt="Gallery"
                    className="w-full h-40 object-cover rounded-md cursor-pointer transition-transform transform hover:scale-105"
                    loading="lazy"
                    onClick={() => setCurrentImage(image)}
                />
                <button
                    onClick={() => confirmDelete(image)} // Triggers delete confirmation modal
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200"
                >
                    <FaTrash />
                </button>
                </div>
            ))}
            </div>
        )}
        {showDeleteModal && selectedForDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" tabIndex={0}>
            <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
                <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                <p>Are you sure you want to delete this image?</p>
                <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={() => deleteImage(selectedForDelete._id)}
                    className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 font-semibold"
                >
                    Yes
                </button>
                <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 font-semibold"
                >
                    No
                </button>
                </div>
            </div>
            </div>
        )}
        {currentImage && (
            <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onKeyDown={(e) => e.key === "Escape" && setCurrentImage(null)}
            tabIndex={0}
            >
            <div className="relative bg-white rounded-lg shadow-lg max-w-3xl animate-fadeIn">
                <button
                className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                onClick={() => setCurrentImage(null)}
                >
                <FaTimes size={24} />
                </button>
                <img
                src={currentImage.url}
                alt="Large Preview"
                className="max-w-full max-h-[80vh] rounded-lg"
                />
                {/* <button
                onClick={() => { setSelectedForDelete(currentImage); setShowDeleteModal(true); }}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg w-full"
                >
                Delete Image
                </button> */}
            </div>
            </div>
        )}
        {gallery.length > itemsPerPage && (
            <div className="flex justify-between mt-6">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 font-semibold"
            >
                Previous Page
            </button>
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 font-semibold"
            >
                Next Page
            </button>
            </div>
        )}
        </div>
    );
    };

    export default ManageGallery;
