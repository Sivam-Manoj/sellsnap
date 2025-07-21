import * as dotenv from "dotenv";
import { Resend } from "resend";
import {
  getVerificationEmailHtml,
  getPasswordResetEmailHtml,
} from "./emailHtml.js";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTransactionalEmail(
  options: EmailOptions
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY in environment variables.");
  }

  const fromAddress = "verify@sellsnap.co.uk"; // Your verified domain sender

  try {
    await resend.emails.send({
      from: `SellSnap <${fromAddress}>`,
      to: options.to,
      subject: options.subject,
      html: options.htmlContent,
    });
  } catch (error: any) {
    console.error("❌ Failed to send email:", error.message);
    throw error;
  }
}

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await sendTransactionalEmail({ to, subject, htmlContent: html });
};

export async function sendVerificationCode(to: string, code: string) {
  const subject = `Your SellSnap Verification Code: ${code}`;
  const htmlContent = getVerificationEmailHtml(code);
  await sendTransactionalEmail({ to, subject, htmlContent });
}

export async function sendPasswordResetLink(to: string, resetLink: string) {
  const subject = "Your SellSnap Password Reset Link";
  const htmlContent = getPasswordResetEmailHtml(resetLink);
  await sendTransactionalEmail({ to, subject, htmlContent });
}
