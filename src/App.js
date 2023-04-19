import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Routes, Route, Link } from "react-router-dom";
// Icons

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TimelineIcon from '@mui/icons-material/Timeline';
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GroupsIcon from "@mui/icons-material/Groups";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import FeedIcon from '@mui/icons-material/Feed';
import DifferenceIcon from '@mui/icons-material/Difference';

import LDSCCellPage from "./containers/LDSCCellPage";
import './App.css';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),

  backgroundColor: "#403d56",
}));



const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));




export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [proj, setProj] = React.useState("Genome");
  const sideMenu = [
    {
      name: "CellAnalysis",
      icon: <TimelineIcon fontSize="large" />,
    },

    // {
    //   name: "Cohorts",
    //   icon: <GroupsIcon fontSize="large" />,
    // },

    // {
    //   name: "Covarients",
    //   icon: <PsychologyAltIcon fontSize="large" />,
    // },
    // {
    //   name: "CohortDetails",
    //   icon: <FeedIcon fontSize="large" />,
    // },
    // {
    //   name: "FindCohortCovariates",
    //   icon: <DifferenceIcon fontSize="large" />,
    // }
  ];

  const ListItem = styled(MuiListItem)({
    boxSizing: "border-box",
    "& .Mui-selected": {
      borderLeft: "5px solid #50CB86",
      backgroundColor: "transparent",
    },
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  component="div">
            <div className="d-flex justify-content-between">
            {proj}

            <div className="text-center">
{/* <img src={brain} className="App-logo" alt="brain" /> */}
            </div>
            
            </div>


          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideMenu.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link
                to={"/" + item.name}
                style={{ textDecoration: "none", color: "grey" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 3.5,
                  }}
                  selected={selected === index}
                  onClick={() => {
                    setSelected(index);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>


      


      <Box component="main" sx={{ flexGrow: 1, p: 3, pr: 0, height: "100vh" }}>
        <DrawerHeader />
        <Routes>
          <Route path="/CellAnalysis" Component={LDSCCellPage} />
          {/* <Route path="/Projects" Component={LDSCCellPage} />
          <Route path="/Cohorts" Component={LDSCCellPage} />
          <Route path="/Covarients" Component={LDSCCellPage} />
          <Route path="/CohortDetails" Component={LDSCCellPage} />
          <Route path="/FindCohortCovariates" Component={LDSCCellPage} /> */}
        </Routes>
      </Box>
    </Box>
  );
}

