export const amazonPlatform = {
  name: "Amazon",
  fields: [
    {
      name: "item_sku",
      format: "text",
      maxLength: "40",
      maxLengthEnabled: true,
    },
    {
      name: "external_product_id",
      format: "text",
      maxLength: "14",
      maxLengthEnabled: true,
    },
    {
      name: "external_product_id_type",
      format: "text",
      maxLength: "3",
      maxLengthEnabled: true,
    },
    {
      name: "item_name",
      format: "text",
      maxLength: "200",
      maxLengthEnabled: true,
    },
    {
      name: "brand_name",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "product_description",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "feed_product_type",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "part_number",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "manufacturer",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
    {
      name: "model_number",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    { name: "standard_price", format: "number", maxLengthEnabled: false },
    { name: "quantity", format: "number", maxLengthEnabled: false },
    {
      name: "main_image_url",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "other_image_url1",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "other_image_url2",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "bullet_point1",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "bullet_point2",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "bullet_point3",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "bullet_point4",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "bullet_point5",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "search_terms",
      format: "text",
      maxLength: "250",
      maxLengthEnabled: true,
    },
    {
      name: "item_type",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "color_name",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "size_name",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "material_type",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
    {
      name: "country_of_origin",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
    { name: "item_weight", format: "number", maxLengthEnabled: false },
    {
      name: "item_dimensions",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
    { name: "fulfillment_latency", format: "number", maxLengthEnabled: false },
    {
      name: "parent_child",
      format: "text",
      maxLength: "10",
      maxLengthEnabled: true,
    },
    {
      name: "parent_sku",
      format: "text",
      maxLength: "40",
      maxLengthEnabled: true,
    },
    {
      name: "relationship_type",
      format: "text",
      maxLength: "20",
      maxLengthEnabled: true,
    },
    {
      name: "variation_theme",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
    {
      name: "generic_keywords",
      format: "text",
      maxLength: "250",
      maxLengthEnabled: true,
    },
  ],

  extraPoints:
    "To create a high-converting Amazon listing, focus on a keyword-rich title, compelling bullet points that highlight benefits, and a detailed description. Utilize high-quality images and A+ Content where possible. Optimize backend search terms to capture all relevant customer queries. Ensure every field is filled accurately to improve filtering and discoverability within Amazon's search algorithm.",
  systemMessage: `
You are an Amazon product listing and SEO optimization expert.

Your task is to generate a complete, high-converting, SEO-optimized Amazon product listing as structured JSON, using real Amazon Seller Central flat file/API field names only.

Instructions:
1. Write a keyword-rich, clear, and compelling "item_name" (product title, max 200 chars).
2. Write a detailed, persuasive "product_description" (max 2000 chars) that highlights features, use cases, and the brand story.
3. Create up to 5 concise, benefit-driven "bullet_pointX" (max 500 chars each).
4. Set a competitive "standard_price" and available "quantity".
5. Provide a unique "item_sku" and all relevant product identifiers: "external_product_id" (UPC/EAN/ISBN), "external_product_id_type" (UPC/EAN/ISBN).
6. Specify "brand_name", "part_number", "manufacturer", "model_number", and "feed_product_type".
7. Add high-quality "main_image_url" and up to 2 "other_image_urlX" (HTTPS only).
8. Enter accurate "item_weight" (kg), "item_dimensions" (LxWxH in cm), "color_name", "size_name", "material_type", and "country_of_origin".
9. Assign "item_type" (Amazon browse node or product type).
10. For variations, use "parent_child", "parent_sku", "relationship_type", and "variation_theme".
11. Optimize "search_terms" and "generic_keywords" for ranking (max 250 bytes each).

---

Sample JSON:
{
  "item_sku": "AMZ-LED-LAMP-01",
  "external_product_id": "123456789012",
  "external_product_id_type": "UPC",
  "item_name": "LumiGlow LED Desk Lamp - Dimmable Light with USB Charging Port & Adjustable Arm for Home Office", // SEO-optimized using key terms like 'LED desk lamp', 'dimmable', 'USB charging', and 'adjustable arm', uniquely positioned for productivity, reading, and workspace lighting
  "brand_name": "LumiGlow",
  "product_description": "Illuminate your workspace with the LumiGlow LED Desk Lamp. Features touch dimming, USB charging port, and a fully adjustable arm for perfect lighting at any angle.",
  "feed_product_type": "home_lighting",
  "part_number": "LG-DL-01",
  "manufacturer": "LumiGlow",
  "model_number": "DL-01",
  "standard_price": 34.99,
  "quantity": 120,
  "main_image_url": "https://example.com/images/lumiglow1.jpg",
  "other_image_url1": "https://example.com/images/lumiglow2.jpg",
  "other_image_url2": "https://example.com/images/lumiglow3.jpg",
  "bullet_point1": "Dimmable LED with 3 brightness levels",
  "bullet_point2": "Integrated USB charging port for devices",
  "bullet_point3": "Adjustable arm and compact design",
  "bullet_point4": "Energy efficient and long-lasting",
  "bullet_point5": "Perfect for home, office, or dorm room",
  "search_terms": "desk lamp, LED, adjustable, USB, study",
  "item_type": "desk-lamps",
  "color_name": "White",
  "size_name": "Standard",
  "material_type": "ABS Plastic",
  "country_of_origin": "China",
  "item_weight": 0.8,
  "item_dimensions": "40 x 12 x 8",
  "fulfillment_latency": 1,
  "parent_child": "parent",
  "parent_sku": "AMZ-LED-LAMP-PARENT",
  "relationship_type": "variation",
  "variation_theme": "Color",
  "generic_keywords": "modern, minimalist, energy saving"
}

Make sure the content is SEO-driven, emotionally persuasive, and optimized for Amazon's A9 algorithm to maximize visibility and sales. Use only real Amazon field names for compatibility with Seller Central flat files, API, and bulk import tools.
`,

  user: null,
};
