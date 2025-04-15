import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@mui/material";

interface RiskMetric {
  name: string;
  value: number;
  max: number;
}

const riskMetrics: RiskMetric[] = [
  { name: "Market Risk", value: 65, max: 100 },
  { name: "Volatility", value: 48, max: 100 },
  { name: "Economic Sensitivity", value: 72, max: 100 },
  { name: "Liquidity Risk", value: 25, max: 100 },
];

const RiskAssessment = () => {
  return (
    <Card sx={{height:"360px"}}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-semibold">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {riskMetrics.map((metric) => {
            const percentage = (metric.value / metric.max) * 100;
            const barColor =
              metric.value > 70
                ? "bg-red-500"
                : metric.value > 40
                ? "bg-yellow-500"
                : "bg-green-500";

            return (
              <div key={metric.name} className="space-y-3 text-gray-500">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{metric.name}</span>
                  <span className="text-sm font-medium">
                    {metric.value}/{metric.max}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
