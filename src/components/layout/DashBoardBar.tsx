import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BarChart3 } from "lucide-react";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Avatar from "@mui/material/Avatar";
import { ProfileDialogBox } from "../ui/ProfileDialogBox";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const drawerWidth = 300;

interface Props {
  window?: () => Window;
}

const DashboardTitle = [
  { Title: "Buffet Value Stocks", link: "/dashboard/buffet-value-stocks", icon: <ShowChartIcon /> },
  { Title: "AI Growth Prediction", link: "/dashboard/ai-growth-prediction", icon: <TrendingUpIcon /> },
  { Title: "Defensive Portfolio", link: "/dashboard/defensive-portfolio", icon: <ShieldIcon /> },
  { Title: "Momentum Leaders", link: "/dashboard/momentum-leaders", icon: <SpeedIcon /> },
];
const routeHeadings = {
  "/dashboard/ai-growth-prediction": "AI Growth Prediction",
  "/dashboard": "Dashboard",
  "/dashboard/buffet-value-stocks":"Buffet Value Stocks",
  "/dashboard/defensive-portfolio" : "Defensive Portfolio",
  "/dashboard/momentum-leaders":"Momentum Leaders"
};
export default function ResponsiveDrawer(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(!mobileOpen);
  };
  const heading = routeHeadings[location.pathname] || "Dashboard";
  const drawer = (
    <div>
      <Toolbar>
        <DrawerHeader>
          <BarChart3 className="h-8 w-8 text-finance-blue dark:text-white" />
          <LogoText>FinIntel</LogoText>
        </DrawerHeader>
      </Toolbar>
      {/* <Divider /> */}
      <List style={{ margin: "10px" }}>
        <SectionBox>
          <SectionTitle>AI Screener</SectionTitle>
          {DashboardTitle.map((text, index) => {
             const isActive = location.pathname === text.link;
             return (
            <ListItem key={index} disablePadding>
              <NavItemBox isActive={isActive}>
                <ListItemButton  onClick={() => handleNavigation(text.link)}>
                  <ListItemIcon
                    className="icon text-[#131212]"
                    sx={{ minWidth: "30px" }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.Title} />
                </ListItemButton>
              </NavItemBox>
            </ListItem>
          )})}
        </SectionBox>
      </List>

      <List style={{ margin: "10px" }}>
        <SectionBox sx={{ color: "#666668", fontSize: "14px" }}>
          <SectionTitle>Recent Activity</SectionTitle>
          {[
            "Unusual volume in tech sector",
            "New hedge fund 13f filings",
            "Smart money flow alert",
            "Portifolio risk analysis",
          ].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <FiberManualRecordIcon
                    style={{ color: "#4d34d6", fontSize: "16px" }}
                  />
                </ListItemIcon>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{ fontSize: "14px" }}
                  />
                  <ActivityTime>02h ago</ActivityTime>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </SectionBox>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderRight: "#ece6e6)",
          boxShadow: "1px 0 6px rgba(179, 175, 175, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{ color: "#160d35" }} />
          </IconButton>
          <AppBarTitle>{heading}</AppBarTitle>
          <StyledAvatar onClick={handleClickOpen}>V</StyledAvatar>
          <ProfileDialogBox
            open={open}
            setOpen={setOpen}
            onClose={handleClose}
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid #ffffff !important",
              boxShadow: "2px 0 6px rgba(0, 0, 0, 0.1)",
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: "1px solid #ffffff !important",
              boxShadow: "1px 0 6px rgba(179, 175, 175, 0.1)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

const DrawerHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 18px 20px 10px 10px;
`;

const LogoText = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  color: #281c6d;
`;

const SectionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: #f7f7f8;
  padding: 8px;
  border-radius: 10px;
`;

const SectionTitle = styled(Typography)`
  color: #291699;
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
`;

const NavItemBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>`
  width: 100%;
  background-color: ${({ isActive }) => (isActive ? "#281c6d" : "#fff")};
  padding: 0px;
  border-radius: 6px;
  margin: 5px;
  color: ${({ isActive }) => (isActive ? "#fff" : "#281c6d")};
  transition: 0.3s;

  &:hover {
    background-color: #281c6d;
    color: #fff;
  }

  &:hover .icon {
    color: #fff;
  }

  .icon {
    color: ${({ isActive }) => (isActive ? "#fff" : "#131212")};
  }
`;

const ActivityTime = styled(Typography)`
  color: #c2c2c5;
  font-size: 12px;
`;

const AppBarTitle = styled(Typography)`
  color: #1b0b38;
  font-weight: 700;
  font-size: 20px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: #281c6d;
  cursor: pointer;
`;
