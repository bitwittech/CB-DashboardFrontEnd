import React, { useEffect, useState } from "react";
import { Typography, Grid, IconButton, Box, TextField, Button, LinearProgress } from "@mui/material";
import "../assets/custom/css/dashboard.css";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ErrorIcon from '@mui/icons-material/Error';
import TrafficIcon from '@mui/icons-material/Traffic';
import RouteIcon from '@mui/icons-material/Route';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
// data grid 
import { DataGrid } from "@mui/x-data-grid";
import { siteReport, miniReport } from "../services/service";

// date filter plugin 
import { DateRangePicker, } from "mui-daterange-picker";


const Dashboard = () => {

  // state 
  const [openDateRange, setOpenDateRange] = useState(false);
  const [miniReports, setMiniReport] = useState(
    {
      anonymous : 0, 
      cardCount : 0,
      enrollCount : 0,
      logged : 0,
      totalCardCount : 0,
      totalEnrollCount : 0,
 }
  );

  // states
  const [state, setState] = useState({})
  const [search, setSearch] = useState({
    startDate: undefined,
    endDate: undefined
  })


  // unconditional use effect 
  useEffect(() => {

    siteReport()
      .then((data) => {

        setState(data.data)

        // console.log(data)

      })

  }, [])

  // useEffect for search changes

  useEffect(()=>{
    
    miniReport(JSON.stringify(search))
    .then((response)=>{
       console.log(response.data)
       setMiniReport(response.data)
       
    })
    .catch((err)=>{
      console.log(err)
    })

  },[search.startDate,search.endDate])



  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    );
  }

  // date picker from third party 
  const DatePicker = props => {

    const toggle = () => setOpenDateRange(!openDateRange);

    return (
      <Box sx={{
        position: 'absolute'
      }}>
        <br></br>
        <DateRangePicker
          open={openDateRange}
          toggle={toggle}
          onChange={(range) => setSearch({ 
             startDate: range.startDate,
             showStartDate: range.startDate.toDateString(),
             endDate: range.endDate,
             showEndDate: range.endDate.toDateString() 
            })}
        />
      </Box>
    );
  }


  return (
    <>
      {/* Dashboard Overview */}
      {/* {console.log(search)} */}

      <Typography sx={{ display: "block" }} variant="h5">
        Dashboard Overview
      </Typography>

      <br></br>

      <Grid container sx={{ mb: 5 }} className="overviewContainer" spacing={1}>
        <Grid
          item
          xs={12}
          md={3.8}
          sx={{ boxShadow: 2, backgroundColor: "#0694a2" }}
          className="overviewBoard"
        >

          <IconButton size="large" aria-label="delete">
            <TodayIcon style={{ color: "white" }} />
          </IconButton>

          <Typography color="white" variant="h6">
            Today Login
          </Typography>

          <Typography color="white" variant="h3">
            {state.todayLog}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={3.8}
          sx={{ boxShadow: 2, backgroundColor: "#3f83f8" }}
          className="overviewBoard"
        >
          <IconButton size="large" aria-label="delete">
            <CalendarMonthIcon style={{ color: "white" }} />
          </IconButton>

          <Typography color="white" variant="h6">
            Month Login
          </Typography>

          <Typography color="white" variant="h3">
            {state.monthLog}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={3.8}
          sx={{ boxShadow: 2, backgroundColor: "#0e9f6e" }}
          className="overviewBoard"
        >
          <IconButton size="large" aria-label="delete">
            <EventAvailableIcon style={{ color: "white" }} />
          </IconButton>

          <Typography color="white" variant="h6">
            Year Login
          </Typography>

          <Typography color="white" variant="h3">
            {state.yearLog}
          </Typography>
        </Grid>
      </Grid>


      <Grid container sx={{ mb: 7 }} className="overviewContainer" spacing={1}>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item5">
            <ErrorIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Anonymous User
            </Typography>
            <Typography align="center" variant="h5">
              {state.anonymous}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item6">
            <TrafficIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Today Traffic
            </Typography>
            <Typography align="center" variant="h5">
              {state.todayTraffic}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item7">
            <RouteIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Month Traffic
            </Typography>
            <Typography align="center" variant="h5">
              {state.monthTraffic}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item8">
            <EditRoadIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Year Traffic
            </Typography>
            <Typography align="center" variant="h5">
              {state.yearTraffic}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item1">
            <PersonIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Total User
            </Typography>
            <Typography align="center" variant="h5">
              {state.totalUser}
            </Typography>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item2">
            <MenuBookIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Total Courses
            </Typography>
            <Typography align="center" variant="h5">
              {state.totalCourse}

            </Typography>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item3">
            <CreditCardOffOutlinedIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Free Courses
            </Typography>
            <Typography align="center" variant="h5">
              {state.freeCourse}

            </Typography>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item4">
            <CurrencyRupeeIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Paid Courses
            </Typography>
            <Typography align="center" variant="h5">
              {state.paidCourse}
            </Typography>
          </div>
        </Grid>
      </Grid>

      {/* Dashboard Overview Ends*/}


      {/* char view  */}

      <Typography sx={{ display: "block" }} variant="h5">
        Report By Date
      </Typography>
      <Grid container className="reportContainer">
        <Grid item xs={12} md={3}>
          <Button size='small' startIcon={<DateRangeIcon></DateRangeIcon>} fullWidth onClick={() => { setOpenDateRange(true) }} variant='contained'>Set Interval</Button>
          <DatePicker />
        </Grid>
        <Grid item xs={12} md={3.9}>
          <TextField fullWidth variant='outlined' type='text' disabled value={search.showStartDate || ''} label="StartDate" />
        </Grid>
        <Grid item xs={12} md={0.3}>
          <Typography variant='h6' sx={{ textAlign: 'center' }}  >to</Typography>
        </Grid>
        <Grid item xs={12} md={3.9}>
          <TextField fullWidth variant='outlined' type='text' disabled value={search.showEndDate || ''} label="EndDate" />
        </Grid>
{/* // card  */}
<Grid item xs = {12}>
<Grid container sx={{ mt : 3,mb: 1 }} className="overviewContainer" spacing={1}>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item5">
            <ErrorIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Anonymous User
            </Typography>
            <Typography align="center" variant="h5">
              {miniReports.anonymous}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item6">
            <RouteIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Logged Traffic
            </Typography>
            <Typography align="center" variant="h5">
              {miniReports.logged}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item7">
            <CreditCardIcon
 />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Card Click
            </Typography>
            <Typography align="center" variant="h5">
              {miniReports.cardCount}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2"
        >
          <div class="sec2Icon item8">
            <SubscriptionsIcon />
          </div>
          <div>
            <Typography align="center" variant="caption">
              Enroll Click 
            </Typography>
            <Typography align="center" variant="h5">
              {miniReports.enrollCount}
            </Typography>
          </div>
        </Grid>
        
      </Grid>

</Grid>
{/* // card end */}

        <Grid item sx={{ mt: 2, p: 2 }} xs={12}>
          <Grid container sx={{ boxShadow: 2 }} className = 'stateContainer'>
            {/* // login */}
            <Grid item xs={12}>
              <Grid container className='states'>
                <Grid item xs={2}><Typography variant='body1'>User Login</Typography></Grid>
                <Grid item xs={8}>
                  <LinearProgress variant="buffer" value={(miniReports.logged/state.yearTraffic * 100)} valueBuffer={10} />
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center' }}><Typography variant='body1'>{parseInt(miniReports.logged/state.yearTraffic * 100)}%</Typography></Grid>

              </Grid>
            </Grid>

            {/* // end login */}

            {/* // Anonymous */}

            <Grid item xs={12}>
              <Grid container className='states'>
                <Grid item xs={2}><Typography variant='body1'>Anonymous User</Typography></Grid>
                <Grid item xs={8}>
                  <LinearProgress variant="buffer" value={(miniReports.anonymous/state.anonymous * 100)} valueBuffer={10} />
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center' }}><Typography variant='body1'>{parseInt(miniReports.anonymous/state.anonymous * 100)}%</Typography></Grid>

              </Grid>
            </Grid>
            {/* // end Anonymous */}

            {/* // card click */}
            <Grid item xs={12} >
              <Grid container className='states'>
                <Grid item xs={2}><Typography variant='body1'>Card Click</Typography></Grid>
                <Grid item xs={8}>
                  <LinearProgress variant="buffer" value={(miniReports.cardCount/miniReports.totalCardCount * 100)} valueBuffer={10} />
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center' }}><Typography variant='body1'>{parseInt(miniReports.cardCount/miniReports.totalCardCount * 100)}%</Typography></Grid>

              </Grid>
            </Grid>

            {/* // end Card Click */}

            {/* // enroll click */}
            <Grid item xs={12} >
              <Grid container className='states'>
                <Grid item xs={2}><Typography variant='body1'>Enroll Click</Typography></Grid>
                <Grid item xs={8}>
                  <LinearProgress variant="buffer" value={(miniReports.enrollCount/miniReports.totalEnrollCount * 100)} valueBuffer={10} />
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center' }}><Typography variant='body1'>{parseInt(miniReports.enrollCount/miniReports.totalEnrollCount * 100)}%</Typography></Grid>

              </Grid>
            </Grid>


            {/* // end enroll click */}

          </Grid>
        </Grid>
      </Grid>



      {/* data grid ends  */}
    </>
  );
};

export default Dashboard;
