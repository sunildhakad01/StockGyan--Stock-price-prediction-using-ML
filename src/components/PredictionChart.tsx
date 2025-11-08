import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { PredictionData } from "@/data/stocks";

interface PredictionChartProps {
  data: PredictionData[];
}

export const PredictionChart = ({ data }: PredictionChartProps) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(210 100% 40%)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="hsl(210 100% 40%)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(195 80% 45%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(195 80% 45%)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--foreground))"
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          />
          <YAxis
            stroke="hsl(var(--foreground))"
            domain={["dataMin - 5", "dataMax + 5"]}
            tickFormatter={(value) => `₹${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "2px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                predicted: "Predicted",
                confidenceLow: "Lower Bound",
                confidenceHigh: "Upper Bound",
              };
              return [`₹${value.toFixed(2)}`, labels[name] || name];
            }}
          />
          <Area
            type="monotone"
            dataKey="confidenceHigh"
            stroke="hsl(195 80% 45%)"
            strokeWidth={2}
            fill="url(#colorConfidence)"
          />
          <Area
            type="monotone"
            dataKey="confidenceLow"
            stroke="hsl(195 80% 45%)"
            strokeWidth={2}
            fill="url(#colorConfidence)"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="hsl(210 100% 40%)"
            strokeWidth={4}
            dot={{ fill: "hsl(210 100% 40%)", r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
