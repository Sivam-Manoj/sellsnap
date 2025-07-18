import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

interface CampaignOptions {
  name: string;
  subject: string;
  htmlContent: string;
  scheduledAt: string; // Format: "YYYY-MM-DD HH:mm:ss"
}

export async function sendBrevoCampaign(
  options: CampaignOptions
): Promise<void> {
  const {
    BREVO_API_KEY,
    BREVO_SENDER_NAME,
    BREVO_SENDER_EMAIL,
    BREVO_LIST_IDS,
  } = process.env;

  if (
    !BREVO_API_KEY ||
    !BREVO_SENDER_NAME ||
    !BREVO_SENDER_EMAIL ||
    !BREVO_LIST_IDS
  ) {
    throw new Error("Missing required environment variables.");
  }

  const jsonPayload = {
    name: options.name,
    subject: options.subject,
    sender: {
      name: BREVO_SENDER_NAME,
      email: BREVO_SENDER_EMAIL,
    },
    type: "classic",
    htmlContent: options.htmlContent,
    recipients: {
      listIds: BREVO_LIST_IDS.split(",").map((id) => parseInt(id.trim(), 10)),
    },
    scheduledAt: options.scheduledAt,
  };

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/emailCampaigns",
      jsonPayload,
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Campaign sent. Response:", response.data);
  } catch (error: any) {
    console.error(
      "❌ Failed to send campaign:",
      error.response?.data || error.message
    );
    throw error;
  }
}
