import { Stock } from "@/data/stocks";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface StockCardProps {
  stock: Stock;
}

export const StockCard = ({ stock }: StockCardProps) => {
  const navigate = useNavigate();
  const isPositive = stock.change >= 0;

  return (
    <Card
      onClick={() => navigate(`/stock/${stock.symbol}`)}
      className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {stock.symbol}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{stock.name}</p>
        </div>
        {isPositive ? (
          <TrendingUp className="h-6 w-6 text-success" />
        ) : (
          <TrendingDown className="h-6 w-6 text-danger" />
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-3xl font-bold text-foreground">₹{stock.currentPrice.toFixed(2)}</div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-sm font-semibold ${
                isPositive ? "text-success" : "text-danger"
              }`}
            >
              {isPositive ? "+" : ""}
              {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
              {stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sector</span>
            <span className="font-medium text-foreground">{stock.sector}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-muted-foreground">Market Cap</span>
            <span className="font-medium text-foreground">₹{stock.marketCap}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
