import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  STOCKS,
  generateHistoricalData,
  generatePredictionData,
  TIMEFRAMES,
  PREDICTION_HORIZONS,
  HistoricalDataPoint,
  PredictionData,
} from "@/data/stocks";
import { PriceChart } from "@/components/PriceChart";
import { PredictionChart } from "@/components/PredictionChart";
import { LiveTicker } from "@/components/LiveTicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, TrendingDown, Activity } from "lucide-react";

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const stock = STOCKS.find((s) => s.symbol === symbol);

  const [timeframe, setTimeframe] = useState("1Y");
  const [predictionHorizon, setPredictionHorizon] = useState("day");
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [predictionData, setPredictionData] = useState<PredictionData[]>([]);

  useEffect(() => {
    if (!stock) return;

    const daysMap: Record<string, number> = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      "5Y": 1825,
      "ALL": 3650,
    };

    setHistoricalData(generateHistoricalData(stock.symbol, daysMap[timeframe] || 365));
    setPredictionData(generatePredictionData(stock.symbol, predictionHorizon));
  }, [stock, timeframe, predictionHorizon]);

  if (!stock) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Stock not found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;
  const horizonLabel = PREDICTION_HORIZONS.find((h) => h.value === predictionHorizon)?.label || "Next Day";

  return (
    <div className="min-h-screen bg-background">
      <LiveTicker />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Stock Header */}
        <Card className="p-8 mb-6 border-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{stock.symbol}</h1>
              <p className="text-xl text-muted-foreground">{stock.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{stock.sector}</p>
            </div>
            {isPositive ? (
              <TrendingUp className="h-12 w-12 text-success" />
            ) : (
              <TrendingDown className="h-12 w-12 text-danger" />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Price</p>
              <p className="text-3xl font-bold text-foreground">${stock.currentPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Change</p>
              <p className={`text-2xl font-bold ${isPositive ? "text-success" : "text-danger"}`}>
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
                {stock.changePercent.toFixed(2)}%)
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Volume</p>
              <p className="text-2xl font-bold text-foreground">
                {(stock.volume / 1000000).toFixed(2)}M
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="text-2xl font-bold text-foreground">${stock.marketCap}</p>
            </div>
          </div>
        </Card>

        {/* Historical Chart */}
        <Card className="p-6 mb-6 border-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Historical Price
            </h2>
            <div className="flex gap-2">
              {TIMEFRAMES.map((tf) => (
                <Button
                  key={tf.value}
                  variant={timeframe === tf.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf.value)}
                  className="min-w-[60px]"
                >
                  {tf.label}
                </Button>
              ))}
            </div>
          </div>
          <PriceChart data={historicalData} />
        </Card>

        {/* Prediction Section */}
        <Card className="p-6 border-2">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-secondary" />
            AI Price Predictions
          </h2>

          <Tabs value={predictionHorizon} onValueChange={setPredictionHorizon} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              {PREDICTION_HORIZONS.map((horizon) => (
                <TabsTrigger key={horizon.value} value={horizon.value} className="text-sm">
                  {horizon.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {PREDICTION_HORIZONS.map((horizon) => (
              <TabsContent key={horizon.value} value={horizon.value}>
                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Prediction for {horizonLabel}
                  </p>
                  {predictionData.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Predicted Price</p>
                        <p className="text-2xl font-bold text-primary">
                          ${predictionData[predictionData.length - 1].predicted.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lower Bound</p>
                        <p className="text-xl font-semibold text-foreground">
                          ${predictionData[predictionData.length - 1].confidenceLow.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Upper Bound</p>
                        <p className="text-xl font-semibold text-foreground">
                          ${predictionData[predictionData.length - 1].confidenceHigh.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <PredictionChart data={predictionData} />
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                  <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> These predictions are generated using machine learning
                    models and should not be considered financial advice. Always conduct your own
                    research before making investment decisions.
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default StockDetail;
