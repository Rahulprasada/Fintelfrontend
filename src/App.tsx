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
import InvestmentAgentLab from "./pages/InvestmentAgentLab/Index";
import ValuationModel from "./pages/ValuationModels/Index";
import BusinessPromoterAnalysis from "./pages/BussinessPromotersAnalysis/Index";
import SignalGenerator from "./pages/SignalGenerator/SignalGenerator";
import PositionSizing from "./pages/PositionSizing/Index";
import BackTestingOptimization from "./pages/BackTestingOptimization/Index";
import AlgorithmExecution from "./pages/AlgorithmExcecution/Index";
import MarcoDashboard from "./pages/MarcoDashboard/Index";
import BusinessCycleView from "./pages/BusinessCycleView/Index";
import FiiSmartMoneyTracker from "./pages/FiiSmartMoneyTracker/Index";
import BenchMarking from "./pages/BenchMarking";
import Sustainability from "./pages/Sustainability/Index";
import GreenWashingDetectionFlag from "./pages/GreenWashingDetectionFlags/Index";
import LeaderShipIntegrityReport from "./pages/LeaderShipInegrityReport/Index";
import InsiderRelatedPartyActivity from "./pages/InsiderRelatedPartyActivity/Index";
import GovernanceRedFlagIndex from "./pages/GovernanceRedFlagIndex/Index";
import WatchListCoverageTrackers from "./pages/WatchListCoverageTrackers/Index";
import PMreviewApproval from "./pages/PMreviewApproval/Index";
import ResearchArchivingVersioning from "./pages/ResearchArchiveVersioning/Index";
import CommentFeedBackCenter from "./pages/CommentFeedBackCenter/Index";
import ReportBuilderSetting from "./pages/ReportBuilderSetting/Index";
import AlertManager from "./pages/AlertManager/Index";
import UserRolePermission from "./pages/UserRolePermission/Index";
import BrokerApiIntegration from "./pages/BrokerApiIntegration/Index";
import EquityResearchReport from "./pages/EquityResearchReport/Index";
import NewReportForm from "./pages/EquityResearchReport/NewReportForm";
import ReportEditor from "./pages/EquityResearchReport/ReportEditor";

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
            <Route path="equity-research-report">
              <Route index element={<EquityResearchReport />} />
              <Route path="newreport" element={<NewReportForm />} />
              <Route path="equity-research-report/:id" element={<ReportEditor />} />
            </Route>
            <Route path="investment-agent-lab" element={<InvestmentAgentLab />} />
            <Route path="valuation-models" element={<ValuationModel />} />
            <Route
              path="business-promoter-analysis"
              element={<BusinessPromoterAnalysis />}
            />
            <Route path="signal-generator" element={<SignalGenerator />} />
            <Route path="position-sizing" element={<PositionSizing />} />
            <Route
              path="backtesting-optimization"
              element={<BackTestingOptimization />}
            />
            <Route
              path="algorithmic-execution"
              element={<AlgorithmExecution />}
            />
            <Route path="macro-dashboard" element={<MarcoDashboard />} />
            <Route path="business-cycle-view" element={<BusinessCycleView />} />
            <Route
              path="fii-smart-money-tracker"
              element={<FiiSmartMoneyTracker />}
            />
            <Route path="peer-esg-benchmarking" element={<BenchMarking />} />
            <Route
              path="leadership-integrity-reports"
              element={<LeaderShipIntegrityReport />}
            />
            <Route
              path="insider-related-party-activity"
              element={<InsiderRelatedPartyActivity />}
            />
            <Route
              path="governance-red-flag-index"
              element={<GovernanceRedFlagIndex />}
            />
            <Route
              path="watchlists-coverage-tracker"
              element={<WatchListCoverageTrackers />}
            />
            <Route path="pm-review-approvals" element={<PMreviewApproval />} />
            <Route
              path="research-archive-versioning"
              element={<ResearchArchivingVersioning />}
            />
            <Route
              path="comments-feedback-center"
              element={<CommentFeedBackCenter />}
            />
            <Route
              path="report-builder-settings"
              element={<ReportBuilderSetting />}
            />
            <Route path="alert-manager" element={<AlertManager />} />
            <Route
              path="user-roles-permissions"
              element={<UserRolePermission />}
            />
            <Route
              path="broker-api-integrations"
              element={<BrokerApiIntegration />}
            />
            <Route
              path="esg-sustainability-analytics"
              element={<Sustainability />}
            />
            <Route
              path="greenwashing-detection-flags"
              element={<GreenWashingDetectionFlag />}
            />
            {/* Add more dashboard pages here */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
