import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { HistoricalDataPoint } from "@/data/stocks";

interface PriceChartProps {
  data: HistoricalDataPoint[];
  showVolume?: boolean;
}

export const PriceChart = ({ data, showVolume = false }: PriceChartProps) => {
  const isPositive = data.length > 1 && data[data.length - 1].close > data[0].close;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--danger))"}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--danger))"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            domain={["dataMin - 5", "dataMax + 5"]}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "2px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Close"]}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--danger))"}
            strokeWidth={3}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
