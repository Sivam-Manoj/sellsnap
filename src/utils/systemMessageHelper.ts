interface PlatformConfig {
    systemMessage: string;
    maxTokens: number;
}

const platformConfigs: { [key: string]: PlatformConfig } = {
    amazon: {
        maxTokens: 1500,
        systemMessage: `You are an expert Amazon listing creator. Your response must be a JSON object. Here is the required structure:
        {
            "title": "(Max 200 characters)",
            "description": "(HTML formatted, max 2000 characters)",
            "bullet_points": [
                "(Max 5 points, 100 characters each)",
                "(Max 5 points, 100 characters each)"
            ],
            "category": "(Amazon-specific category path)",
            "price": "(Number)",
            "meta_tags": [
                "(Relevant search terms)"
            ],
            "product_for": [
                "(Target audience)"
            ]
        }`
    },
    etsy: {
        maxTokens: 1200,
        systemMessage: `You are an expert Etsy listing creator. Your response must be a JSON object. Here is the required structure:
        {
            "title": "(Max 140 characters)",
            "description": "(Detailed, story-focused description)",
            "category": "(Etsy-specific category path)",
            "price": "(Number)",
            "materials": [
                "(List of materials)"
            ],
            "style": "(e.g., Vintage, Modern, Rustic)",
            "occasion": "(e.g., Birthday, Wedding)",
            "meta_tags": [
                "(13 relevant tags)"
            ],
            "product_for": [
                "(Target audience)"
            ]
        }`
    },
    ebay: {
        maxTokens: 1000,
        systemMessage: `You are an expert eBay listing creator. Your response must be a JSON object. Here is the required structure:
        {
            "title": "(Max 80 characters, include keywords)",
            "description": "(HTML formatted, can be long)",
            "category": "(eBay-specific category ID or path)",
            "price": "(Number)",
            "condition": "(e.g., New, Used, For parts)",
            "meta_tags": [
                "(Keywords for search)"
            ],
            "product_for": [
                "(Target audience)"
            ]
        }`
    },
    'ali express': {
        maxTokens: 2000,
        systemMessage: `You are an expert AliExpress listing creator. Your response must be a JSON object. Here is the required structure:
        {
            "title": "(Keyword-rich title)",
            "description": "(Detailed description with features)",
            "category": "(AliExpress-specific category path)",
            "price": "(Number)",
            "specifications": {
                "Brand Name": "",
                "Material": "",
                "Origin": ""
            },
            "meta_tags": [
                "(Keywords for search)"
            ],
            "product_for": [
                "(Target audience)"
            ]
        }`
    },
    default: {
        maxTokens: 1000,
        systemMessage: 'You are a helpful assistant that generates product listings for e-commerce platforms. Your response must be a JSON object with the following fields: title, description, category, price, meta_tags (an array of strings), and product_for (an array of strings). Here is a sample of the expected JSON structure: { "title": "Vintage Leather Jacket", "description": "A high-quality vintage leather jacket, perfect for all seasons. Made from 100% real leather.", "category": "Apparel & Accessories > Clothing > Outerwear > Coats & Jackets", "price": "150.00", "meta_tags": ["vintage jacket", "leather jacket", "biker jacket", "mens fashion"], "product_for": ["fashion enthusiasts", "motorcycle riders", "vintage lovers"] }'
    }
};

export const getPlatformConfig = (platform: string): PlatformConfig => {
    return platformConfigs[platform.toLowerCase()] || platformConfigs.default;
};
