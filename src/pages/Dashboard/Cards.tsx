import { Card, styled, Box, Typography } from '@mui/material';
import LineChart from './Chart';
import { chartData } from '../../components/ui/ChartData';

const Model = [
  { Title: "Model Confidence", percentage: "87%" },
  { Title: "Signals Analyzed", percentage: "26,543" },
  { Title: "Last Updated", percentage: "5m ago" }
];

const Cards = () => {
  return (
    <MainCard>
      <Typography sx={{ color: "#1e134e", fontSize: "22px", fontWeight: "700", mb: 2 }}>
        AI Growth Prediction Model
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} width="100%">
        {Model.map((item, index) => (
          <CardBox key={index}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "14px", color: "#726d6d" }}>
              {item.Title}
            </Typography>
            <Typography variant="h6" sx={{ color: "#1e134e", fontWeight: "bold" }}>
              {item.percentage}
            </Typography>
          </CardBox>
        ))}
      </Box>
      <LineChart
       data={chartData} 
       height={300} />
    </MainCard>
  );
};

export default Cards;

// Styled Components
const MainCard = styled(Card)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const CardBox = styled(Box)`
  padding: 16px;
  background-color: #f7f7f8;
  color: #3a3a3b;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;
