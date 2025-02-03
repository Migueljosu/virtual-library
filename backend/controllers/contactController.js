const { ContactUs } = require("../models");

const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const userId = req.user ? req.user.id : null; // Pega o ID se o usuário estiver logado

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await ContactUs.create({
      user_id: userId,
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  sendMessage,
};
