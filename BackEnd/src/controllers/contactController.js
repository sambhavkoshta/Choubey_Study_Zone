import Contact from "../models/Contact.js";
import validator from "validator";

export const submitContact = async (req, res) => {
  try {
    let { name, email, phone, message } = req.body;
    name = name.trim();
    email = email.trim();
    phone = phone.trim();
    message = message.trim();

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format. Please provide a valid email!" });
    }

    if (!validator.isMobilePhone(phone, "en-IN")) {
      return res.status(400).json({ error: "Invalid phone number! Use a valid Indian mobile number." });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: "Message should be under 500 characters!" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Your message has been successfully sent!" });
  } catch (error) {
    console.error("Submit Contact Error:", error);
    res.status(500).json({ error: "Server error, please try again later." });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Get All Contacts Error:", error);
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found!" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Get Contact by ID Error:", error);
    res.status(500).json({ error: "Failed to fetch contact details." });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found!" });
    }
    res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    console.error("Delete Contact Error:", error);
    res.status(500).json({ error: "Failed to delete contact." });
  }
};


export const getLocation = async (req, res) => {
  try {
    const mapUrl =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.7404247367414!2d79.94890597455435!3d23.170683713071994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae135d8cbaef%3A0x6f39b2e9b7cf18a!2sAhinsa%20Chowk%2C%20Vijay%20Nagar%2C%20Jabalpur%2C%20Madhya%20Pradesh%20482002!5e0!3m2!1sen!2sin!4v1709426592167";

    res.status(200).json({ mapUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch location." });
  }
};
