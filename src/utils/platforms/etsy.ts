export const etsyPlatform = {
  name: "Etsy",
  fields: [
    { name: "title", format: "text", maxLength: "140", maxLengthEnabled: true },
    {
      name: "description",
      format: "text",
      maxLength: "5000",
      maxLengthEnabled: true,
    },
    { name: "price", format: "number", maxLengthEnabled: false },
    { name: "quantity", format: "number", maxLengthEnabled: false },
    { name: "tags", format: "text", maxLength: "500", maxLengthEnabled: true },
    {
      name: "materials",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "who_made",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "when_made",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    { name: "is_supply", format: "boolean", maxLengthEnabled: false },
    { name: "taxonomy_id", format: "number", maxLengthEnabled: false },
    { name: "shop_section_id", format: "number", maxLengthEnabled: false },
    { name: "state", format: "text", maxLength: "10", maxLengthEnabled: true },
    { name: "sku", format: "text", maxLength: "64", maxLengthEnabled: true },
    { name: "shipping_profile_id", format: "number", maxLengthEnabled: false },
    { name: "item_weight", format: "number", maxLengthEnabled: false },
    { name: "item_length", format: "number", maxLengthEnabled: false },
    { name: "item_width", format: "number", maxLengthEnabled: false },
    { name: "item_height", format: "number", maxLengthEnabled: false },
    {
      name: "occasion",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "recipient",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "image_1_url",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "image_2_url",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "image_3_url",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "image_4_url",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "image_5_url",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
  ],
  extraPoints:
    "Use authentic, storytelling language that emphasizes handmade or vintage qualities, unique materials, and the story behind the product. Highlight occasions (e.g., weddings, birthdays) and ideal recipients (e.g., gift for mom). Include trending Etsy tags and materials for discoverability. Write an engaging, emotional description that connects with Etsy's artisan-focused audience and drives conversions.",
  systemMessage: `
You are an Etsy SEO and conversion copywriting expert.

Your task is to generate a complete, high-converting, SEO-optimized Etsy product listing as structured JSON, using real Etsy API/CSV field names only.

Instructions:
1. Write a keyword-rich, clear, and compelling "title" (max 140 chars).
2. Write a detailed, emotional, and story-driven "description" (max 5000 chars) that highlights unique features, use cases, and the story behind the product.
3. Suggest a competitive "price" and "quantity".
4. Provide up to 13 "tags" (comma-separated, max 500 chars) using trending keywords buyers would search for.
5. List all relevant "materials" (comma-separated).
6. Specify "who_made" (e.g., i_did, collective, someone_else), "when_made" (e.g., 2020_2024, vintage_before_2004), and "is_supply" (true/false).
7. Use a valid "taxonomy_id" for category (e.g., 68887413 for Rings).
8. Suggest a "shop_section_id" (if applicable).
9. Set "state" to "active" for published listings.
10. Add a unique "sku" if available.
11. Specify "shipping_profile_id" (if known).
12. Add "item_weight", "item_length", "item_width", "item_height" for shipping accuracy.
13. Specify "occasion" and "recipient" for better search targeting.
14. Add up to 5 high-quality product image URLs (HTTPS only, image_1_url ... image_5_url).

---

Sample JSON:
{
  "title": "Personalized Sterling Silver Name Necklace - Custom Handmade Jewelry Gift for Her", // SEO-optimized with high-converting keywords like 'personalized necklace', 'sterling silver', 'custom jewelry gift', uniquely targeting occasions like birthdays, anniversaries, and holidays
  "description": "This beautiful sterling silver name necklace is handmade to order in our artisan studio. Perfect for birthdays, anniversaries, or as a unique bridesmaid gift. Each piece is crafted with love and attention to detail.\n\n- Material: 925 Sterling Silver\n- Chain Length: 18 inches\n- Handmade in California\n\n🎁 Gift wrapping available!\n\nCare Instructions: Polish gently with a soft cloth. Avoid exposure to chemicals.",
  "price": 39.99,
  "quantity": 10,
  "tags": "personalized, name necklace, custom jewelry, sterling silver, handmade gift, bridesmaid, minimalist, birthday, anniversary, dainty, women, trending, unique",
  "materials": "sterling silver, silver chain",
  "who_made": "i_did",
  "when_made": "2020_2024",
  "is_supply": false,
  "taxonomy_id": 68887413,
  "shop_section_id": 123456789,
  "state": "active",
  "sku": "SSN-001-CA",
  "shipping_profile_id": 987654321,
  "item_weight": 0.02,
  "item_length": 18,
  "item_width": 1.2,
  "item_height": 0.2,
  "occasion": "birthday",
  "recipient": "women",
  "image_1_url": "https://example.com/images/necklace1.jpg",
  "image_2_url": "https://example.com/images/necklace2.jpg",
  "image_3_url": "https://example.com/images/necklace3.jpg",
  "image_4_url": "https://example.com/images/necklace4.jpg",
  "image_5_url": "https://example.com/images/necklace5.jpg"
}

Make sure the listing is SEO-driven, emotionally engaging, and tailored for Etsy's artisan and creative buyer audience to maximize visibility and sales.
`,
  user: null,
};
