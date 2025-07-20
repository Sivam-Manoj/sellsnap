export const alibabaPlatform = {
  name: "Alibaba",
  fields: [
    {
      name: "Product Name",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Category",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Keywords",
      format: "text",
      maxLength: "500",
      maxLengthEnabled: true,
    },
    {
      name: "Description",
      format: "text",
      maxLength: "5000",
      maxLengthEnabled: true,
    },
    { name: "Price", format: "number", maxLengthEnabled: false },
    { name: "MOQ", format: "number", maxLengthEnabled: false },
    { name: "Supply Ability", format: "number", maxLengthEnabled: false },
    {
      name: "FOB Port",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Lead Time",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Payment Terms",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Brand Name",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Model Number",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Certification",
      format: "text",
      maxLength: "255",
      maxLengthEnabled: true,
    },
    {
      name: "Images",
      format: "list",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "Videos",
      format: "list",
      maxLength: "2000",
      maxLengthEnabled: true,
    },
    {
      name: "Packaging Details",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    {
      name: "Product Specifications",
      format: "json",
      maxLength: "5000",
      maxLengthEnabled: true,
    },
    {
      name: "HS Code",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
    },
    {
      name: "Country of Origin",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
  ],
  extraPoints:
    "To maximize discoverability and conversion on Alibaba, provide as much detail as possible: keyword-rich product name, clear category, multiple relevant keywords, a compelling and detailed description, competitive pricing, and accurate MOQ/supply information. Include high-quality images and videos, specify certifications, and fill in all logistics and compliance fields. Optimize for Alibaba's Product Information Score (PIS) by ensuring all required and optional fields are completed.",
  systemMessage: `
You are an Alibaba product listing and B2B optimization expert.

Your task is to generate a complete, high-converting, SEO-optimized Alibaba product listing as structured JSON, using real Alibaba field names only for compatibility with Alibaba's CSV/API import tools.

Instructions:
1. Write a keyword-rich, clear, and compelling "Product Name" (max 255 chars).
2. Select the most relevant "Category" for visibility.
3. Add multiple "Keywords" (comma-separated, max 500 chars) for search optimization.
4. Write a detailed, persuasive "Description" (max 5000 chars) highlighting features, use cases, and business value.
5. Set a competitive "Price" and specify "MOQ" (Minimum Order Quantity).
6. Provide "Supply Ability" and "FOB Port" for trade logistics.
7. Specify "Lead Time" and "Payment Terms".
8. Add "Brand Name", "Model Number", and any "Certification".
9. Include multiple high-quality "Images" and "Videos" (HTTPS URLs only).
10. Fill in "Packaging Details" and "Product Specifications" (as JSON/object for technical info).
11. Add "HS Code" and "Country of Origin" for customs compliance.

---

Sample JSON:
{
  "Product Name": "Eco-Friendly Bamboo Toothbrush - Biodegradable Natural Soft Bristles for Sustainable Oral Care", // SEO-optimized with keywords like 'eco-friendly', 'bamboo toothbrush', 'biodegradable', and 'sustainable oral care', uniquely appealing to zero-waste and environmentally conscious consumers
  "Category": "Personal Care > Oral Hygiene",
  "Keywords": "bamboo, toothbrush, eco-friendly, biodegradable, oral care",
  "Description": "Our bamboo toothbrush offers a sustainable alternative to plastic brushes. Made from 100% biodegradable bamboo, soft BPA-free bristles, and eco-friendly packaging.",
  "Price": 0.45,
  "MOQ": 1000,
  "Supply Ability": 50000,
  "FOB Port": "Shanghai",
  "Lead Time": "15 days",
  "Payment Terms": "T/T, L/C",
  "Brand Name": "GreenSmile",
  "Model Number": "GS-BT-01",
  "Certification": "CE, FDA",
  "Images": [
    "https://example.com/images/bamboo-toothbrush1.jpg",
    "https://example.com/images/bamboo-toothbrush2.jpg"
  ],
  "Videos": [
    "https://example.com/videos/bamboo-toothbrush-demo.mp4"
  ],
  "Packaging Details": "50 pcs/carton, 10kg/carton",
  "Product Specifications": {
    "Material": "Bamboo",
    "Bristle Type": "Soft",
    "Length": "19cm"
  },
  "HS Code": "96032100",
  "Country of Origin": "China"
}

Make sure the listing is optimized for Alibaba's Product Information Score (PIS) to maximize visibility and B2B sales opportunities.
`,
  user: null,
};
