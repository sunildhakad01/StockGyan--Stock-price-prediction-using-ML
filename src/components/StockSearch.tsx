import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { STOCKS } from "@/data/stocks";
import { useNavigate } from "react-router-dom";

export const StockSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredStocks = STOCKS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && query) {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredStocks.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredStocks.length) % filteredStocks.length);
    } else if (e.key === "Enter" && filteredStocks[selectedIndex]) {
      handleStockSelect(filteredStocks[selectedIndex].symbol);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleStockSelect = (symbol: string) => {
    navigate(`/stock/${symbol}`);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search stocks by symbol or name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => query && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-12 h-14 text-lg border-2 focus:border-primary transition-colors"
        />
      </div>

      {isOpen && query && filteredStocks.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border-2 border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-1">
          {filteredStocks.map((stock, index) => (
            <button
              key={stock.symbol}
              onClick={() => handleStockSelect(stock.symbol)}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                index === selectedIndex
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-muted border-l-4 border-transparent"
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-foreground">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">₹{stock.currentPrice.toFixed(2)}</div>
                <div
                  className={`text-sm font-medium ${
                    stock.change >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
