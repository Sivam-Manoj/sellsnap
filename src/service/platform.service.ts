import openai from "../utils/openaiClient.js";
import Platform, { IPlatform, IField } from "../models/platform.model.js";
import TotalTokens from "../models/totalTokens.model.js";

export const generateSystemMessage = async (
  platformName: string,
  fields: IField[],
  extraPoints: string
): Promise<string> => {
  const staticSampleJson = `
{
  "field1": "Example content formatted based on the expected type and writing style.",
  "field2": "Another example value that follows persuasive, clear, and SEO-friendly writing.",
  "field3": "Content here should match the required structure, tone, and formatting rules."
}
`;
  let totalTokens = await TotalTokens.findOne();
  if (!totalTokens) {
    totalTokens = new TotalTokens({ totalTokens: 0 });
    await totalTokens.save();
  }

  const fieldsList = fields
    .map((f) => {
      const base = `- ${f.name}: type "${f.format}"`;
      const max =
        f.maxLengthEnabled && f.maxLength ? `, max length ${f.maxLength}` : "";
      return `${base}${max}`;
    })
    .join("\n");

  const systemPrompt = `
  You are a professional AI prompt engineer and e-commerce listing assistant.
  
  Please generate a SYSTEM MESSAGE that instructs the AI to:
  - Create SEO-friendly, high-converting product listings for the e-commerce platform "${platformName}".//very important
  - Format output as a valid JSON object with these fields:
  ${fieldsList}
  
  Also include:
  - Persuasive writing style
  - Mobile-optimized tone
  - Strong CTA and buyer-focused benefits
  - Keywords and Meta Tags recommendations
  ${extraPoints ? `Extra guidelines: ${extraPoints}` : ""}
  
 don't forgot to include the sample json object in the system message based on the fields.
 here is the sample json object:
 ${staticSampleJson}
  Return the SYSTEM MESSAGE only.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
    ],
  });

  if (response.usage?.total_tokens) {
    totalTokens.totalTokens += response.usage.total_tokens;
    await totalTokens.save();
  }

  // Check if choices and message are defined
  const systemMessage = response.choices?.[0]?.message?.content;

  if (!systemMessage) {
    throw new Error("No message content returned from OpenAI");
  }

  return systemMessage.trim();
};

export const createPlatform = async (
  platformData: { name: string; fields: IField[]; extraPoints: string },
  userId: string
): Promise<IPlatform> => {
  const { name, fields, extraPoints } = platformData;

  try {
    const systemMessage = await generateSystemMessage(
      name,
      fields,
      extraPoints
    );

    const newPlatform = new Platform({
      name,
      fields,
      extraPoints,
      systemMessage,
      user: userId,
    });

    await newPlatform.save();
    return newPlatform;
  } catch (error) {
    console.error("Error creating new platform:", error);
    throw new Error("Failed to create new platform.");
  }
};

export const getPlatforms = async (userId: string): Promise<IPlatform[]> => {
  try {
    const platforms = await Platform.find({ user: userId }).sort({
      createdAt: -1,
    });
    return platforms;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    throw new Error("Failed to fetch platforms.");
  }
};

export const updatePlatform = async (
  platformId: string,
  userId: string,
  updateData: Partial<IPlatform>
): Promise<IPlatform | null> => {
  try {
    const systemMessage = await generateSystemMessage(
      updateData.name as string,
      updateData.fields as IField[],
      updateData.extraPoints as string
    );
    updateData.systemMessage = systemMessage;
    const platform = await Platform.findOneAndUpdate(
      { _id: platformId, user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return platform;
  } catch (error) {
    console.error("Error updating platform:", error);
    throw new Error("Failed to update platform.");
  }
};

export const deletePlatform = async (platformId: string, userId: string) => {
  const platform = await Platform.findOne({ _id: platformId, user: userId });
  if (!platform) {
    throw new Error("Platform not found or user not authorized");
  }
  await platform.deleteOne();
  return { message: "Platform deleted successfully" };
};

export const getRecentPlatforms = async (userId: string) => {
  try {
    const platforms = await Platform.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    return platforms;
  } catch (error) {
    console.error("Error fetching recent platforms:", error);
    throw new Error("Failed to fetch recent platforms");
  }
};

export const getAvailablePlatforms = async (userId: string) => {
  try {
    const globalPlatforms = await Platform.find({ user: null });
    const userPlatforms = await Platform.find({ user: userId });

    const userPlatformNames = userPlatforms.map((p) => p.name);

    const availablePlatforms = globalPlatforms.filter(
      (p) => !userPlatformNames.includes(p.name)
    );

    return availablePlatforms;
  } catch (error) {
    console.error("Error fetching available platforms:", error);
    throw new Error("Failed to fetch available platforms");
  }
};

export const addPlatformFromGlobal = async (
  platformId: string,
  userId: string
) => {
  try {
    const globalPlatform = await Platform.findOne({
      _id: platformId,
      user: null,
    });

    if (!globalPlatform) {
      return null; // Global platform not found
    }

    const existingUserPlatform = await Platform.findOne({
      name: globalPlatform.name,
      user: userId,
    });

    if (existingUserPlatform) {
      return null; // User already has this platform
    }

    const newPlatform = new Platform({
      name: globalPlatform.name,
      fields: globalPlatform.fields,
      extraPoints: globalPlatform.extraPoints,
      systemMessage: globalPlatform.systemMessage,
      user: userId,
    });

    await newPlatform.save();
    return newPlatform;
  } catch (error) {
    console.error("Error adding platform from global:", error);
    throw new Error("Failed to add platform from global");
  }
};
