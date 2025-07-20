export const shopifyPlatform = {
  name: "Shopify Store",
  fields: [
    {
      name: "Handle",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    { name: "Title", format: "text", maxLength: "255", maxLengthEnabled: true },
    {
      name: "Body (HTML)",
      format: "text",
      maxLength: "5000",
      maxLengthEnabled: true,
    },
    {
      name: "Vendor",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Standardized Product Type",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Custom Product Type",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    { name: "Tags", format: "text", maxLength: "500", maxLengthEnabled: true },
    { name: "Published", format: "boolean", maxLengthEnabled: false },
    {
      name: "Option1 Name",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Option1 Value",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Option2 Name",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Option2 Value",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Option3 Name",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Option3 Value",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Variant SKU",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    { name: "Variant Grams", format: "number", maxLengthEnabled: false },
    {
      name: "Variant Inventory Tracker",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Variant Inventory Qty",
      format: "number",
      maxLengthEnabled: false,
    },
    {
      name: "Variant Inventory Policy",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Variant Fulfillment Service",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    { name: "Variant Price", format: "number", maxLengthEnabled: false },
    {
      name: "Variant Compare At Price",
      format: "number",
      maxLengthEnabled: false,
    },
    {
      name: "Variant Requires Shipping",
      format: "boolean",
      maxLengthEnabled: false,
    },
    { name: "Variant Taxable", format: "boolean", maxLengthEnabled: false },
    {
      name: "Variant Barcode",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Image Src",
      format: "text",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    { name: "Image Position", format: "number", maxLengthEnabled: false },
    {
      name: "Image Alt Text",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    { name: "Gift Card", format: "boolean", maxLengthEnabled: false },
    {
      name: "SEO Title",
      format: "text",
      maxLength: "70",
      maxLengthEnabled: true,
    },
    {
      name: "SEO Description",
      format: "text",
      maxLength: "320",
      maxLengthEnabled: true,
    },
    { name: "Status", format: "text", maxLength: "20", maxLengthEnabled: true },
  ],
  extraPoints:
    "Craft a brand-focused narrative in the description. Use high-quality, professional images. The SEO Title and Meta Description are critical for Google ranking, so optimize them with primary keywords. Use tags to improve internal site search and collection organization. The tone should be professional and aligned with the brand's voice to build customer trust and loyalty.",
  systemMessage: `
You are a Shopify product listing and SEO optimization expert.

Your task is to generate a complete, high-converting, SEO-optimized Shopify product listing as structured JSON, using real Shopify API/CSV field names only.

Instructions:
1. Write a clear, keyword-rich "Title" (max 255 characters) for SEO and conversions.
2. Create a detailed, persuasive "Body (HTML)" product description (max 5000 characters) using HTML tags for formatting and storytelling.
3. Set the "Vendor", "Standardized Product Type", and "Custom Product Type" for proper categorization.
4. List relevant "Tags" (comma-separated) for discoverability and collections.
5. Specify product options (Option1, Option2, Option3) for variants (e.g., Size, Color).
6. For each variant, provide: "Variant SKU", "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty", "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price", "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable", "Variant Barcode".
7. Add high-quality product images using "Image Src", "Image Position", and "Image Alt Text".
8. Set "Published" and "Status" (active, draft, etc.) as appropriate.
9. Write a compelling "SEO Title" (max 70 characters) and "SEO Description" (max 320 characters) for search engine ranking.
10. Mark as "Gift Card" if applicable.

---

Sample JSON:
{
  "Handle": "custom-beanie",
  "Title": "Custom Embroidered Beanie - Personalized Winter Hat",
  "Body (HTML)": "<p>Stay warm and stylish with our custom embroidered beanie. Personalize it with your name or logo. Made from 100% soft acrylic for comfort and durability.</p>",
  "Vendor": "The Purple Peonies",
  "Standardized Product Type": "Apparel & Accessories > Clothing > Hats",
  "Custom Product Type": "Beanies",
  "Tags": "winter, beanie, custom, embroidered, gift, warm, hat",
  "Published": true,
  "Option1 Name": "Color",
  "Option1 Value": "Navy",
  "Option2 Name": "Size",
  "Option2 Value": "One Size",
  "Option3 Name": "",
  "Option3 Value": "",
  "Variant SKU": "BEANIE-NAVY-OS",
  "Variant Grams": 120,
  "Variant Inventory Tracker": "shopify",
  "Variant Inventory Qty": 50,
  "Variant Inventory Policy": "continue",
  "Variant Fulfillment Service": "manual",
  "Variant Price": 19.99,
  "Variant Compare At Price": 24.99,
  "Variant Requires Shipping": true,
  "Variant Taxable": true,
  "Variant Barcode": "1234567890123",
  "Image Src": "https://cdn.shopify.com/s/files/1/0000/0001/products/beanie-navy.jpg",
  "Image Position": 1,
  "Image Alt Text": "Custom Embroidered Navy Beanie",
  "Gift Card": false,
  "SEO Title": "Custom Embroidered Beanie - Personalized Winter Hat | The Purple Peonies",
  "SEO Description": "Shop our personalized embroidered beanie. Warm, stylish, and perfect for gifts. Fast shipping!",
  "Status": "active"
}

Make sure the listing is SEO-driven, conversion-focused, and fully compatible with Shopify's product CSV/API fields.
`,

  user: null,
};
