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
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", currentPrice: 178.50, change: 2.35, changePercent: 1.33, volume: 52483920, marketCap: "2.82T" },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology", currentPrice: 378.91, change: -1.24, changePercent: -0.33, volume: 21840330, marketCap: "2.81T" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", currentPrice: 141.80, change: 0.95, changePercent: 0.67, volume: 18274950, marketCap: "1.79T" },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Cyclical", currentPrice: 178.25, change: 3.12, changePercent: 1.78, volume: 43829410, marketCap: "1.85T" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Automotive", currentPrice: 248.50, change: -5.80, changePercent: -2.28, volume: 98472340, marketCap: "789B" },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology", currentPrice: 875.28, change: 12.45, changePercent: 1.44, volume: 38594820, marketCap: "2.16T" },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Technology", currentPrice: 486.23, change: 4.89, changePercent: 1.02, volume: 14738290, marketCap: "1.24T" },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Communication Services", currentPrice: 638.12, change: -2.45, changePercent: -0.38, volume: 3284720, marketCap: "274B" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial Services", currentPrice: 192.84, change: 1.23, changePercent: 0.64, volume: 9384720, marketCap: "564B" },
  { symbol: "BAC", name: "Bank of America Corp", sector: "Financial Services", currentPrice: 36.45, change: -0.18, changePercent: -0.49, volume: 38472910, marketCap: "284B" },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Defensive", currentPrice: 163.28, change: 0.84, changePercent: 0.52, volume: 7284920, marketCap: "443B" },
  { symbol: "PG", name: "Procter & Gamble Co", sector: "Consumer Defensive", currentPrice: 162.91, change: -0.45, changePercent: -0.28, volume: 5384720, marketCap: "385B" },
  { symbol: "KO", name: "The Coca-Cola Company", sector: "Consumer Defensive", currentPrice: 61.23, change: 0.34, changePercent: 0.56, volume: 12384720, marketCap: "265B" },
  { symbol: "DIS", name: "The Walt Disney Company", sector: "Communication Services", currentPrice: 91.45, change: 1.89, changePercent: 2.11, volume: 8384720, marketCap: "167B" },
  { symbol: "INTC", name: "Intel Corporation", sector: "Technology", currentPrice: 43.78, change: -0.89, changePercent: -1.99, volume: 42384720, marketCap: "183B" },
  { symbol: "ORCL", name: "Oracle Corporation", sector: "Technology", currentPrice: 123.45, change: 2.15, changePercent: 1.77, volume: 6384720, marketCap: "340B" },
  { symbol: "IBM", name: "International Business Machines", sector: "Technology", currentPrice: 186.92, change: 0.67, changePercent: 0.36, volume: 3384720, marketCap: "172B" },
  { symbol: "TSM", name: "Taiwan Semiconductor", sector: "Technology", currentPrice: 142.38, change: 3.28, changePercent: 2.36, volume: 8384720, marketCap: "738B" },
  { symbol: "ASML", name: "ASML Holding N.V.", sector: "Technology", currentPrice: 928.45, change: 8.92, changePercent: 0.97, volume: 1284720, marketCap: "381B" },
  { symbol: "BABA", name: "Alibaba Group Holding", sector: "Consumer Cyclical", currentPrice: 78.23, change: -1.45, changePercent: -1.82, volume: 18384720, marketCap: "198B" },
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
