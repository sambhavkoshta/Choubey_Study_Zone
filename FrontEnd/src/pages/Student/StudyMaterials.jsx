import { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaVideo } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudyMaterials = () => {
  const [studyMaterials, setStudyMaterials] = useState({
    notes: [],
    videos: [],
    syllabus: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/study-materials");
        setStudyMaterials(response.data);
      } catch (err) {
        setError("Failed to load study materials. Please try again.");
        toast.error("Error loading study materials");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  if (loading) return <div className="text-center text-lg font-semibold">Loading study materials...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">📚 Study Materials</h2>

        {/* Notes Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-indigo-600 flex items-center"><FaFilePdf className="mr-2" /> Notes (PDF)</h3>
          {studyMaterials.notes.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {studyMaterials.notes.map((note) => (
                <li key={note._id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-800">{note.title}</span>
                  <a href={note.fileUrl} download className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Download PDF
                  </a>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 mt-2">No notes available.</p>}
        </div>

        {/* Video Lectures Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-indigo-600 flex items-center"><FaVideo className="mr-2" /> Video Lectures</h3>
          {studyMaterials.videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              {studyMaterials.videos.map((video) => (
                <div key={video._id} className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="text-gray-800 mb-2">{video.title}</h4>
                  <video controls className="w-full rounded-lg">
                    <source src={video.fileUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          ) : <p className="text-gray-500 mt-2">No video lectures available.</p>}
        </div>

        {/* Syllabus Section */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-600 flex items-center"><FaFilePdf className="mr-2" /> Syllabus (PDF)</h3>
          {studyMaterials.syllabus.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {studyMaterials.syllabus.map((syllabus) => (
                <li key={syllabus._id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-800">{syllabus.title}</span>
                  <a href={syllabus.fileUrl} target="_blank" rel="noopener noreferrer" download className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Download PDF
                  </a>
                </li>
              ))}
            </ul>
          ) : <p className="text-gray-500 mt-2">No syllabus available.</p>}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;
