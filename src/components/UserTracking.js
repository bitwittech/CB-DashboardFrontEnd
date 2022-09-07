import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Typography,
  TextField,
  Backdrop,
  InputLabel,
  Select,
  Grid,
  LinearProgress,
  Button,
  Modal,
  Fade,
  InputAdornment
} from "@mui/material";
import {
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  LineChart,
CartesianGrid,
XAxis,
YAxis,
Line
} from "recharts";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

import Pagination from "@mui/material/Pagination";

import {
  listTrackData,
  listEnrollTrack,
  listCardTrack,
  listSearchTrack,
} from "../services/service";

import "../assets/custom/css/category.css";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "../assets/custom/css/dashboard.css";

import RouteIcon from "@mui/icons-material/Route";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SearchIcon from "@mui/icons-material/Search";
import { DateRangePicker, } from "mui-daterange-picker";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export default function UserTracking() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [search, setSearch] = useState({title : 'path',email : '',date : '', endDate : '', startDate : '', count : 0});
  const [gridTitle, setgridTitle] = useState("Click Over The Track Cards");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [Data, setData] = useState([]);
  const [columns, setCol] = useState([]);
  const [Row, setRows] = useState();
  const [openDateRange, setOpenDateRange] = useState(false);



  // date picker from third party 
  const DatePicker = props => {
  
    const toggle = () => setOpenDateRange(!openDateRange);
  
    return (
      <Box sx = {{
        position: 'absolute'
      }}>
      <DateRangePicker
        open={openDateRange}
        toggle={toggle}
        // onChange={(range) => setDateRange(range)}
        onChange={(range) => setSearch({...search,startDate : range.startDate,endDate : range.endDate})}
      />
      </Box>
    );
  }

  const handleOnCellClick = (data) => {
    // // console.log(data);

    let DataArr = [];

//  // console.log(JSON.stringify(data.row.page_time_span))

    JSON.parse(data.row.page_time_span).map((row) => {
      DataArr.push({ name: row.path, value: row.time });
    });

    setData(DataArr);

    handleOpen();
  };

  let date = '';

  useEffect(()=>{

    col_row_change(search)

  },[search.title,search.emdDate,search.startDate])


  const col_row_change = (e) => {
    // // console.log(search);
    setgridTitle("Loading...");

     localStorage.setItem('model',e);

    switch (e.title) {
      case "path":
        setCol([
          {
            field: "id",
            headerName: "ID",
            width: 100,
          },
          {
            field: "user_email",
            headerName: "User Email",
            width: 200,
          },
          {
            field: "event_time",
            headerName: "Event Time",
            width: 200,
          },
          {
            field: "page_time_span",
            headerName: "Path",
            width: 500,
          },
        ]);

        listTrackData(JSON.stringify(search))
          .then((data) => {
            // // console.log(data);
            setSearch({...search, count : data.data.length})
            setRows(
              data.data.map((row) => {
                setgridTitle("User Path");
                // // console.log(row.time_stamp)
                 date = JSON.stringify(row.time_stamp)
          .split("T")[0]
          .slice(1)

                return {
                  id: row._id,
                  user_email: row.user_email,
                  event_time: date,
                  page_time_span: row.page_time_span,
                };
              })
            );
          })
          .catch((err) => {
            // console.log(err);
          });

        break;

      case "search":
        setCol([
          {
            field: "id",
            headerName: "ID",
            width: 100,
          },
          {
            field: "user_email",
            headerName: "User Email",
            width: 200,
          },
          {
            field: "event_time",
            headerName: "Event Time",
            width: 200,
          },
          {
            field: "search_query",
            headerName: "Query",
            width: 500,
          },
        ]);

        listSearchTrack(JSON.stringify(search))
          .then((data) => {
            setSearch({...search, count : data.data.length});

            setRows(
              data.data.map((row) => {
                setgridTitle("Search Track");
                date = JSON.stringify(row.event_time)
                .split("T")[0]
                .slice(1)
                return {
                  id: row._id,
                  user_email: row.user_email,
                  event_time: date,
                  search_query: row.search_query,
                };
              })
            );
          })
          .catch((err) => {
            // console.log(err);
          });

        break;

      case "card":
        setCol([
          {
            field: "id",
            headerName: "ID",
            width: 100,
          },
          {
            field: "user_email",
            headerName: "User Email",
            width: 200,
          },
          {
            field: "event_time",
            headerName: "Event Time",
            width: 200,
          },
          {
            field: "card_title",
            headerName: "Course Title",
            width: 500,
          },
          {
            field: "card_uuid",
            headerName: "Card UUID",
            width: 200,
          },
          {
            field: "provider",
            headerName: "Provider",
            width: 200,
          },
        ]);

        listCardTrack(JSON.stringify(search))
          .then((data) => {
            // // console.log(data);
        setSearch({...search, count : data.data.length});

            setRows(
              data.data.map((row) => {
                setgridTitle("Card Track");
                date = JSON.stringify(row.event_time)
                .split("T")[0]
                .slice(1)
                return {
                  id: row._id,
                  user_email: row.user_email,
                  event_time: date,
                  card_title: row.card_title,
                  card_uuid: row.card_uuid,
                  provider: row.provider,
                };
              })
            );
          })
          .catch((err) => {
            // console.log(err);
          });

        break;

      case "enroll":
        setCol([
          {
            field: "id",
            headerName: "ID",
            width: 100,
          },
          {
            field: "user_email",
            headerName: "User Email",
            width: 200,
          },
          {
            field: "event_time",
            headerName: "Event Time",
            width: 200,
          },
          {
            field: "card_title",
            headerName: "Course Title",
            width: 500,
          },
          {
            field: "card_uuid",
            headerName: "Card UUID",
            width: 200,
          },
          {
            field: "provider",
            headerName: "Provider",
            width: 200,
          },
        ]);

        listEnrollTrack(JSON.stringify(search))
          .then((data) => {
            // // console.log(data);
        setSearch({...search, count : data.data.length});

            setRows(
              data.data.map((row) => {
                setgridTitle("Enroll Track");
                date = JSON.stringify(row.event_time)
                .split("T")[0]
                .slice(1)
                return {
                  id: row._id,
                  user_email: row.user_email,
                  event_time: date ,
                  card_title: row.card_title,
                  card_uuid: row.card_uuid,
                  provider: row.provider,
                };
              })
            );
          })
          .catch((err) => {
            // console.log(err);
          });

        break;
      default:
        setCol([
          {
            field: "id",
            headerName: "ID",
            width: 100,
          },
          {
            field: "user_email",
            headerName: "User Email",
            width: 200,
          },
          {
            field: "time_stamp",
            headerName: "Event Time",
            width: 200,
          },
          {
            field: "page_time_span",
            headerName: "Path",
            width: 500,
          },
        ]);
        break;
    }
  };

  const handelSearch = (e) => {
    setSearch({
      ...search,
      [e.target.name] : e.target.value
    });
  };

  function DataGridView() {
    function CustomPagination() {
      const apiRef = useGridApiContext();
      const page = useGridSelector(apiRef, gridPageSelector);
      const pageCount = useGridSelector(apiRef, gridPageCountSelector);

      return (
        <Pagination
          color="primary"
          count={pageCount}
          page={page + 1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      );
    }

    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          pagination
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Pagination: CustomPagination,
            LoadingOverlay: LinearProgress,
          }}
          loading={gridTitle === "Loading..." ? true : false}
          filterModel={{
            items: [
              {
                columnField: "event_time",
                operatorValue: "contains",
                value: `${search.date}`,
              },
            ],
          }}
          rows={Row}
          columns={columns}
          onCellClick={handleOnCellClick}
        />
      </div>
    );
  }

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        User Tracking
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={3}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >

<Grid xs={12} md={3.5}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<CalendarMonthIcon />}
            variant="contained"
            onClick = {()=>{setOpenDateRange(true)}}
          >
            Date Filter
          </Button>
          <DatePicker/>
        </Grid> 
      

        <Grid xs={12} md = {4}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="User Email"
            onChange={(e)=> setSearch({...search, email : e.target.value })}
            name="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Email</InputAdornment>
              ),
            }}
            type="search"

          />
        </Grid>

        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            name = 'number'
            type="number"
            label="Search By Mobile"
            onChange={(e)=> setSearch({...search, mobile : e.target.value})}

            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">Mobile Number</InputAdornment>
            //   ),
            // }}
          />
        </Grid>



        
      </Grid>


      {/* Section 1 ends  */}

      <br></br>

      <br></br>

      <Grid container className="overviewContainer" spacing={1.2}>
        <Grid
          onClick={() => setSearch({...search, title : "path"})}
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2 hover"
        >
          <div class="sec2Icon item1">
            <RouteIcon />
          </div>
          <div>
            <Typography align="center" variant="h6">
              Path Track
            </Typography>
          </div>
        </Grid>

        <Grid
          onClick={() => setSearch({...search, title : "card"})}
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2 hover"
        >
          <div class="sec2Icon item2">
            <CreditCardIcon />
          </div>
          <div>
            <Typography align="center" variant="h6">
              Card Click
            </Typography>
          </div>
        </Grid>

        <Grid
          onClick={() => setSearch({...search, title : "enroll"})}
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2 hover"
        >
          <div class="sec2Icon item3">
            <SubscriptionsIcon />
          </div>
          <div>
            <Typography align="center" variant="h6">
              Enroll Click
            </Typography>
          </div>
        </Grid>

        <Grid
          onClick={() => setSearch({...search, title : "search"})}
          item
          xs={12}
          md={2.8}
          sx={{ boxShadow: 1 }}
          className="overviewBoardSec2 hover"
        >
          <div class="sec2Icon item4">
            <SearchIcon />
          </div>
          <div>
            <Typography align="center" variant="h6">
              Search Track
            </Typography>
          </div>
        </Grid>
      </Grid>

      <br></br>

      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          
        <div style={
            {
              display: 'flex',
              justifyContent: 'space-between',
            }
          } >
          <Typography variant="h6"> {gridTitle}</Typography>
          <Typography variant="h6"> {search.count}</Typography>
          </div>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
                                    
        <Fade in={open}>
          <Box sx={style}>
            {/* char view  */}

            <Grid container scaping={2} className="overviewContainer">
              <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
                <Typography variant="h6"> User Path </Typography>
                <br></br>
                <ResponsiveContainer width="95%" height="85%">
                  
                <LineChart width={730} height={250} data={Data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name"  />
                  <YAxis  dataKey = 'value' />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
                  {/* <PieChart className="chart">
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={Data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {Data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                    </Pie>
                  </PieChart> */}
                </ResponsiveContainer>
              </Grid>
            </Grid>

            {/* char view ends */}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
