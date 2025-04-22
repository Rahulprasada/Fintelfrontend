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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { ProfileDialogBox } from "../ui/ProfileDialogBox";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  DashboardTitle,
  DashboardTitle1,
  DashboardTitle2,
  DashboardTitle3,
  DashboardTitle4,
  DashboardTitle5,
  DashboardTitle6,
} from "./NavConfig";

const drawerWidth = 320;

interface Props {
  window?: () => Window;
}

const routeHeadings = [
  ...DashboardTitle,
  ...DashboardTitle1,
  ...DashboardTitle2,
  ...DashboardTitle3,
  ...DashboardTitle4,
  ...DashboardTitle5,
  ...DashboardTitle6,
];

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

  const heading = routeHeadings.find(i => i.link === location.pathname)?.Title;


  const isSectionActive = (items) => {
    return items.some((item) => location.pathname === item.link);
  };

  React.useEffect(() => {
    if (isSectionActive(DashboardTitle)) {
      setExpandedSection("researchhub");
    } else if (isSectionActive(DashboardTitle1)) {
      setExpandedSection("quantengine");
    } else if (isSectionActive(DashboardTitle2)) {
      setExpandedSection("macromarketintelligence");
    } else if (isSectionActive(DashboardTitle3)) {
      setExpandedSection("esgintelligence");
    } else if (isSectionActive(DashboardTitle4)) {
      setExpandedSection("forensicreports");
    } else if (isSectionActive(DashboardTitle5)) {
      setExpandedSection("portfolioworkspace");
    } else if (isSectionActive(DashboardTitle6)) {
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
            <SectionHeader onClick={() => toggleSection("researchhub")}>
              <SectionTitle>Research Hub</SectionTitle>
              {expandedSection === "researchhub" ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </SectionHeader>

            <Collapse
              in={expandedSection === "researchhub"}
              timeout="auto"
              unmountOnExit
            >
              {DashboardTitle.map((text, index) => {
                const isActive = location.pathname === text.link;
                return (
                  <ListItem key={index} disablePadding>
                    <NavItemBox isActive={isActive}>
                      <ListItemButton
                        onClick={() => handleNavigation(text.link)}
                      >
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
                );
              })}
            </Collapse>
          </SectionBox>
        </List>
        <List style={{ margin: "10px", padding: "0px 0px 0px 0px" }}>
          <SectionBox>
            <SectionHeader onClick={() => toggleSection("quantengine")}>
              <SectionTitle>Quant Engine</SectionTitle>
              {expandedSection === "quantengine" ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </SectionHeader>

            <Collapse
              in={expandedSection === "quantengine"}
              timeout="auto"
              unmountOnExit
            >
              {DashboardTitle1.map((text, index) => {
                const isActive = location.pathname === text.link;
                return (
                  <ListItem key={index} disablePadding>
                    <NavItemBox isActive={isActive}>
                      <ListItemButton
                        onClick={() => handleNavigation(text.link)}
                      >
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
                );
              })}
            </Collapse>
          </SectionBox>
        </List>
        <List style={{ margin: "10px", padding: "0px 0px 0px 0px" }}>
          <SectionBox>
            <SectionHeader
              onClick={() => toggleSection("macromarketintelligence")}
            >
              <SectionTitle>Macro & Market Intelligence</SectionTitle>
              {expandedSection === "macromarketintelligence" ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </SectionHeader>

            <Collapse
              in={expandedSection === "macromarketintelligence"}
              timeout="auto"
              unmountOnExit
            >
              {DashboardTitle2.map((text, index) => {
                const isActive = location.pathname === text.link;
                return (
                  <ListItem key={index} disablePadding>
                    <NavItemBox isActive={isActive}>
                      <ListItemButton
                        onClick={() => handleNavigation(text.link)}
                      >
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
                );
              })}
            </Collapse>
          </SectionBox>
        </List>
        <List style={{ margin: "10px", padding: "0px 0px 0px 0px" }}>
          <SectionBox>
            <SectionHeader onClick={() => toggleSection("esgintelligence")}>
              <SectionTitle>ESG Intelligence</SectionTitle>
              {expandedSection === "esgintelligence" ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </SectionHeader>

            <Collapse
              in={expandedSection === "esgintelligence"}
              timeout="auto"
              unmountOnExit
            >
              {DashboardTitle3.map((text, index) => {
                const isActive = location.pathname === text.link;
                return (
                  <ListItem key={index} disablePadding>
                    <NavItemBox isActive={isActive}>
                      <ListItemButton
                        onClick={() => handleNavigation(text.link)}
                      >
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
                );
              })}
            </Collapse>
          </SectionBox>
        </List>
        <List style={{ margin: "10px", padding: "0px 0px 0px 0px" }}>
          <SectionBox>
            <SectionHeader onClick={() => toggleSection("forensicreports")}>
              <SectionTitle>Forensic Reports (Premium)</SectionTitle>
              {expandedSection === "forensicreports" ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </SectionHeader>

            <Collapse
              in={expandedSection === "forensicreports"}
              timeout="auto"
              unmountOnExit
            >
              {DashboardTitle4.map((text, index) => {
                const isActive = location.pathname === text.link;
                return (
                  <ListItem key={index} disablePadding>
                    <NavItemBox isActive={isActive}>
                      <ListItemButton
                        onClick={() => handleNavigation(text.link)}
                      >
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
                );
              })}
            </Collapse>
          </SectionBox>
        </List>
        <List style={{ margin: "10px", padding: "0px 0px 0px 0px" }}>
          <SectionBox>
            <SectionHeader onClick={() => toggleSection("portfolioworkspace")}>
              <SectionTitle>Portfolio Workspace</SectionTitle>
              {expandedSection === "portfolioworkspace" ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </SectionHeader>

            <Collapse
              in={expandedSection === "portfolioworkspace"}
              timeout="auto"
              unmountOnExit
            >
              {DashboardTitle5.map((text, index) => {
                const isActive = location.pathname === text.link;
                return (
                  <ListItem key={index} disablePadding>
                    <NavItemBox isActive={isActive}>
                      <ListItemButton
                        onClick={() => handleNavigation(text.link)}
                      >
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
                );
              })}
            </Collapse>
          </SectionBox>
        </List>
        <List style={{ margin: "10px", padding: "0px 0px 0px 0px" }}>
          <SectionBox>
            <SectionHeader onClick={() => toggleSection("toolssettings")}>
              <SectionTitle>Tools & Settings</SectionTitle>
              {expandedSection === "toolssettings" ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </SectionHeader>

            <Collapse
              in={expandedSection === "toolssettings"}
              timeout="auto"
              unmountOnExit
            >
              {DashboardTitle6.map((text, index) => {
                const isActive = location.pathname === text.link;
                return (
                  <ListItem key={index} disablePadding>
                    <NavItemBox isActive={isActive}>
                      <ListItemButton
                        onClick={() => handleNavigation(text.link)}
                      >
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
                );
              })}
            </Collapse>
          </SectionBox>
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

const AppBarTitle = styled(Typography)`
  color: #1b0b38;
  font-weight: 700;
  font-size: 20px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: #281c6d;
  cursor: pointer;
`;
