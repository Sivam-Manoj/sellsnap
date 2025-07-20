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
  "Handle": "custom-embroidered-beanie",
  "Title": "Custom Embroidered Beanie - Personalized Winter Hat for Men & Women with Name or Logo Stitching", // SEO-optimized with strong keywords like 'custom embroidered beanie', 'personalized winter hat', and unique appeal with name/logo customization for gifting and style
  "Body (HTML)": "<p><strong>Design Your Style:</strong> Make winter personal with our <em>Custom Embroidered Beanie</em> — the perfect mix of warmth and individuality. Whether you want to showcase your name, brand, or a special message, we’ll stitch it with premium precision.</p><p><strong>Premium Comfort & Warmth:</strong> Made with 100% soft-touch acrylic, this thick knit beanie keeps you cozy during chilly weather while providing a snug fit that suits all head sizes.</p><p><strong>Perfect for Gifting:</strong> Ideal for birthdays, holidays, corporate giveaways, and special occasions. Everyone loves a personalized touch!</p><ul><li>✔️ Personalized with high-quality embroidery</li><li>✔️ Available in multiple colors</li><li>✔️ One-size-fits-most, unisex fit</li><li>✔️ Machine washable (gentle cycle)</li><li>✔️ Great for outdoor sports, casual wear, or branding</li></ul><p><strong>Fast Shipping:</strong> All custom orders ship within 3-5 business days!</p><p><em>Click “Add to Cart” and create your own one-of-a-kind winter accessory today!</em></p>",
  "Vendor": "The Purple Peonies",
  "Standardized Product Type": "Apparel & Accessories > Clothing Accessories > Hats > Beanies",
  "Custom Product Type": "Personalized Beanies",
  "Tags": "custom beanie, personalized hat, embroidered beanie, winter fashion, gift for him, gift for her, unisex winter hat, knit hat, monogram beanie, cold weather gear",
  "Published": true,
  "Option1 Name": "Color",
  "Option1 Value": "Black",
  "Option2 Name": "Embroidery Text",
  "Option2 Value": "Custom Text",
  "Option3 Name": "Font Style",
  "Option3 Value": "Classic Script",
  "Variant SKU": "BEANIE-BLK-CSTM-CLSC",
  "Variant Grams": 130,
  "Variant Inventory Tracker": "shopify",
  "Variant Inventory Qty": 75,
  "Variant Inventory Policy": "continue",
  "Variant Fulfillment Service": "manual",
  "Variant Price": 21.99,
  "Variant Compare At Price": 29.99,
  "Variant Requires Shipping": true,
  "Variant Taxable": true,
  "Variant Barcode": "0012345678912",
  "Image Src": "image url",
  "Image Position": 1,
  "Image Alt Text": "Personalized Black Embroidered Beanie with Custom Text",
  "Gift Card": false,
  "SEO Title": "Custom Embroidered Beanie - Personalized Knit Winter Hat",
  "SEO Description": "Design your own embroidered beanie. Personalize this warm winter hat with your name or logo. Great gift for men and women. Ships fast. Unisex fit.",
  "Status": "active"
}


Make sure the listing is SEO-driven, conversion-focused, and fully compatible with Shopify's product CSV/API fields.
`,

  user: null,
};
