import mongoose from "mongoose";
import Platform from "../models/platform.model.js";

const defaultPlatforms = [
  {
    name: "Amazon",
    fields: [
      {
        name: "Product Title",
        format: "text",
        maxLength: "200",
        maxLengthEnabled: true,
      },
      {
        name: "Brand",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Category",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Condition",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Bullet Point 1",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Bullet Point 2",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Bullet Point 3",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Bullet Point 4",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Bullet Point 5",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Product Description",
        format: "text",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Search Terms (Keywords)",
        format: "text",
        maxLength: "250",
        maxLengthEnabled: true,
      },
      {
        name: "SKU",
        format: "text",
        maxLength: "40",
        maxLengthEnabled: true,
      },
      {
        name: "Product ID",
        format: "text",
        maxLength: "14",
        maxLengthEnabled: true,
      },
      {
        name: "Product ID Type",
        format: "text",
        maxLength: "1",
        maxLengthEnabled: true,
      },
      {
        name: "Price",
        format: "number",
        maxLength: "",
        maxLengthEnabled: false,
      },
      {
        name: "Quantity",
        format: "number",
        maxLength: "",
        maxLengthEnabled: false,
      },
      {
        name: "Main Image URL",
        format: "text",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Other Image URLs",
        format: "list",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Target Audience",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Material Type",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Color",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Size",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Fulfillment Method",
        format: "text",
        maxLength: "20",
        maxLengthEnabled: true,
      },
      {
        name: "Part Number",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Manufacturer",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Model Number",
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
      {
        name: "Shipping Weight",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Item Dimensions",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Variation Theme",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Parent SKU",
        format: "text",
        maxLength: "40",
        maxLengthEnabled: true,
      },
      {
        name: "Relationship Type",
        format: "text",
        maxLength: "20",
        maxLengthEnabled: true,
      },
      {
        name: "Child SKUs",
        format: "list",
        maxLength: "40",
        maxLengthEnabled: true,
      },
    ],
    extraPoints:
      "Use persuasive, benefit-driven language that clearly solves buyer pain points and highlights unique product advantages. Emphasize emotional triggers and trust-building elements like warranties or guarantees. Incorporate rich, relevant keywords strategically based on competitor analysis to boost Amazon SEO and improve search ranking. Prioritize mobile-friendly formatting with concise, impactful messaging to increase click-through rates and conversions. Focus on building trust and urgency to maximize sales and ensure long-term success on Amazon.",
    systemMessage: `
      You are a senior Amazon listing strategist and SEO optimization expert.
      
      Your task is to generate a complete, high-converting, SEO-optimized product listing for Amazon, formatted in structured JSON.
      
      ⚙️ Instructions:
      1. Write a **compelling Product Title** starting with the main keyword, followed by brand and attributes (size, color, etc). Max 200 characters.
      2. Include **5 persuasive Bullet Points** that highlight product benefits, emotional value, use cases, and key features.
      3. Write a **Product Description** using clear formatting (CAPS for headings, short paragraphs), optimized for mobile readability.
      4. Add strong **Search Terms** (backend keywords) to boost discoverability. No duplicates or brand names. Comma-separated.
      5. Fill out all additional fields like Brand, Category, SKU, Product ID, Fulfillment Method, Color, Size, etc.
      6. Include an **image URL** (main and optional secondary images).
      7. Highlight **target audience**, material, and condition.
      8. Ensure all text respects Amazon character limits and formatting policies.
      9. Focus on **natural keyword usage** to increase ranking, clicks, and conversions.
      
      Return your response in this structured JSON format:
      
     {
       "Product Title": "string (max 200 characters)",
       "Brand": "string (max 50)",
       "Category": "string (max 100)",
       "Condition": "string (e.g., New)",
       "Bullet Point 1": "string (max 500)",
       "Bullet Point 2": "string (max 500)",
       "Bullet Point 3": "string (max 500)",
       "Bullet Point 4": "string (max 500)",
       "Bullet Point 5": "string (max 500)",
       "Product Description": "string (max 2000)",
       "Search Terms": "string (comma-separated, max 250)",
       "SKU": "string (max 40)",
       "Product ID": "string (UPC/EAN/GTIN, max 14)",
       "Product ID Type": "string (1 = UPC, 2 = EAN, etc.)",
       "Price": "number",
       "Quantity": "number",
       "Main Image URL": "string (HTTPS only, max 2000)",
       "Other Image URLs": [
         "string (HTTPS only, max 2000)",
         "string (HTTPS only, max 2000)",
         "string (HTTPS only, max 2000)"
       ],
       "Target Audience": "string (e.g., Men, Women, Kids, etc.)",
       "Material Type": "string (e.g., Cotton, Plastic)",
       "Color": "string",
       "Size": "string",
       "Fulfillment Method": "string (e.g., FBA, FBM)",
       "Part Number": "string (max 50)",
       "Manufacturer": "string (max 100)",
       "Model Number": "string (max 50)",
       "Country of Origin": "string (max 100)",
       "Shipping Weight": "string (e.g., '1.5 pounds')",
       "Item Dimensions": "string (e.g., '10 x 5 x 3 inches')",
       "Variation Theme": "string (e.g., SizeColor)",
       "Parent SKU": "string (max 40)",
       "Relationship Type": "string (e.g., 'variation')",
       "Child SKUs": [
         "string (max 40)",
         "string (max 40)"
       ]
     }
      Make sure the content is SEO-driven, emotionally persuasive, and optimized for Amazon's A9 algorithm to maximize visibility and sales.
      `,
    user: null,
  },
  {
    name: "Etsy",
    fields: [
      {
        name: "Listing Title",
        format: "text",
        maxLength: "140",
        maxLengthEnabled: true,
      },
      {
        name: "Shop Section",
        format: "text",
        maxLength: "20",
        maxLengthEnabled: true,
      },
      {
        name: "Tags (comma-separated)",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Materials (comma-separated)",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Price",
        format: "number",
        maxLength: "",
        maxLengthEnabled: false,
      },
      {
        name: "Quantity",
        format: "number",
        maxLength: "",
        maxLengthEnabled: false,
      },
      {
        name: "Main Image URL",
        format: "text",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Other Image URLs",
        format: "list",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Description",
        format: "text",
        maxLength: "5000",
        maxLengthEnabled: true,
      },
      {
        name: "Who Made",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "When Made",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Category",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Occasion",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Recipient",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
    ],
    extraPoints:
      "Use authentic, storytelling language that emphasizes the handmade or vintage qualities, unique materials, and the story behind the product. Highlight occasions (e.g., weddings, birthdays) and ideal recipients (e.g., gift for mom). Include relevant and trending Etsy tags and materials to improve discoverability. Write an engaging, emotional description that connects with Etsy's artisan-focused audience and drives conversions.",
    systemMessage: `
      You are a senior Etsy listing strategist and SEO expert.
  
      Your task is to generate a complete, high-converting, SEO-optimized product listing for Etsy, formatted as structured JSON.
  
      ⚙️ Instructions:
      1. Write a **Listing Title** that is clear, descriptive, and contains relevant keywords (max 140 characters).
      2. Suggest a suitable **Shop Section** (max 20 characters).
      3. Provide up to 13 **Tags**, comma-separated, that reflect keywords buyers use (max 500 characters).
      4. List relevant **Materials** used in the product, comma-separated (max 500 characters).
      5. Write an engaging, emotional **Description** (max 5000 characters) that tells the product’s story, use cases, and highlights unique features.
      6. Include pricing and quantity details.
      7. Provide a **Main Image URL** and optional **Other Image URLs**.
      8. Specify **Who Made** the product (e.g., handmade, vintage).
      9. Indicate **When Made** (e.g., 2020s, vintage).
      10. Specify **Category**, **Occasion**, and **Recipient** to improve targeting.
      
      Return your response strictly in the following JSON format:
  
      {
        "Listing Title": "string (max 140 characters)",
        "Shop Section": "string (max 20 characters)",
        "Tags": "string (comma-separated, max 500 characters)",
        "Materials": "string (comma-separated, max 500 characters)",
        "Price": "number",
        "Quantity": "number",
        "Main Image URL": "string (HTTPS only, max 2000 characters)",
        "Other Image URLs": ["string", "string", "string"],
        "Description": "string (max 5000 characters)",
        "Who Made": "string (e.g., handmade, vintage)",
        "When Made": "string (e.g., 2020s, vintage)",
        "Category": "string (max 100 characters)",
        "Occasion": "string (max 50 characters)",
        "Recipient": "string (max 50 characters)"
      }
  
      Make sure the listing is SEO-driven, emotionally engaging, and tailored for Etsy's artisan and creative buyer audience to maximize visibility and sales.
    `,
    user: null,
  },
  {
    name: "Temu",
    fields: [
      {
        name: "Product Name",
        format: "text",
        maxLength: "150",
        maxLengthEnabled: true,
      },
      {
        name: "Category",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Key Selling Points",
        format: "text",
        maxLength: "500",
        maxLengthEnabled: true,
      },
      {
        name: "Price",
        format: "number",
        maxLength: "",
        maxLengthEnabled: false,
      },
      {
        name: "Discount Price",
        format: "number",
        maxLength: "",
        maxLengthEnabled: false,
      },
      {
        name: "Quantity",
        format: "number",
        maxLength: "",
        maxLengthEnabled: false,
      },
      {
        name: "Main Image URL",
        format: "text",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Other Image URLs",
        format: "list",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Product Description",
        format: "text",
        maxLength: "2000",
        maxLengthEnabled: true,
      },
      {
        name: "Brand",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Color",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Size",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Material",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
      {
        name: "Shipping Weight",
        format: "text",
        maxLength: "50",
        maxLengthEnabled: true,
      },
      {
        name: "Target Audience",
        format: "text",
        maxLength: "100",
        maxLengthEnabled: true,
      },
    ],
    extraPoints:
      "Focus on highlighting discounts, flash sale urgency, and exceptional value for money. Use persuasive, benefit-driven language with urgency triggers like limited time offers and scarcity to boost conversion rates on Temu's bargain-focused platform.",
    systemMessage: `
      You are a savvy Temu product marketer and SEO expert.
  
      Your task is to generate a catchy, persuasive, and SEO-optimized product listing for Temu, formatted as structured JSON.
  
      ⚙️ Instructions:
      1. Write a compelling **Product Name** that includes the main keyword and key attributes (max 150 characters).
      2. Highlight **Key Selling Points** emphasizing affordability, discounts, and value (max 500 characters).
      3. Write a concise **Product Description** focused on value, quality, and urgency (max 2000 characters).
      4. Include pricing fields, especially discount price to attract bargain shoppers.
      5. Provide clear **Category**, **Brand**, **Color**, **Size**, **Material**, and **Shipping Weight**.
      6. Specify **Target Audience** to improve relevance.
      7. Include a **Main Image URL** and optional **Other Image URLs**.
      8. Use persuasive, urgent, and benefit-driven language tailored to Temu’s price-sensitive customer base.
      9. Follow all character limits and platform formatting guidelines.
  
      Return your response strictly in the following JSON format:
  
      {
        "Product Name": "string (max 150 characters)",
        "Category": "string (max 100 characters)",
        "Key Selling Points": "string (max 500 characters)",
        "Price": "number",
        "Discount Price": "number",
        "Quantity": "number",
        "Main Image URL": "string (HTTPS only, max 2000 characters)",
        "Other Image URLs": ["string", "string", "string"],
        "Product Description": "string (max 2000 characters)",
        "Brand": "string (max 50 characters)",
        "Color": "string (max 50 characters)",
        "Size": "string (max 50 characters)",
        "Material": "string (max 100 characters)",
        "Shipping Weight": "string (max 50 characters)",
        "Target Audience": "string (max 100 characters)"
      }
  
      Ensure the listing is optimized for SEO, emphasizes discounts and value, and uses urgency to maximize conversions on Temu.
    `,
    user: null,
  },
];

export const seedPlatforms = async () => {
  try {
    const indexName = "name_1";
    const collection = mongoose.connection.collection("platforms");
    const indexes = await collection.listIndexes().toArray();
    const indexExists = indexes.some((index) => index.name === indexName);

    if (indexExists) {
      console.log(`Dropping conflicting index: ${indexName}...`);
      await collection.dropIndex(indexName);
      console.log("Index dropped successfully.");
    }
  } catch (error) {
    // Ignore errors, such as the index not existing
    console.log("Could not drop index (it may not exist, which is fine).");
  }
  try {
    for (const platformData of defaultPlatforms) {
      // Find a platform with a null user and the same name
      const existingPlatform = await Platform.findOne({
        name: platformData.name,
        user: null,
      });

      if (!existingPlatform) {
        await Platform.create(platformData);
        console.log(`Seeded platform: ${platformData.name}`);
      }
    }
  } catch (error) {
    console.error("Error seeding platforms:", error);
  }
};
