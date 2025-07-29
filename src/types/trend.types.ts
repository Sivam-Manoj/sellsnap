export interface TrendPlatform {
  name: string;
  url: string;
}

export interface TrendingProduct {
  name: string;
  category: string;
  reason: string;
  url: string;
}

export interface SimilarProduct {
  name: string;
  comparedTo: string;
  trendReason: string;
  url: string;
}

export interface MoneyMakingOpportunity {
  idea: string;
  platforms: TrendPlatform[];
  why: string;
}

export interface PlatformInsight {
  platform: string;
  tip: string;
  url: string;
}

export interface TrendAnalysisData {
  summary: string;
  trendingProductsAndServices: TrendingProduct[];
  similarTrendingProducts: SimilarProduct[];
  moneyMakingOpportunities: MoneyMakingOpportunity[];
  platformInsights: PlatformInsight[];
  error?: string;
  rawOutput?: string;
}
