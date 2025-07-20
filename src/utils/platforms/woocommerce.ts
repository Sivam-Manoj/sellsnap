export const woocommercePlatform = {
  name: "WooCommerce",
  fields: [
    { name: "ID", format: "number", maxLengthEnabled: false },
    {
      name: "post_title",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "post_content",
      format: "text",
      maxLength: "5000",
      maxLengthEnabled: true,
    },
    {
      name: "post_excerpt",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    { name: "sku", format: "text", maxLength: "50", maxLengthEnabled: true },
    { name: "regular_price", format: "number", maxLengthEnabled: false },
    { name: "sale_price", format: "number", maxLengthEnabled: false },
    {
      name: "stock_status",
      format: "text",
      maxLength: "20",
      maxLengthEnabled: true,
    },
    { name: "stock", format: "number", maxLengthEnabled: false },
    { name: "weight", format: "number", maxLengthEnabled: false },
    { name: "length", format: "number", maxLengthEnabled: false },
    { name: "width", format: "number", maxLengthEnabled: false },
    { name: "height", format: "number", maxLengthEnabled: false },
    {
      name: "categories",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    { name: "tags", format: "text", maxLength: "500", maxLengthEnabled: true },
    {
      name: "images",
      format: "list",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
  ],
  extraPoints:
    "Distinguish between the short and long descriptions. The short description should be a punchy summary, while the long description should be detailed and comprehensive, using HTML for structure. Optimize categories and tags for site navigation and SEO. Provide accurate shipping information (weight, dimensions) as it is critical for self-hosted shipping calculations.",
  systemMessage: `
You are a WooCommerce product listing and SEO optimization expert.

Your task is to generate a complete, high-converting, SEO-optimized WooCommerce product listing as structured JSON, using real WooCommerce CSV/API field names only.

Instructions:
1. Write a keyword-rich, clear, and compelling "post_title" (product name/title, max 255 chars).
2. Write a detailed, persuasive "post_content" (long description, max 5000 chars, use HTML for formatting and storytelling).
3. Create a concise, benefit-driven "post_excerpt" (short description, max 1000 chars).
4. Set a competitive "regular_price" and optional "sale_price".
5. Provide a unique "sku" for inventory tracking.
6. Set "stock_status" (instock, outofstock, onbackorder) and available "stock" quantity.
7. Enter accurate "weight", "length", "width", and "height" (all in metric units) for shipping.
8. Assign relevant "categories" and "tags" (comma-separated, use WooCommerce slugs or names).
9. Provide up to 5 high-quality "images" (array of HTTPS URLs).

---

Sample JSON:
{
  "ID": 1234,
  "post_title": "EcoBrew Reusable Coffee Cup - 16oz, Leakproof, BPA-Free",
  "post_content": "<p>Enjoy your coffee sustainably with the EcoBrew Reusable Cup. Features leakproof lid, double-wall insulation, and eco-friendly materials. Dishwasher safe.</p>",
  "post_excerpt": "Sustainable, leakproof, and stylish reusable coffee cup. Perfect for on-the-go!",
  "sku": "ECOBREW-16OZ",
  "regular_price": 14.99,
  "sale_price": 11.99,
  "stock_status": "instock",
  "stock": 250,
  "weight": 0.25,
  "length": 15,
  "width": 8,
  "height": 8,
  "categories": "drinkware,eco-friendly",
  "tags": "reusable,cup,coffee,travel",
  "images": [
    "https://example.com/images/ecobrew1.jpg",
    "https://example.com/images/ecobrew2.jpg"
  ]
}

Make sure the content is detailed, persuasive, and fully optimized for both user experience and search engine visibility on a self-hosted WooCommerce/WordPress site. Use only real WooCommerce field names for compatibility with product import/export tools and REST API.
`,

  user: null,
};
