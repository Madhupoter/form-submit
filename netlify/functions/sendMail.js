import nodemailer from "nodemailer";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, message } = JSON.parse(event.body);

  // 1️⃣ Configure transporter for your domain
  const transporter = nodemailer.createTransport({
    host: "mail.enternine.com",
    port: 587,
    secure: false, // true if port 465
    auth: {
      user: "madhu@enternine.com",
      pass: "Madhu@8704", // ⚠️ use app password, not real password
    },
  });

  // 2️⃣ Email to admin (you)
  const adminMail = {
    from: `"Website Contact" <madhu@enternine.com>`,
    to: "madhu@enternine.com",
    subject: "📩 New Contact Form Submission",
    html: `
      <h2>New Inquiry from Website</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td><b>Name:</b></td><td>${name}</td></tr>
        <tr><td><b>Email:</b></td><td>${email}</td></tr>
        <tr><td><b>Message:</b></td><td>${message}</td></tr>
      </table>
      <p>— This message was sent from your website contact form.</p>
    `,
  };

  // 3️⃣ Auto-reply to the user
  const autoReplyMail = {
    from: `"Enternine Support" <madhu@enternine.com>`,
    to: email,
    subject: "✅ Thank you for contacting Enternine",
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to us. We have received your message and our team will get back to you soon.</p>
      <p><b>Your Message:</b><br>${message}</p>
      <br>
      <p>Warm regards,<br><b>Team Enternine</b><br>madhu@enternine.com</p>
    `,
  };

  try {
    // 4️⃣ Send both mails (admin + user auto-reply)
    await transporter.sendMail(adminMail);
    await transporter.sendMail(autoReplyMail);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Mail sent successfully!" }),
    };
  } catch (error) {
    console.error("Mail send error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
