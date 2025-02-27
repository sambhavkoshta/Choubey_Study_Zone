import Student from "../models/Student.js";

// ✅ Get All Student Success Stories
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student success stories", error });
  }
};

// ✅ Add a Student Success Story
export const addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student success story added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding student story", error });
  }
};

// ✅ Update Student Story
export const updateStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Student story updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating student story", error });
  }
};

// ✅ Delete Student Story
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student success story deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student story", error });
  }
};
