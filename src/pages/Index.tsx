import { STOCKS } from "@/data/stocks";
import { StockSearch } from "@/components/StockSearch";
import { StockCard } from "@/components/StockCard";
import { LiveTicker } from "@/components/LiveTicker";
import { TrendingUp, BarChart3, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              StockGyan
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              AI-Powered Stock Price Prediction & Analysis
            </p>
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Brain className="h-5 w-5" />
                <span className="text-sm font-medium">ML Predictions</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm font-medium">Real-Time Data</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Multi-Horizon</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <StockSearch />
          </div>
        </div>
      </div>

      <LiveTicker />

      {/* Stock Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Indian Stock Market</h2>
          <p className="text-muted-foreground">
            Explore and analyze 20 top NSE stocks with AI-powered predictions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STOCKS.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/50 py-16 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Powerful Analysis Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">AI Predictions</h3>
              <p className="text-muted-foreground">
                Advanced machine learning models predict stock prices for multiple time horizons
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Interactive Charts</h3>
              <p className="text-muted-foreground">
                Visualize historical data and predictions with beautiful, responsive charts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Live Updates</h3>
              <p className="text-muted-foreground">
                Real-time market data keeps you informed with the latest price movements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
