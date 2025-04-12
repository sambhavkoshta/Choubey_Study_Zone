import {User} from "../models/user.model.js";
import Course from "../models/course.model.js";
import StudyMaterial from "../models/StudyMaterial.js";
import bcrypt from "bcryptjs";

export const getStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user._id).select("-password");
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getEnrolledCourses = async (req, res) => {
    try {
        const courses = await Course.find({ enrolledStudents: req.user._id });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses" });
    }
};

export const getStudyMaterials = async (req, res) => {
    try {
        const materials = await StudyMaterial.find({ enrolledStudents: req.user._id });
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error fetching study materials" });
    }
};

export const updateStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.user._id);

        if (!student) return res.status(404).json({ message: "Student not found" });

        student.name = req.body.name || student.name;
        student.email = req.body.email || student.email;

        if (req.body.password) {
            student.password = await bcrypt.hash(req.body.password, 10);
        }

        await student.save();
        res.status(200).json({ message: "Profile Updated Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
};

const generateToken = (res, user) => {
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already in use" });

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) return res.status(400).json({ message: "Phone number already registered" });
    const user = await User.create({ firstname, lastname, email, phone, password });
    if (user) {
      generateToken(res, user);
      res.status(201).json({
        message: "User registered successfully",
        user: { firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone, role: user.role },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(res, user);
    res.status(200).json({
      message: "Login successful",
      user: { firstname: user.firstname, lastname: user.lastname, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const logoutUser = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
