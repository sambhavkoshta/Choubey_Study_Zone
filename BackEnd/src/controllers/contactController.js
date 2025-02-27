import Contact from '../models/Contact.js';
import dns from "dns";

// Function to Check if Email Domain is Valid
const checkEmailDomain = (email) => {
  return new Promise((resolve, reject) => {
    const domain = email.split("@")[1];
    dns.resolveMx(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        reject("Invalid email domain");
      } else {
        resolve(true);
      }
    });
  });
};

// @desc    Save contact message
// @route   POST /api/contact
// @access  Public
// ➤ POST Contact Form
export const saveContactMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Basic Email Validation
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    await checkEmailDomain(email);
  } catch (error) {
    return res.status(400).json({ error: "Invalid email domain" });
  }

  try {
    const contact = new Contact({ name, email, phone, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};