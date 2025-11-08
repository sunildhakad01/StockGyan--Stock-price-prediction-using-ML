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
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.05} />
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
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                predicted: "Predicted",
                confidenceLow: "Lower Bound",
                confidenceHigh: "Upper Bound",
              };
              return [`$${value.toFixed(2)}`, labels[name] || name];
            }}
          />
          <Area
            type="monotone"
            dataKey="confidenceHigh"
            stroke="none"
            fill="url(#colorConfidence)"
          />
          <Area
            type="monotone"
            dataKey="confidenceLow"
            stroke="none"
            fill="url(#colorConfidence)"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
