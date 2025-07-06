export type CompanyType = {
    id: number;
    name: string;
    stock_symbol: string;
    logo_url: string;
    sector: string;
}

type CompanyMarketInfoType = {
    stock_price: number;
    price_change: number;
    market_cap: number;
    created_at: string;
}

type CompanyMetricsType = {
    pe_ratio: number;
    dividend_yield: number;
    beta: number;
}

export type CompanyByIdType = {
    id: number;
    name: string;
    stock_symbol: string;
    logo_url: string;
    description: string;
    industry: string;
    founded: number;
    location: string;
    website: string;
    market_info: CompanyMarketInfoType;
    metrics: CompanyMetricsType;
}

export type CompanyMarket = {
    stock_price: number;
    price_change: number;
    market_cap: number;
}