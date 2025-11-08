export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
}

export const STOCKS: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries Ltd.", sector: "Energy", currentPrice: 2845.50, change: 32.75, changePercent: 1.16, volume: 8234920, marketCap: "19.2L Cr" },
  { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT Services", currentPrice: 3678.90, change: -24.30, changePercent: -0.66, volume: 2184330, marketCap: "13.4L Cr" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", sector: "Banking", currentPrice: 1642.80, change: 18.45, changePercent: 1.14, volume: 12384720, marketCap: "12.5L Cr" },
  { symbol: "INFY", name: "Infosys Ltd.", sector: "IT Services", currentPrice: 1456.25, change: 22.80, changePercent: 1.59, volume: 9482940, marketCap: "6.1L Cr" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", sector: "Banking", currentPrice: 1089.60, change: -15.20, changePercent: -1.38, volume: 18472340, marketCap: "7.6L Cr" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd.", sector: "FMCG", currentPrice: 2534.75, change: 28.90, changePercent: 1.15, volume: 1594820, marketCap: "5.9L Cr" },
  { symbol: "ITC", name: "ITC Ltd.", sector: "FMCG", currentPrice: 478.30, change: 5.65, changePercent: 1.20, volume: 22738290, marketCap: "5.9L Cr" },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking", currentPrice: 785.45, change: -8.90, changePercent: -1.12, volume: 28384720, marketCap: "7.0L Cr" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd.", sector: "Telecom", currentPrice: 1534.20, change: 19.85, changePercent: 1.31, volume: 5384720, marketCap: "9.2L Cr" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking", currentPrice: 1789.45, change: -12.60, changePercent: -0.70, volume: 3472910, marketCap: "3.5L Cr" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd.", sector: "Financial Services", currentPrice: 6842.80, change: 95.40, changePercent: 1.41, volume: 1284920, marketCap: "4.2L Cr" },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd.", sector: "Consumer Goods", currentPrice: 2891.50, change: -18.75, changePercent: -0.64, volume: 1384720, marketCap: "2.8L Cr" },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd.", sector: "Automobile", currentPrice: 12456.75, change: 234.50, changePercent: 1.92, volume: 584720, marketCap: "3.8L Cr" },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd.", sector: "IT Services", currentPrice: 1289.90, change: 15.80, changePercent: 1.24, volume: 3384720, marketCap: "3.5L Cr" },
  { symbol: "WIPRO", name: "Wipro Ltd.", sector: "IT Services", currentPrice: 456.80, change: -5.40, changePercent: -1.17, volume: 8384720, marketCap: "2.5L Cr" },
  { symbol: "LT", name: "Larsen & Toubro Ltd.", sector: "Infrastructure", currentPrice: 3567.25, change: 48.90, changePercent: 1.39, volume: 2384720, marketCap: "4.9L Cr" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd.", sector: "Banking", currentPrice: 1156.40, change: 12.30, changePercent: 1.08, volume: 9384720, marketCap: "3.6L Cr" },
  { symbol: "M&M", name: "Mahindra & Mahindra Ltd.", sector: "Automobile", currentPrice: 2789.60, change: 45.80, changePercent: 1.67, volume: 3384720, marketCap: "3.5L Cr" },
  { symbol: "TITAN", name: "Titan Company Ltd.", sector: "Consumer Goods", currentPrice: 3456.90, change: 67.20, changePercent: 1.98, volume: 1584720, marketCap: "3.1L Cr" },
  { symbol: "ADANIENT", name: "Adani Enterprises Ltd.", sector: "Conglomerate", currentPrice: 2234.75, change: -28.60, changePercent: -1.26, volume: 5384720, marketCap: "2.6L Cr" },
];

export interface HistoricalDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PredictionData {
  date: string;
  predicted: number;
  confidenceLow: number;
  confidenceHigh: number;
  actual?: number;
}

export const TIMEFRAMES = [
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "3M", value: "3M" },
  { label: "6M", value: "6M" },
  { label: "1Y", value: "1Y" },
  { label: "5Y", value: "5Y" },
  { label: "All", value: "ALL" },
];

export const PREDICTION_HORIZONS = [
  { label: "Next Day", value: "day", days: 1 },
  { label: "Next Week", value: "week", days: 7 },
  { label: "Next Month", value: "month", days: 30 },
  { label: "Next Year", value: "year", days: 365 },
];

// Generate mock historical data
export const generateHistoricalData = (symbol: string, days: number = 365): HistoricalDataPoint[] => {
  const stock = STOCKS.find(s => s.symbol === symbol);
  if (!stock) return [];
  
  const data: HistoricalDataPoint[] = [];
  let price = stock.currentPrice * 0.85; // Start from lower price
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const variation = (Math.random() - 0.5) * price * 0.03;
    price += variation;
    
    const open = price + (Math.random() - 0.5) * price * 0.01;
    const close = price + (Math.random() - 0.5) * price * 0.01;
    const high = Math.max(open, close) + Math.random() * price * 0.015;
    const low = Math.min(open, close) - Math.random() * price * 0.015;
    const volume = stock.volume * (0.8 + Math.random() * 0.4);
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(volume),
    });
  }
  
  return data;
};

// Generate mock prediction data
export const generatePredictionData = (symbol: string, horizon: string): PredictionData[] => {
  const stock = STOCKS.find(s => s.symbol === symbol);
  if (!stock) return [];
  
  const horizonConfig = PREDICTION_HORIZONS.find(h => h.value === horizon);
  if (!horizonConfig) return [];
  
  const data: PredictionData[] = [];
  let price = stock.currentPrice;
  const today = new Date();
  
  const trend = Math.random() > 0.5 ? 1 : -1;
  const trendStrength = 0.001 + Math.random() * 0.002;
  
  for (let i = 1; i <= Math.min(horizonConfig.days, 90); i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    price = price * (1 + trend * trendStrength + (Math.random() - 0.5) * 0.005);
    const confidence = price * 0.05;
    
    data.push({
      date: date.toISOString().split('T')[0],
      predicted: parseFloat(price.toFixed(2)),
      confidenceLow: parseFloat((price - confidence).toFixed(2)),
      confidenceHigh: parseFloat((price + confidence).toFixed(2)),
    });
  }
  
  return data;
};
