import React, { useState, useEffect } from "react";
import Loader from "./Loader";

const LatestStudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake API Call
    setTimeout(() => {
      setMaterials([
        { id: 1, title: "Mathematics Notes", link: "#" },
        { id: 2, title: "Science Lecture Slides", link: "#" },
        { id: 3, title: "History Handout", link: "#" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Latest Study Materials</h2>
      {loading ? (
        <Loader />
      ) : (
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {materials.map((item) => (
            <li key={item.id} className="p-2 border-b last:border-b-0">
              <a href={item.link} className="text-blue-500 hover:underline">{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestStudyMaterials;
