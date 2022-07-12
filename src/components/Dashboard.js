import React, {useEffect, useState} from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Bar,
  Legend,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
import { Typography, Grid, IconButton } from "@mui/material";
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

import { DataGrid } from "@mui/x-data-grid";
import {siteReport } from "../services/service";

const Dashboard = () => {
  

  useEffect(()=>{

    siteReport()
    .then((data)=>{

      setState(data.data)

      console.log(data)

    })

  },[])
  

  const [state,setState] = useState({})
  
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 2400,
    },
    {
      name: "Group B",
      value: 4567,
    },
    {
      name: "Group C",
      value: 1398,
    },
    {
      name: "Group D",
      value: 9800,
    },
    {
      name: "Group E",
      value: 3908,
    },
    {
      name: "Group F",
      value: 4800,
    },
  ];

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

  return (
    <>
      {/* Dasboard Overview */}

      <Typography sx={{ display: "block" }} variant="h5">
        Dashboard Overview
      </Typography>

      <br></br>

      <Grid container className="overviewContainer" spacing={1}>
        <Grid
          item
          xs={12}
          md={3.8}
          sx={{ boxShadow: 2, backgroundColor: "#0694a2" }}
          className="overviewBoard"
        >
          
          <IconButton size="large"  aria-label="delete">
          <TodayIcon  style={{ color: "white" }}/>
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
          <CalendarMonthIcon  style={{ color: "white" }}/>
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
         <IconButton  size="large" aria-label="delete">
          <EventAvailableIcon  style={{ color: "white" }}/>
          </IconButton>

          <Typography color="white" variant="h6">
            Year Login
          </Typography>

          <Typography color="white" variant="h3">
          {state.yearLog}
          </Typography>
        </Grid>
      </Grid>

      <br></br>
      <br></br>

      <Grid container className="overviewContainer" spacing={1}>
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

      {/* Dasboard Overview Ends*/}

      <br></br>
      <br></br>

      {/* char view  */}

      {/* <Grid container scaping={2} className="overviewContainer">
        <Grid item xs={12} md={5.8} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography p={2} variant="h6">
            {" "}
            Conversions This Year{" "}
          </Typography>
          <br></br>
          <ResponsiveContainer width="95%" height="80%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid
          item
          p={2}
          xs={12}
          md={5.8}
          sx={{ boxShadow: 2, borderRadius: 5 }}
        >
          <Typography variant="h6"> Conversions This Year </Typography>
          <br></br>
          <ResponsiveContainer width="95%" height="85%">
            <PieChart className="chart">
              <Tooltip />
              <Legend />
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
      <br></br>
      <br></br> */}

      {/* char view ends */}
      {/* data grid  */}

      {/* <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Recent Order </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid> */}

      {/* data grid ends  */}
    </>
  );
};

export default Dashboard;
