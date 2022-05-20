import React, { useState, useContext, useEffect } from "react";
import {
  Tabs,
  Tab,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  Button,ListItemIcon
} from "@mui/material";
import "../assets/custom/css/home.css";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import { Mode, Auth } from "../App";
import logo from '../assets/img/CBlogo.png'

// inner components
import Dashboard from "./Dashboard";
import UserPanel from "./UserPanel";

// icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GridViewIcon from "@mui/icons-material/GridView";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ForestIcon from '@mui/icons-material/Forest';
import FilterListIcon from '@mui/icons-material/FilterList';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ConstructionIcon from '@mui/icons-material/Construction';
import AdjustIcon from '@mui/icons-material/Adjust';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CollectionsIcon from '@mui/icons-material/Collections';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
const Home = () => {
  const [ShowTabs, setShowTabs] = useState(false);

  // context
  const viewMode = useContext(Mode);
  const userAuth = useContext(Auth);

  // states
  const [anchor, setAnchor] = useState(null);


  useEffect(() => {
    if(localStorage.getItem('isLogin') !== 'true')
    {
      window.location.href = '/'
    }
  }, []);

  const handleMenuClose = () => {
      setAnchor(null)
  }

  const handleMenu = (e) =>{
      setAnchor(e.currentTarget)
  }

  const handleClose = () => {
    setShowTabs(false);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        class="tabPanel"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
        {
          index !== 12 && localStorage.removeItem('SKU')
        }
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ flexGrow: 1, display: "flex", width: "100%" }}>
        {ShowTabs === true && (
          <Slide direction="right" in={ShowTabs} mountOnEnter unmountOnExit>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={ShowTabs}
              onClick={handleClose}
            >
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="Vertical tabs example"
                className={viewMode.mode === true ? "darkTabs2" : "tabs2"}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  ".MuiTabs-indicator": {
                    left: 0,
                    width: "5px",
                  },
                }}
              >
                <Tab
                  wrapped
                  label={
                    <Typography
                      align="center"
                      pt={3}
                      pb={3}
                      color="primary"
                      variant="h5"
                    >
                      Class Bazaar
                    </Typography>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  wrapped
                  icon={<AccountCircleIcon />}
                  label="User Panel"
                  {...a11yProps(1)}
                />
                <Tab
                  wrapped
                  icon={<GpsFixedIcon />}
                  label="User Tracking"
                  {...a11yProps(2)}
                />
               
                <Tab
                  wrapped
                  icon={<SettingsOutlinedIcon />}
                  label="Settings"
                  {...a11yProps(3)}
                />
                <Button
                  color="primary"
                  sx={{ margin: "auto" }}
                  startIcon={<LogoutIcon />}
                  variant="contained"
                >
                  Log Out
                </Button>
              </Tabs>
            </Backdrop>
          </Slide>
        )}
        <Tabs
          orientation="vertical"
          value={value}
          // variant="scrollable"
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="Vertical tabs example"
          className={viewMode.mode === true ? "darkTabs" : "tabs"}
          sx={{
            borderRight: 1,
            borderColor: "divider",
            ".MuiTabs-indicator": {
              left: 0,
              width: "5px",
            },
          }}
        >
          <Tab
            wrapped
            icon={<GridViewIcon />}
            label="Dashboard"
            {...a11yProps(0)}
          />
          <Tab
            wrapped
            icon={<AccountCircleIcon />}
            label="User Panel"
            {...a11yProps(1)}
          />
         <Tab
                  wrapped
                  icon={<GpsFixedIcon />}
                  label="User Tracking"
                  {...a11yProps(2)}
                />
                <Tab
                  wrapped
                  icon={<SettingsOutlinedIcon />}
                  label="Setting"
                  {...a11yProps(3)}
                />
                
        </Tabs>

        <TabPanel value={value} index={0}>
          <Dashboard />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <UserPanel />
        </TabPanel>
        
      </Box>
    );
  }

  function MenuBox () {

    return (

        <Menu
        id = {'menu'}
        anchorEl={anchor}
        keepMounted
        open = {Boolean(anchor)}
        onClose = {handleMenuClose}
        >
            <MenuItem onClick = {handleLogout}>
                <ListItemIcon>
                <LogoutIcon fontSize="small" />
                 </ListItemIcon>
                <ListItemIcon>
                Logout
                 </ListItemIcon>
            </MenuItem>
        </Menu>

    )

  }

  const handleLogout = () =>{
      localStorage.clear();
      window.location.href = '/';
  }
  

  return (
    <>
      {/* Top Bar  */}

      <Grid
        container
        p={1}
        spacing={2}
        className={viewMode.mode === true ? "darkNav" : "topNav"}
        sx={{ boxShadow: 1 }}
      >
        <Grid item xs={4} className = 'heading'>
          {ShowTabs === false ? (
            <IconButton
              className="hamIcon"
              onClick={() => {
                localStorage.setItem("mode", false);
                setShowTabs(true);
              }}
              size="small"
              color="primary"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              className="hamIcon"
              onClick={() => {
                localStorage.setItem("mode", true);
                setShowTabs(false);
              }}
              size="small"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          )}

            
          <Typography variant="h5" className = 'heading'>
            Class Bazaar</Typography>
        </Grid>

        <Grid item xs={4}>
         <div className = 'logoContainer'>
         <img src = {logo} alt = 'CBlogo' />
         </div>
        </Grid>

        <Grid item sx={{ display: "flex", justifyContent: "end" }} xs={4}>
          {viewMode.mode === true ? (
            <IconButton
              onClick={() => {
                viewMode.setMode(false);
              }}
              size="small"
              color="primary"
            >
              <WbSunnyIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                viewMode.setMode(true);
              }}
              size="small"
              color="primary"
            >
              <DarkModeIcon />
            </IconButton>
          )}

          <IconButton size="small" color="primary">
            <NotificationsIcon />
          </IconButton>

          {MenuBox()}

          <IconButton onClick = {handleMenu} size="small" color="primary">
            <PersonIcon />
          </IconButton>
        </Grid>
      </Grid>
      {/* Top Bar Ends */}

      {/* Sidenav  */}
      {VerticalTabs()}
      {/* Sidenav Ends  */}
    </>
  );
};

export default Home;
