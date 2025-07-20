export const wixStoresPlatform = {
  name: "Wix Stores",
  fields: [
    { name: "name", format: "text", maxLength: "255", maxLengthEnabled: true },
    {
      name: "handleId",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "fieldType",
      format: "text",
      maxLength: "20",
      maxLengthEnabled: true,
    }, // 'Product' or 'Variant'
    {
      name: "description",
      format: "text",
      maxLength: "5000",
      maxLengthEnabled: true,
    },
    {
      name: "productImageUrl",
      format: "list",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "collection",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    { name: "sku", format: "text", maxLength: "100", maxLengthEnabled: true },
    {
      name: "ribbon",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
    { name: "price", format: "number", maxLengthEnabled: false },
    { name: "surcharge", format: "number", maxLengthEnabled: false },
    { name: "visible", format: "boolean", maxLengthEnabled: false },
    {
      name: "discountMode",
      format: "text",
      maxLength: "20",
      maxLengthEnabled: true,
    }, // 'PERCENT' or 'AMOUNT'
    { name: "discountValue", format: "number", maxLengthEnabled: false },
    {
      name: "inventory",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    }, // e.g. 'InStock'
    { name: "weight", format: "number", maxLengthEnabled: false },
    { name: "cost", format: "number", maxLengthEnabled: false },
    // Up to 6 options
    {
      name: "productOptionName1",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionType1",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionDescription1",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionName2",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionType2",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionDescription2",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionName3",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionType3",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionDescription3",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionName4",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionType4",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionDescription4",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionName5",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionType5",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionDescription5",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionName6",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionType6",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "productOptionDescription6",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    // Up to 6 additional info fields
    {
      name: "additionalInfoTitle1",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoDescription1",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoTitle2",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoDescription2",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoTitle3",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoDescription3",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoTitle4",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoDescription4",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoTitle5",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoDescription5",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoTitle6",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "additionalInfoDescription6",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    // Custom text fields
    {
      name: "customTextField1",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    { name: "customTextCharLimit1", format: "number", maxLengthEnabled: false },
    {
      name: "customTextMandatory1",
      format: "boolean",
      maxLengthEnabled: false,
    },
    { name: "brand", format: "text", maxLength: "255", maxLengthEnabled: true },
  ],
  extraPoints:
    "For Wix Stores, the minimum required fields for a product are: handleId, name, fieldType (Product or Variant), and price. For variants, use fieldType 'Variant' and provide optionChoices. Do not add or remove columns from the template. Use semicolon-separated lists for multiple images or collections. Add as much detail as possible for best results. For reference, see the official Wix CSV template and documentation.",
  systemMessage: `
You are a Wix Stores product listing and eCommerce optimization expert.

Your task is to generate a complete, high-converting, SEO-optimized Wix Stores product listing as structured JSON, using real Wix CSV/API field names only for compatibility with Wix's import/export tools.

Instructions:
1. Write a keyword-rich, clear, and compelling "name" (max 255 chars).
2. Write a detailed, persuasive "description" (max 5000 chars) highlighting features, use cases, and value.
3. Set a competitive "price" and specify "sku" for inventory tracking.
4. Provide "productImageUrl" as a semicolon-separated list of HTTPS URLs.
5. Assign relevant "collection" names (semicolon-separated).
6. Use "fieldType" as 'Product' for main products and 'Variant' for variations. Each variant must have a handleId, fieldType, and optionChoices.
7. Add custom options, additional info, and custom text fields as needed.
8. For best results, fill out as many fields as possible. Do not add or remove fields from the template.

---

Sample JSON:
{
  "name": "Custom T-Shirt with Scanned Image - Personalized Art, Handwriting, or Logo Shirt", // Fully SEO-optimized and uniquely positioned to feature scanned drawings, handwritten notes, or logos as wearable designs
  "handleId": "custom-tshirt-001",
  "fieldType": "Product",
  "description": "A soft, comfortable t-shirt you can personalize with your own text or image.",
  "productImageUrl": "https://example.com/image1.jpg;https://example.com/image2.jpg",
  "collection": "T-Shirts;Custom Gifts",
  "sku": "TSHIRT-001",
  "ribbon": "New Arrival",
  "price": 19.99,
  "surcharge": 2.5,
  "visible": true,
  "discountMode": "PERCENT",
  "discountValue": 10,
  "inventory": "InStock",
  "weight": 0.2,
  "cost": 8.5,
  "productOptionName1": "Size",
  "productOptionType1": "DROP_DOWN",
  "productOptionDescription1": "Choose your size",
  "productOptionName2": "Color",
  "productOptionType2": "COLOR",
  "productOptionDescription2": "Choose your color",
  "productOptionName3": "Material",
  "productOptionType3": "DROP_DOWN",
  "productOptionDescription3": "Select material",
  "productOptionName4": "Print",
  "productOptionType4": "TEXT",
  "productOptionDescription4": "Custom print text",
  "productOptionName5": "Gift Wrap",
  "productOptionType5": "CHECKBOX",
  "productOptionDescription5": "Add gift wrap",
  "productOptionName6": "Length",
  "productOptionType6": "DROP_DOWN",
  "productOptionDescription6": "Select length",
  "additionalInfoTitle1": "Care Instructions",
  "additionalInfoDescription1": "Machine wash cold, tumble dry low.",
  "additionalInfoTitle2": "Return Policy",
  "additionalInfoDescription2": "30-day returns accepted.",
  "additionalInfoTitle3": "Shipping Info",
  "additionalInfoDescription3": "Ships within 2 business days.",
  "additionalInfoTitle4": "Sustainability",
  "additionalInfoDescription4": "Made with eco-friendly materials.",
  "additionalInfoTitle5": "Warranty",
  "additionalInfoDescription5": "1-year warranty included.",
  "additionalInfoTitle6": "Origin",
  "additionalInfoDescription6": "Made in USA.",
  "customTextField1": "Engraving Text",
  "customTextCharLimit1": 30,
  "customTextMandatory1": false,
  "brand": "YourBrand"
}

Make sure the listing is optimized for Wix's import/export requirements and eCommerce best practices.
`,
  user: null,
};
