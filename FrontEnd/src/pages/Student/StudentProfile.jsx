import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { User, Mail, Phone, Edit, Save, X } from "lucide-react";

const StudentProfile = () => {
  const [user, setUser] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/student/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setPhone(data.phone || "");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:7000/api/student/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ firstname, lastname, email, phone }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
        setUser(data.updatedUser);
        setShowEditProfile(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Student Profile</h2>
        </div>

        {user ? (
          <div className="p-6">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gray-50 rounded-lg shadow-sm">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <span className="text-2xl font-bold">
                    {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {user.firstname} {user.lastname}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                      <Mail size={18} className="text-indigo-500" />
                      <span>{user.email}</span>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                      <Phone size={18} className="text-indigo-500" />
                      <span>{user.phone || "Not Provided"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowEditProfile(true)}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              <Edit size={18} /> Edit Profile
            </button>

            {showEditProfile && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Update Profile</h3>
                    <button 
                      onClick={() => setShowEditProfile(false)}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <form onSubmit={updateProfile} className="p-6 space-y-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          value={firstname} 
                          onChange={(e) => setFirstname(e.target.value)} 
                          placeholder="First Name" 
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          value={lastname} 
                          onChange={(e) => setLastname(e.target.value)} 
                          placeholder="Last Name" 
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Email" 
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          placeholder="Phone" 
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowEditProfile(false)} 
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2 disabled:opacity-70"
                      >
                        {loading ? "Saving..." : (
                          <>
                            <Save size={18} /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading profile data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;