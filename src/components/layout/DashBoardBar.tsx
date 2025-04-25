import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Badge, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { BarChart3 } from "lucide-react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { ProfileDialogBox } from "../ui/ProfileDialogBox";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { DashboardSections } from "./NavConfig";

const drawerWidth = 320;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [expandedSection, setExpandedSection] = React.useState("");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

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

  const heading =
  DashboardSections.find((section) =>
    section.items.some((item) =>
      item.link === location.pathname))?.heading || "Dashboard";

  const isSectionActive = (items) => {
    return items.some((item) => location.pathname === item.link);
  };

  React.useEffect(() => {
    if (isSectionActive(DashboardSections)) {
      setExpandedSection("researchhub");
    } else if (isSectionActive(DashboardSections)) {
      setExpandedSection("quantengine");
    } else if (isSectionActive(DashboardSections)) {
      setExpandedSection("macromarketintelligence");
    } else if (isSectionActive(DashboardSections)) {
      setExpandedSection("esgintelligence");
    } else if (isSectionActive(DashboardSections)) {
      setExpandedSection("forensicreports");
    } else if (isSectionActive(DashboardSections)) {
      setExpandedSection("portfolioworkspace");
    } else if (isSectionActive(DashboardSections)) {
      setExpandedSection("toolssettings");
    }
  }, [location.pathname]);

  const drawer = (
    <div className="flex flex-col h-full">
      <Toolbar>
        <DrawerHeader>
          <BarChart3 className="h-8 w-8 text-finance-blue dark:text-white" />
          <LogoText>FinIntel</LogoText>
        </DrawerHeader>
      </Toolbar>

      <ScrollableContent>
        <List style={{ margin: "10px", padding: "0px 0px 0px 0px" }}>
          <SectionBox>
            <SectionHeader1
              className={location.pathname === "/dashboard" ? "active-1" : ""}
              onClick={() => navigate("/dashboard")}
            >
              <DashboardIcon style={{ fontSize: "18px", color: "#291699" }} />
              <SectionTitle1>Dashboard</SectionTitle1>
            </SectionHeader1>
          </SectionBox>
        </List>
        <List style={{ margin: "10px", padding: "0px" }}>
          {DashboardSections.map((section, sectionIndex) => (
            <SectionBox key={sectionIndex}>
              <SectionHeader
                onClick={() => toggleSection(section.heading)}
                className={
                  isSectionActive(section.items) ? "active-section" : ""
                }
              >
                <SectionTitle>{section.heading}</SectionTitle>
                {expandedSection === section.heading ? (
                  <KeyboardArrowUpIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
              </SectionHeader>

              <Collapse
                in={expandedSection === section.heading}
                timeout="auto"
                unmountOnExit
              >
                {section.items.map((item, itemIndex) => {
                  const isActive = location.pathname === item.link;
                  return (
                    <ListItem key={itemIndex} disablePadding>
                      <NavItemBox isActive={isActive}>
                        <ListItemButton
                          onClick={() => handleNavigation(item.link)}
                        >
                          <ListItemIcon
                            className="icon text-[#131212]"
                            sx={{ minWidth: "30px" }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText primary={item.Title} />
                        </ListItemButton>
                      </NavItemBox>
                    </ListItem>
                  );
                })}
              </Collapse>
            </SectionBox>
          ))}
        </List>
      </ScrollableContent>
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
          <IconBox>
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{marginRight:"20px"}}
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon style={{color:"#281c6d"}}/>
              </Badge>
            </IconButton>
          <StyledAvatar onClick={handleClickOpen}>V</StyledAvatar>
          <ProfileDialogBox
            open={open}
            setOpen={setOpen}
            onClose={handleClose}
          />
          </IconBox>
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
          backgroundColor: "#f5fafa",
          minHeight: "100vh", 
          overflowY: "auto",   
        }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
  );
}
const SectionHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  padding: "8px 4px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  borderRadius: "4px",
  "&.active-section": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});
const SectionHeader1 = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  cursor: "pointer",
  padding: "6px 4px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  "&.active-1": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  borderRadius: "4px",
});
const DrawerHeader = styled(Box)`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 10;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 18px 20px 10px 10px;
  /* box-shadow: 0 4px 6px -6px rgba(0, 0, 0, 0.1); */
`;
const ScrollableContent = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding-top: 10px;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: #281c6d;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #1a1357;
  }

  scrollbar-width: thin;
  scrollbar-color: #281c6d #fff;
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
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SectionTitle = styled(Typography)`
  color: #281c6d;
  font-size: 14px;
  font-weight: 600;
  padding: 5px;
`;

const SectionTitle1 = styled(Typography)`
  color: #291699;
  font-size: 16px;
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

const AppBarTitle = styled(Typography)(({ theme }) => ({
  color: "#1b0b38",
  fontWeight: 700,
  fontSize: "20px",
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const StyledAvatar = styled(Avatar)`
  background-color: #281c6d;
  cursor: pointer;
`;

const IconBox = styled(Box)`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
`;