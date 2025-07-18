import * as dotenv from "dotenv";
import axios from "axios";
import { getVerificationEmailHtml, getPasswordResetEmailHtml } from "./emailHtml.js";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
}

export async function sendTransactionalEmail(
  options: EmailOptions
): Promise<void> {
  const { BREVO_API_KEY, BREVO_SENDER_NAME, BREVO_SENDER_EMAIL } = process.env;

  if (!BREVO_API_KEY || !BREVO_SENDER_NAME || !BREVO_SENDER_EMAIL) {
    throw new Error(
      "Missing required environment variables for sending email."
    );
  }

  const payload = {
    sender: {
      name: BREVO_SENDER_NAME,
      email: BREVO_SENDER_EMAIL,
    },
    to: [
      {
        email: options.to,
      },
    ],
    subject: options.subject,
    htmlContent: options.htmlContent,
  };

  try {
    await axios.post("https://api.brevo.com/v3/smtp/email", payload, {
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
    });
    console.log(`✅ Email sent to ${options.to}`);
  } catch (error: any) {
    console.error(
      "❌ Failed to send email:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export const sendEmail = async (to: string, subject: string, html: string) => {
  await sendTransactionalEmail({ to, subject, htmlContent: html });
}

export async function sendVerificationCode(
  to: string,
  code: string
) {
  const subject = `Your SellSnap Verification Code: ${code}`;
  const htmlContent = getVerificationEmailHtml(code);
  await sendTransactionalEmail({ to, subject, htmlContent });
}

export async function sendPasswordResetLink(to: string, resetLink: string) {
  const subject = 'Your SellSnap Password Reset Link';
  const htmlContent = getPasswordResetEmailHtml(resetLink);
  await sendTransactionalEmail({ to, subject, htmlContent });
}
