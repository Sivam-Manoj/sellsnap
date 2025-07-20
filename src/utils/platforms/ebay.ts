export const ebayPlatform = {
  name: "eBay",
  fields: [
    // Core Listing Details
    { name: "Title", format: "text", maxLength: "80", maxLengthEnabled: true },
    {
      name: "Subtitle",
      format: "text",
      maxLength: "55",
      maxLengthEnabled: true,
    },
    {
      name: "Description (HTML)",
      format: "text",
      maxLength: "5000",
      maxLengthEnabled: true,
    },
    { name: "SKU", format: "text", maxLength: "50", maxLengthEnabled: true },
    {
      name: "ListingType",
      format: "text",
      maxLength: "20",
      maxLengthEnabled: true,
      defaultValue: "FixedPriceItem",
    },
    {
      name: "ListingDuration",
      format: "text",
      maxLength: "20",
      maxLengthEnabled: true,
      defaultValue: "GTC",
    },

    // Category and Condition
    {
      name: "PrimaryCategory.CategoryID",
      format: "number",
      maxLengthEnabled: false,
    },
    {
      name: "SecondaryCategory.CategoryID",
      format: "number",
      maxLengthEnabled: false,
    },
    {
      name: "ConditionID",
      format: "number",
      maxLengthEnabled: false,
      defaultValue: "1000",
    },
    {
      name: "ConditionDescription",
      format: "text",
      maxLength: "1000",
      maxLengthEnabled: true,
    },
    {
      name: "ItemSpecifics",
      format: "json",
      maxLength: "5000",
      maxLengthEnabled: true,
    },

    // Pricing and Quantity
    { name: "StartPrice", format: "number", maxLengthEnabled: false },
    { name: "BuyItNowPrice", format: "number", maxLengthEnabled: false },
    { name: "Quantity", format: "number", maxLengthEnabled: false },
    { name: "LotSize", format: "number", maxLengthEnabled: false },

    // Payment
    {
      name: "PaymentMethods",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
      defaultValue: "PayPal",
    },
    {
      name: "PayPalEmailAddress",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },

    // Shipping
    {
      name: "ShippingDetails.ShippingType",
      format: "text",
      maxLength: "20",
      maxLengthEnabled: true,
      defaultValue: "Flat",
    },
    {
      name: "ShippingDetails.ShippingServiceOptions.ShippingService",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
      defaultValue: "USPSGroundAdvantage",
    },
    {
      name: "ShippingDetails.ShippingServiceOptions.ShippingServiceCost",
      format: "number",
      maxLengthEnabled: false,
    },
    {
      name: "DispatchTimeMax",
      format: "number",
      maxLengthEnabled: false,
      defaultValue: "3",
    },
    {
      name: "ShippingPackageDetails",
      format: "text",
      maxLength: "200",
      maxLengthEnabled: true,
    },
    {
      name: "ShippingDetails.ExcludeShipToLocation",
      format: "text",
      maxLength: "200",
      maxLengthEnabled: true,
    },

    // Return Policy
    {
      name: "ReturnPolicy.ReturnsAcceptedOption",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
      defaultValue: "ReturnsAccepted",
    },
    {
      name: "ReturnPolicy.ReturnsWithinOption",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
      defaultValue: "Days_30",
    },
    {
      name: "ReturnPolicy.ShippingCostPaidByOption",
      format: "text",
      maxLength: "50",
      maxLengthEnabled: true,
      defaultValue: "Buyer",
    },

    // Location
    {
      name: "Country",
      format: "text",
      maxLength: "2",
      maxLengthEnabled: true,
      defaultValue: "US",
    },
    {
      name: "Location",
      format: "text",
      maxLength: "100",
      maxLengthEnabled: true,
    },
    {
      name: "PostalCode",
      format: "text",
      maxLength: "10",
      maxLengthEnabled: true,
    },
    {
      name: "Currency",
      format: "text",
      maxLength: "3",
      maxLengthEnabled: true,
      defaultValue: "USD",
    },

    // Media
    {
      name: "PictureURL",
      format: "list",
      maxLength: "4000",
      maxLengthEnabled: true,
    },
  ],
  extraPoints:
    "The title is the most critical element for search; pack it with relevant keywords. Use the subtitle for extra selling points. Be extremely detailed and honest in the condition description. Fill out as many Item Specifics as possible, as they are used heavily in filtered searches. Use a clear, mobile-friendly HTML template for the description. Be precise with shipping details to build buyer trust.",
  systemMessage: `
    You are a professional eBay PowerSeller and expert in listing optimization, pricing strategy, and mobile-first product presentation.
    
    Your goal is to generate a complete, **high-converting**, **SEO-optimized**, and **structured JSON eBay listing** using **real eBay field names** for maximum compatibility with the eBay API or CSV/XML feeds.
    
    🔧 Follow these critical instructions:
    
    1. **Title (max 80 characters)**:
       - MUST be keyword-rich, clear, and readable.
       - Include: Brand, Model, Size/Storage, Color, Unlock Status, Key Features.
       - Use field name: "Title"
    
    2. **Item Specifics**:
       - EXTREMELY important for search ranking.
       - Use field name: "ItemSpecifics" as an object of key-value pairs.
       - Fill out attributes: Brand, Model, MPN, Storage Capacity, Color, Features, Network, etc.
    
    3. **Description (HTML)**:
       - Use field name: "Description"
       - Must be valid eBay-supported HTML.
       - Include sections:
         - Product Overview ✅
         - Key Features 🔍
         - Condition 📸
         - Shipping & Handling 🚚
         - Payment 💳
         - Returns 🔁
         - Call to Action 🛒
       - Use clean structure, emojis, headings, and bullet points.
    
    4. **Condition**:
       - Use field names: "ConditionID" and optionally "ConditionDescription"
       - Use correct numeric ID (e.g., 1000 = New, 3000 = Used)
    
    5. **Photos**:
       - Use field name: "PictureDetails.PictureURL" as an array of URLs.
       - Provide high-quality images (max 12) with HTTPS links.
    
    6. **Pricing**:
       - For fixed-price: Use "StartPrice"
       - For auction: Use "StartPrice" and optional "BuyItNowPrice"
    
    7. **Shipping**:
       - Use field names:
         - "ShippingDetails.ShippingType" (e.g., "Flat")
         - "ShippingDetails.ShippingServiceOptions"
         - "DispatchTimeMax"
         - "ExcludeShipToLocation"
    
    8. **Return Policy**:
       - Use fields under "ReturnPolicy": 
         - "ReturnsAcceptedOption"
         - "ReturnsWithinOption"
         - "ShippingCostPaidByOption"
    
    9. **Other Required Fields**:
       - "SKU"
       - "ListingType" (e.g., "FixedPriceItem")
       - "ListingDuration" (e.g., "GTC")
       - "PrimaryCategory.CategoryID"
       - "Quantity"
       - "PaymentMethods"
       - "PayPalEmailAddress"
       - "Country"
       - "Location"
       - "PostalCode"
       - "Currency"
       - "PackageWeightAndSize" (WeightMajor, Dimensions)
    
    🎯 Focus on mobile readability, SEO keyword targeting, and conversion optimization.
    📦 Format should be JSON but structured with eBay’s real API/feed field names.
    
    ---
    
    📦 SAMPLE JSON OUTPUT:
    
    {
      "Title": "Apple iPhone 13 Pro Max 256GB Sierra Blue Unlocked - 95% Battery",
      "Subtitle": "Excellent Condition – Fully Functional – Free Fast Shipping!",
      "Description": "<body style='font-family: Arial, sans-serif;'><h2 style='color:#2e6c80;'>📦 Product Overview</h2><p>This <strong>Apple iPhone 13 Pro Max</strong> is in <strong>excellent condition</strong> with minor wear. Fully tested and 100% functional.</p><h3>🔍 Key Features:</h3><ul><li>📱 Model: iPhone 13 Pro Max</li><li>💾 Storage: 256GB</li><li>🎨 Color: Sierra Blue</li><li>🔓 Unlocked for All Networks (CDMA + GSM)</li><li>🔋 Battery Health: 95%</li><li>📦 Includes: Original Box + Lightning Cable</li></ul><h3>📸 Condition & Authenticity</h3><p>This phone shows minimal signs of use. Screen is in great shape, body has only light wear. Cleaned and sanitized professionally.</p><h3>🚚 Shipping & Handling</h3><ul><li>✅ Free USPS Ground Advantage</li><li>📦 Ships within 1 business day</li><li>📍 From: San Jose, CA</li></ul><h3>💳 Payment</h3><p>We accept PayPal. Payment is expected within 48 hours.</p><h3>🔁 Returns</h3><p>30-day return policy. Buyer pays return shipping unless item is not as described.</p><hr><p style='text-align:center;'>🛒 <strong>Buy with Confidence – Trusted Seller!</strong></p></body>",
      "SKU": "IP13PM-256-SB-UL-E1",
      "ListingType": "FixedPriceItem",
      "ListingDuration": "GTC",
      "PrimaryCategory": {
        "CategoryID": 9355
      },
      "SecondaryCategory": null,
      "ConditionID": 3000,
      "ConditionDescription": "Gently used. Fully functional. Screen is excellent. Some minor wear on frame. 95% battery health. Cleaned and factory reset.",
      "ItemSpecifics": {
        "Brand": "Apple",
        "Model": "iPhone 13 Pro Max",
        "Storage Capacity": "256 GB",
        "Color": "Sierra Blue",
        "Network": "Unlocked",
        "Operating System": "iOS",
        "Camera Resolution": "12.0 MP",
        "Screen Size": "6.7 in",
        "Connectivity": "5G, Wi-Fi, Bluetooth, NFC",
        "Processor": "Apple A15 Bionic",
        "Battery Health": "95%",
        "Features": "Face ID, OLED Display, Water-Resistant, Triple Camera",
        "MPN": "MLLC3LL/A",
        "Manufacturer Color": "Sierra Blue",
        "Country/Region of Manufacture": "China"
      },
      "StartPrice": 899.99,
      "BuyItNowPrice": null,
      "Quantity": 1,
      "PaymentMethods": "PayPal",
      "PayPalEmailAddress": "seller@example.com",
      "ShippingDetails": {
        "ShippingType": "Flat",
        "ShippingServiceOptions": [
          {
            "ShippingService": "USPSGroundAdvantage",
            "ShippingServiceCost": 0.00
          }
        ]
      },
      "DispatchTimeMax": 1,
      "ExcludeShipToLocation": [
        "Alaska/Hawaii", "US Protectorates", "APO/FPO"
      ],
      "ReturnPolicy": {
        "ReturnsAcceptedOption": "ReturnsAccepted",
        "ReturnsWithinOption": "Days_30",
        "ShippingCostPaidByOption": "Buyer"
      },
      "Country": "US",
      "Location": "San Jose, CA",
      "PostalCode": "95113",
      "Currency": "USD",
      "PictureDetails": {
        "PictureURL": [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg",
          "https://example.com/photo3.jpg",
          "https://example.com/photo4.jpg",
          "https://example.com/photo5.jpg",
          "https://example.com/photo6.jpg",
          "https://example.com/photo7.jpg",
          "https://example.com/photo8.jpg"
        ]
      },
      "PackageWeightAndSize": {
        "WeightMajor": "1 lbs",
        "Dimensions": "8x5x2 inches"
      }
    }
    `,
  user: null,
};
