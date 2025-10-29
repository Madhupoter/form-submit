 import nodemailer from "nodemailer";

export async function handler(event) {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ success: false, error: "Method Not Allowed" })
        };
    }

    try {
        // Parse request body
        const { name, email, message } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    success: false, 
                    error: "All fields are required" 
                }),
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    success: false, 
                    error: "Invalid email address" 
                }),
            };
        }

        // Configure transporter for your domain
        const transporter = nodemailer.createTransport({
            host: "mail.enternine.com",
            port: 587,
            secure: false, // Use true for port 465
            auth: {
                user: "madhu@enternine.com",
                pass: "Madhu@8704", // ⚠️ Use environment variable in production
            },
            // Additional settings for better reliability
            tls: {
                rejectUnauthorized: false // Use true in production with valid SSL
            }
        });

        // Verify SMTP connection (optional, but helpful for debugging)
        await transporter.verify();
        console.log("✅ SMTP server is ready");

        // Email to admin (you)
        const adminMail = {
            from: '"Website Contact" <madhu@enternine.com>',
            to: "madhu@enternine.com",
            replyTo: email, // User can reply directly to the sender
            subject: `📩 New Contact Form: ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #4CAF50; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
                        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        td { padding: 10px; border-bottom: 1px solid #ddd; }
                        td:first-child { font-weight: bold; width: 120px; }
                        .footer { color: #666; font-size: 12px; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2 style="margin: 0;">🆕 New Contact Form Submission</h2>
                        </div>
                        <div class="content">
                            <p>You have received a new inquiry from your website contact form.</p>
                            <table>
                                <tr>
                                    <td>Name:</td>
                                    <td>${name}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td><a href="mailto:${email}">${email}</a></td>
                                </tr>
                                <tr>
                                    <td>Message:</td>
                                    <td>${message.replace(/\n/g, '<br>')}</td>
                                </tr>
                            </table>
                            <p class="footer">
                                📅 Received: ${new Date().toLocaleString('en-US', { 
                                    dateStyle: 'full', 
                                    timeStyle: 'short' 
                                })}<br>
                                🌐 This message was sent from your website contact form.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\n— Received: ${new Date().toLocaleString()}`,
        };

        // Auto-reply to the user
        const autoReplyMail = {
            from: '"Enternine Support" <madhu@enternine.com>',
            to: email,
            replyTo: "madhu@enternine.com",
            subject: "✅ Thank you for contacting Enternine",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: #2196F3; color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
                        .content { background: #ffffff; padding: 30px; border: 1px solid #ddd; }
                        .message-box { background: #f5f5f5; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0; }
                        .footer { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; color: #666; font-size: 14px; }
                        .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0;">✨ Enternine</h1>
                        </div>
                        <div class="content">
                            <h2 style="color: #2196F3;">Hello ${name}! 👋</h2>
                            <p>Thank you for reaching out to us. We have successfully received your message and our team will get back to you as soon as possible.</p>
                            
                            <div class="message-box">
                                <p style="margin: 0 0 10px 0;"><strong>Your Message:</strong></p>
                                <p style="margin: 0; color: #555;">${message.replace(/\n/g, '<br>')}</p>
                            </div>
                            
                            <p>We typically respond within 24-48 hours during business days. If your inquiry is urgent, please don't hesitate to call us directly.</p>
                            
                            <p>In the meantime, feel free to explore our website:</p>
                            <a href="https://enternine.com" class="button">Visit Our Website</a>
                        </div>
                        <div class="footer">
                            <p style="margin: 0 0 10px 0;"><strong>Warm regards,</strong><br>
                            <strong>Team Enternine</strong></p>
                            <p style="margin: 0; font-size: 12px;">
                                📧 madhu@enternine.com<br>
                                🌐 www.enternine.com
                            </p>
                            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
                            <p style="margin: 0; font-size: 11px; color: #999;">
                                This is an automated response. Please do not reply to this email directly. 
                                If you need immediate assistance, contact us at madhu@enternine.com
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you soon.\n\nYour Message:\n${message}\n\nWarm regards,\nTeam Enternine\nmadhu@enternine.com`,
        };

        // Send admin mail first
        console.log("📤 Sending admin notification...");
        const adminInfo = await transporter.sendMail(adminMail);
        console.log("✅ Admin mail sent:", adminInfo.messageId);

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

        // Send auto-reply to user
        console.log("📤 Sending auto-reply to user...");
        const userInfo = await transporter.sendMail(autoReplyMail);
        console.log("✅ Auto-reply sent:", userInfo.messageId);

        // Success response
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Adjust for your domain in production
            },
            body: JSON.stringify({ 
                success: true, 
                message: "Thank you! Your message has been sent successfully. Please check your email for confirmation.",
                emailSent: true
            }),
        };

    } catch (error) {
        console.error("❌ Error sending email:", error);
        
        // Detailed error response
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ 
                success: false, 
                error: "Failed to send email. Please try again later.",
                details: error.message,
                // Include stack trace only in development
                // stack: error.stack 
            }),
        };
    }
}