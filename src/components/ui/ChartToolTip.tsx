import React from 'react';
import { DataPoint, ChartSeries } from './ChartData';

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string; payload: DataPoint }>;
  label?: string;
  series: ChartSeries[];
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, series }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-md border border-gray-100 max-w-xs w-56 animate-fade-in">
      <p className="text-sm font-medium text-gray-600 mb-2">{formatDate(label || '')}</p>
      <div className="space-y-2">
        {payload.map((entry, index) => {
          const seriesName = series.find(s => 
            s.data.some(d => d.date === label && d.value === entry.value))?.name || '';
          
          return (
            <div key={`item-${index}`} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm font-medium text-gray-800">{seriesName}</span>
              </div>
              <span className="text-sm font-semibold">{entry.value.toFixed(2)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTooltip;