import React, { useState } from "react";
import "./Contact.css"; // optional CSS file

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/.netlify/functions/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) setStatus("✅ Message sent successfully!");
    else setStatus("❌ Failed to send message.");
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>Name</label>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />

        <label>Message</label>
        <textarea name="message" placeholder="Your Message" onChange={handleChange} required />

        <button type="submit">Send Message</button>
      </form>
      <p className="status">{status}</p>
    </div>
  );
}

export default Contact;
