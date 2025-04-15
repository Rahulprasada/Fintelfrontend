import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ChartSeries } from "../../components/ui/ChartData";
import ChartTooltip from "../../components/ui/ChartToolTip";
import ChartLegend from "../../components/ui/ChartLegend";

interface LineChartProps {
  data: ChartSeries[];
  title?: string;
  subtitle?: string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title = "Line Chart",
  subtitle = "Data visualization",
  height = 400,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const allDates = data
    .flatMap((series) => series.data.map((point) => point.date))
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const chartData = allDates.map((date) => {
    const dataPoint: Record<string, any> = { date };
    data.forEach((series) => {
      const point = series.data.find((p) => p.date === date);
      if (point) {
        dataPoint[series.name] = point.value;
      }
    });
    return dataPoint;
  });

  return (
    <div
      className="w-full rounded-xl p-4 md:p-6"
      style={{
        marginTop: "20px",
        background: "linear-gradient(to right, #e0f7ff, #ffffff)",
      }}
    >
      {/* {title && <h2 className="text-lg md:text-xl font-semibold mb-1">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>} */}

      <div style={{ width: "100%", height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
          >
            <defs>
              {data.map((series) => (
                <linearGradient
                  key={`gradient-${series.name}`}
                  id={`color-${series.name}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={series.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={series.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#888" }}
              tickFormatter={formatXAxis}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#888" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={{ stroke: "#e5e7eb" }}
              width={40}
            />
            <Tooltip
              content={<ChartTooltip series={data} />}
              cursor={{
                stroke: "#d1d5db",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
            />
            {data.map((series, index) => (
              <Line
                key={series.name}
                type="monotone"
                dataKey={series.name}
                stroke={series.color}
                strokeWidth={
                  activeIndex === null || activeIndex === index ? 3 : 1.5
                }
                dot={false}
                activeDot={{
                  r: 6,
                  stroke: "white",
                  strokeWidth: 2,
                  fill: series.color,
                }}
                fill={`url(#color-${series.name})`}
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                animationDuration={1000}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      <ChartLegend
        series={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
};

export default LineChart;
