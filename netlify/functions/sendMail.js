import nodemailer from "nodemailer";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, message } = JSON.parse(event.body);

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: "mail.enternine.com",
    port: 587,
    secure: false,
    auth: {
      user: "madhu@enternine.com",
      pass: "Madhu@8704", 
    },
  });

  const mailOptions = {
    from: `"${name}" <madhu@enternine.com>`,
    to: "madhu@enternine.com", // where you’ll receive mail
    subject: "New Contact Form Submission",
    html: `
      <h3>New Inquiry from Website</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
