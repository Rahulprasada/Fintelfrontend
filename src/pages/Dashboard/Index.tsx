import React from 'react';
import Cards from './Cards';
import TopGrowthPredictions from './TopGrowthPrediction';
import RiskAssessment from './RiskAssessment';

const DashBoard = () => {
  return (
    <div>
      <Cards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <TopGrowthPredictions />
        </div>
        <div>
          <RiskAssessment />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;