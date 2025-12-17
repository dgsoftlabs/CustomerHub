import nodemailer from "nodemailer";

// SMTP Configuration
const smtpConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

// Create reusable transporter
export const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn("⚠️ SMTP credentials not configured. Emails will be simulated.");
    return null;
  }

  try {
    const transporter = nodemailer.createTransport(smtpConfig);
    return transporter;
  } catch (error) {
    console.error("Failed to create SMTP transporter:", error);
    return null;
  }
};

// Verify SMTP connection
export const verifyConnection = async () => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    console.log("✅ SMTP server is ready to send emails");
    return true;
  } catch (error) {
    console.error("❌ SMTP connection failed:", error);
    return false;
  }
};

// Send email function
export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  const transporter = createTransporter();

  if (!transporter) {
    // Simulate email sending if SMTP is not configured
    console.log("📧 [SIMULATED] Email would be sent:");
    console.log("  From:", options.from || process.env.SMTP_FROM_EMAIL || "noreply@customerhub.com");
    console.log("  To:", Array.isArray(options.to) ? options.to.join(", ") : options.to);
    console.log("  Subject:", options.subject);
    console.log("  Text:", options.text?.substring(0, 100) + "...");
    return { simulated: true, success: true };
  }

  try {
    const mailOptions = {
      from: options.from || process.env.SMTP_FROM_EMAIL || "noreply@customerhub.com",
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return { simulated: false, success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};

// Send bulk emails
export const sendBulkEmails = async (
  recipients: string[],
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    // Simulate bulk sending
    console.log("📧 [SIMULATED] Bulk email would be sent to:", recipients.length, "recipients");
    console.log("  Subject:", subject);
    return {
      simulated: true,
      success: true,
      sent: recipients.length,
      failed: 0,
    };
  }

  const results = {
    sent: 0,
    failed: 0,
    errors: [] as Array<{ email: string; error: string }>,
  };

  // Send emails individually to avoid being marked as spam
  // For production, consider using batch sending with proper delays
  for (const email of recipients) {
    try {
      await sendEmail({
        to: email,
        subject,
        text,
        html,
      });
      results.sent++;
      
      // Add delay to avoid rate limiting (adjust based on your SMTP provider)
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      results.failed++;
      results.errors.push({
        email,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return {
    simulated: false,
    success: results.failed === 0,
    sent: results.sent,
    failed: results.failed,
    errors: results.errors,
  };
};
