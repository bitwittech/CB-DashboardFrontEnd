import React, { useState, useContext, useEffect } from "react";
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
} from "@mui/material";
import {
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { OpenBox, Notify } from "../App";
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


  const SideBox = useContext(OpenBox);

// states
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState([]);
  const [columns, setCol] = useState([]);
  const [Row, setRows] = useState();
  const [search, setSearch] = useState({email : '', date : ''});
  const [gridTitle, setgridTitle] = useState("Click Over The Track Cards");

  const handleOpen = () => {
    return setOpen(true);
  };
  const handleClose = () => setOpen(false);

 
  
  var colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF",
  ];

  const handleOnCellClick = (data) => {
    console.log(data);

    let DataArr = [];

    JSON.parse(data.row.page_time_span).map((row) => {
      DataArr.push({ name: row.path, value: row.time });
    });

    setData(DataArr);

    handleOpen();
  };

  const col_row_change = (e) => {
    console.log(e);
    localStorage.setItem('path',e);

    setgridTitle("Loading...");

    switch (e) {
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

        listTrackData()
          .then((data) => {
            // console.log(data);
              let date = ''
            setRows(
              data.data.map((row) => {
                setgridTitle("User Path");

                let date = JSON.stringify(row.time_stamp).split("T")[0].slice(1)

                return {
                  id: row._id,
                  user_email: row.user_email,
                  time_stamp: date,
                  page_time_span: row.page_time_span,
                };
              })
            );
          })
          .catch((err) => {
            console.log(err);
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

        listSearchTrack()
          .then((data) => {
            console.log(data);
            setRows(
              data.data.map((row) => {
                setgridTitle("Search Track");

                return {
                  id: row._id,
                  user_email: row.user_email,
                  event_time: row.time_stamp,
                  search_query: row.search_query,
                };
              })
            );
          })
          .catch((err) => {
            console.log(err);
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

        listCardTrack()
          .then((data) => {
            console.log(data);
            setRows(
              data.data.map((row) => {
                setgridTitle("Card Track");

                return {
                  id: row._id,
                  user_email: row.user_email,
                  event_time: row.event_time,
                  card_title: row.card_title,
                  card_uuid: row.card_uuid,
                  provider: row.provider,
                };
              })
            );
          })
          .catch((err) => {
            console.log(err);
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

        listEnrollTrack()
          .then((data) => {
            console.log(data);
            setRows(
              data.data.map((row) => {
                setgridTitle("Enroll Track");

                return {
                  id: row._id,
                  user_email: row.user_email,
                  event_time: row.event_time,
                  card_title: row.card_title,
                  card_uuid: row.card_uuid,
                  provider: row.provider,
                };
              })
            );
          })
          .catch((err) => {
            console.log(err);
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
    console.log(search);
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
              {id : 1,
                columnField: "user_email",
                operatorValue: "contains",
                value: `${search.email}`,
              }
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
        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search By Email"
            type="text"
            name = 'email'
            onChange={handelSearch}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            type="date"
            name = 'date'
            onChange={handelSearch}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <Button
            onClick={() => {
              SideBox.setOpen({ state: true, formType: "category" });
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<PersonSearchIcon />}
            variant="contained"
          >
            Search User
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}

      <br></br>

      <br></br>

      <Grid container className="overviewContainer" spacing={1.2}>
        <Grid
          onClick={() => col_row_change("path")}
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
          onClick={() => col_row_change("card")}
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
          onClick={() => col_row_change("enroll")}
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
          onClick={() => col_row_change("search")}
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
          <Typography variant="h6"> {gridTitle}</Typography>
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
                  <PieChart className="chart">
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
                  </PieChart>
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
