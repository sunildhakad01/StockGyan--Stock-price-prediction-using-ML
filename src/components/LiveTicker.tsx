import { useEffect, useState } from "react";
import { STOCKS } from "@/data/stocks";

export const LiveTicker = () => {
  const [tickerStocks, setTickerStocks] = useState(STOCKS.slice(0, 10));

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerStocks((prev) =>
        prev.map((stock) => ({
          ...stock,
          currentPrice: stock.currentPrice + (Math.random() - 0.5) * 0.5,
          change: stock.change + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border-y-2 border-border overflow-hidden">
      <div className="animate-scroll flex gap-8 py-3">
        {[...tickerStocks, ...tickerStocks].map((stock, index) => (
          <div key={`${stock.symbol}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-bold text-foreground">{stock.symbol}</span>
            <span className="font-semibold text-foreground">${stock.currentPrice.toFixed(2)}</span>
            <span
              className={`text-sm font-medium ${
                stock.change >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {stock.change >= 0 ? "▲" : "▼"} {Math.abs(stock.changePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
