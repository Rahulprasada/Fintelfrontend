import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InvestmentReports from "./pages/InvestmentReports";
import ResearchPlatform from "./pages/ResearchPlatform";
import AdvisoryServices from "./pages/AdvisoryServices";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Legal from "./pages/Legal";
import About from "./pages/About";
import Career from "./pages/Career";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResponsiveDrawer from "./components/layout/DashBoardBar";
import DashBoard from "./pages/Dashboard/Index";
import BufferStocks from "./pages/BufferStock/Index";
import DefensivePortifolio from "./pages/DefensivePortfolio/Index";
import Momentum from "./pages/Momentum/Index";
import PriceTrends from "./pages/PriceTrends/Index";
import VolumeAnalysis from "./pages/VolumeAnalysis/Index";
import GDPGrowth from "./pages/GDPGrowth/Index";
import MovingAverage from "./pages/MovingAverages/Index";
import InterestRate from "./pages/IntrestRate/Index";
import InflationData from "./pages/InflationData/Index";
import EarningReport from "./pages/EarningReports/Index";
import BalanceSheet from "./pages/BalanceSheet/Index";
import CashFlowStateMent from "./pages/CashFlowStatement/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/investment-reports" element={<InvestmentReports />} />
          <Route path="/research-platform" element={<ResearchPlatform />} />
          <Route path="/advisory-services" element={<AdvisoryServices />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/community" element={<Community />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ResponsiveDrawer />}>
            <Route index element={<DashBoard />} />
            <Route path="buffet-value-stocks" element={<BufferStocks />} />
            <Route path="defensive-portfolio" element={<DefensivePortifolio />} />
            <Route path="momentum-leaders" element={<Momentum />} />
            <Route path="price-trends" element={<PriceTrends />} />
            <Route path="volume" element={<VolumeAnalysis />} />
            <Route path="gdp" element={<GDPGrowth />} />
            <Route path="moving-averages" element={<MovingAverage />} />
            <Route path="interest-rates" element={<InterestRate />} />
            <Route path="inflation" element={<InflationData />} />
            <Route path="earnings" element={<EarningReport />} />
            <Route path="balance" element={<BalanceSheet />} />
            <Route path="cashflow" element={<CashFlowStateMent />} />
            {/* Add more dashboard pages here */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
