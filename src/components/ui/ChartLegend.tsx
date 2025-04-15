import React from 'react';
import { ChartSeries } from './ChartData';

interface ChartLegendProps {
  series: ChartSeries[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const ChartLegend: React.FC<ChartLegendProps> = ({ 
  series, 
  activeIndex, 
  setActiveIndex 
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
      {series.map((item, index) => (
        <div 
          key={item.name}
          className={`flex items-center cursor-pointer transition-opacity duration-300 px-3 py-1.5 rounded-full ${
            activeIndex === null || activeIndex === index 
              ? 'opacity-100' 
              : 'opacity-40'
          }`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;