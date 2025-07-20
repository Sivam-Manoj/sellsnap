export const tiktokPlatform = {
  name: "TikTok Shop",
  fields: [
    {
      name: "product_name",
      format: "text",
      maxLength: "120",
      maxLengthEnabled: true,
    },
    {
      name: "product_id",
      format: "text",
      maxLength: "64",
      maxLengthEnabled: true,
    },
    {
      name: "description",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    { name: "category_id", format: "number", maxLengthEnabled: false },
    { name: "brand", format: "text", maxLength: "64", maxLengthEnabled: true },
    {
      name: "images",
      format: "list",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "video_url",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    { name: "price", format: "number", maxLengthEnabled: false },
    { name: "stock_qty", format: "number", maxLengthEnabled: false },
    { name: "sku", format: "text", maxLength: "50", maxLengthEnabled: true },
    { name: "shipping_weight", format: "number", maxLengthEnabled: false },
  ],
  extraPoints:
    "Focus on creating a viral, attention-grabbing title and a description that highlights benefits quickly. Use trendy keywords and hashtags relevant to the TikTok audience. The video is the most crucial element, so emphasize its importance in showcasing the product in an engaging, authentic way. Keep the tone energetic, fun, and persuasive to drive impulse buys within the app.",
  systemMessage: `
You are a TikTok Shop product listing and viral marketing expert.

Your task is to generate a complete, high-converting, SEO-optimized TikTok Shop product listing as structured JSON, using real TikTok Shop API/CSV field names only.

Instructions:
1. Write a catchy, energetic "product_name" (max 120 characters) using viral and trending keywords.
2. Create a concise, persuasive "description" (max 1000 characters) highlighting key features, benefits, and emotional triggers for a fast-paced audience.
3. Suggest a valid "category_id" for discoverability (use TikTok Shop's numeric category IDs).
4. Specify the "brand" if available.
5. Provide up to 9 high-quality "images" (array of HTTPS URLs) and one "video_url" (HTTPS URL), optimized for mobile and engagement.
6. Set a competitive "price" and available "stock_qty".
7. Add a unique "sku" for inventory management.
8. Specify "shipping_weight" in kilograms for logistics.

---

Sample JSON:
{
  "product_name": "GlowUp LED Vanity Mirror - Touch Sensor Makeup Mirror with Adjustable Brightness & Smart Dimming", // Fully SEO-optimized with keywords like 'LED vanity mirror', 'touch sensor', 'adjustable brightness', and unique value for makeup and beauty lovers
  "product_id": "1234567890",
  "description": "Get flawless makeup every time with our GlowUp LED Vanity Mirror. Features adjustable brightness, touch controls, and a sleek, portable design. Perfect for home or travel!",
  "category_id": 1002001,
  "brand": "GlowUp",
  "images": [
    "https://example.com/images/mirror1.jpg",
    "https://example.com/images/mirror2.jpg"
  ],
  "video_url": "https://example.com/videos/mirror-demo.mp4",
  "price": 29.99,
  "stock_qty": 100,
  "sku": "GU-LED-MIRROR-01",
  "shipping_weight": 0.75
}

Make sure the listing is optimized for TikTok's algorithm to maximize visibility, engagement, and sales in a social commerce environment. Use only real TikTok Shop field names for compatibility with product import tools and APIs.
`,
  user: null,
};
