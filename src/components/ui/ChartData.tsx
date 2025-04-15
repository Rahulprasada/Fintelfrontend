export type DataPoint = {
    date: string;
    value: number;
  };
  
  export type ChartSeries = {
    name: string;
    color: string;
    data: DataPoint[];
  };
  
  // Generate sample data for the chart
  const generateDates = (days: number): string[] => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };
  
  const generateRandomData = (dates: string[], base: number, volatility: number): DataPoint[] => {
    let value = base;
    return dates.map(date => {
      // Create a slight trend with some randomness
      const change = (Math.random() - 0.5) * volatility;
      value = Math.max(0, value + change);
      return { date, value: parseFloat(value.toFixed(2)) };
    });
  };
  
  const dates = generateDates(30);
  
  export const chartData: ChartSeries[] = [
    {
      name: "Product A",
      color: "#9b87f5",
      data: generateRandomData(dates, 100, 15)
    },
    {
      name: "Product B",
      color: "#0EA5E9",
      data: generateRandomData(dates, 80, 10)
    },
    {
      name: "Product C",
      color: "#F97316",
      data: generateRandomData(dates, 60, 8)
    }
  ];