import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const MarcoHeading = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1Y");

  const countries = ["India", "USA", "China", "EU", "Japan"];
  const timeframes = ["1M", "3M", "6M", "1Y", "3Y", "5Y"];
  return (
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-purple-600/10 rounded-lg" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Macro & Market Intelligence</h1>
          <p className="text-muted-foreground max-w-3xl mt-2">
            Integrate macroeconomic context into your investment process
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedTimeframe}
            onValueChange={setSelectedTimeframe}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe} value={timeframe}>
                  {timeframe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MarcoHeading;
