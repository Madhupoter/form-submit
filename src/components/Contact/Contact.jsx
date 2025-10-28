import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    if (formData.file) data.append("file", formData.file);

    try {
      const response = await fetch("http://localhost/form-submit/mail.php", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        alert("✅ Message sent successfully!");
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Attach File</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={handleChange}
            accept=".pdf,.doc,.jpg,.png"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
