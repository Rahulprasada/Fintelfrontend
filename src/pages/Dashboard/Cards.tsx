import { Card, styled, Box, Typography, useTheme } from '@mui/material';
import LineChart from './Chart';
import { chartData } from '../../components/ui/ChartData';

const Model = [
  { Title: "Model Confidence", percentage: "87%" },
  { Title: "Signals Analyzed", percentage: "26,543" },
  { Title: "Last Updated", percentage: "5m ago" }
];

const Cards = () => {
  const theme = useTheme();

  return (
    <MainCard>
      <ResponsiveGrid>
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
      </ResponsiveGrid>

      <Box sx={{ width: '100%', mt: 3 }}>
        <LineChart data={chartData} height={300} />
      </Box>
    </MainCard>
  );
};

export default Cards;

// Styled Components
const MainCard = styled(Card)(({ theme }) => ({
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: '100%',
}));

const ResponsiveGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  width: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const CardBox = styled(Box)(({ theme }) => ({
  padding: 16,
  backgroundColor: '#f7f7f8',
  color: '#3a3a3b',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
}));
