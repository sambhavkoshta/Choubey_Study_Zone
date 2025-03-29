import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import API from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Trash2, X, Image, Upload, RefreshCw } from "lucide-react";

const MAX_IMAGES_PER_UPLOAD = 5;
const ITEMS_PER_PAGE = 8;

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: MAX_IMAGES_PER_UPLOAD,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
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

  const deleteImage = async (id) => {
    try {
      await API.delete(`/gallery/${id}`);
      toast.success("Image deleted successfully!");

      const updatedGallery = gallery.filter((img) => img._id !== id);
      setGallery(updatedGallery);

      if (currentImage && currentImage._id === id) {
        setCurrentImage(null);
      }

      // If all images on current page are deleted, go to previous page
      const remainingImages = updatedGallery.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      );

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
        setShowDeleteModal(false);
        if (showForm) setShowForm(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showForm]);

  const totalPages = Math.ceil(gallery.length / ITEMS_PER_PAGE);
  const paginatedGallery = gallery.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setSelectedFiles([]);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:text-base"
        >
          <Plus size={18} />
          <span>Add Images</span>
        </button>
      </div>

      {/* Main content container */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-lg font-medium text-gray-700">Gallery Images</h2>
          <button 
            onClick={fetchGallery} 
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-lg border border-gray-200 p-2 shadow-sm">
                <div className="h-40 w-full rounded-md bg-gray-200"></div>
                <div className="mt-2 h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : gallery.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 text-center">
            <Image size={48} className="mb-2 text-gray-400" />
            <p className="text-gray-500">No images available in the gallery</p>
            <button 
              onClick={() => setShowForm(true)} 
              className="mt-4 inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
            >
              <Plus size={16} className="mr-1" />
              Add your first image
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {paginatedGallery.map((image) => (
              <div 
                key={image._id} 
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt="Gallery"
                    className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onClick={() => setCurrentImage(image)}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(image);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow-md transition-opacity hover:bg-red-700 group-hover:opacity-100"
                    aria-label="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {gallery.length > ITEMS_PER_PAGE && (
          <div className="mt-6 flex justify-center">
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
          </div>
        )}
      </div>

      {/* Upload modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Upload Images</h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedFiles([]);
                }}
                className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-3 text-sm text-gray-600">
              Upload up to {MAX_IMAGES_PER_UPLOAD} images at once
            </p>
            
            <div
              {...getRootProps()}
              className={`mb-4 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors ${
                isDragActive ? "border-blue-400 bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto mb-2 text-gray-400" size={28} />
              {isDragActive ? (
                <p className="text-blue-600">Drop the files here...</p>
              ) : (
                <p className="text-gray-600">
                  Drag & drop images here, or click to select files
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Supported formats: JPG, PNG, GIF, WEBP
              </p>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Selected images ({selectedFiles.length}):
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={file.preview}
                        alt={`Preview ${index + 1}`}
                        className="aspect-square w-full rounded-md object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
                        }}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedFiles([]);
                }}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isUploading || selectedFiles.length === 0}
              >
                {isUploading ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && selectedForDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl">
            <Trash2 size={32} className="mx-auto mb-4 text-red-500" />
            <h3 className="mb-2 text-lg font-bold text-gray-800">Delete Image</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this image? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteImage(selectedForDelete._id)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image preview modal */}
      {currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setCurrentImage(null)}
        >
          <div 
            className="relative max-h-[90vh] max-w-4xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-colors hover:bg-gray-100"
              onClick={() => setCurrentImage(null)}
            >
              <X size={20} />
            </button>
            <img
              src={currentImage.url}
              alt="Full size preview"
              className="max-h-[80vh] rounded-lg"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(null);
                  confirmDelete(currentImage);
                }}
                className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;