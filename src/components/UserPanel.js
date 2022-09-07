import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  LinearProgress,
  Grid,
  IconButton,
  InputAdornment,Button,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
// import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { OpenBox, Notify } from "../App";
import { getListUser, deleteUser } from "../services/service";

import { DateRangePicker, } from "mui-daterange-picker";


export default function UserPanel() {
  // useContext

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);

  // states
  const [search, setSearch] = useState({email : '',mobile : '', startDate : '' , endDate : '', count : 0});
  const [Row, setRows] = useState(null);
  const [openDateRange, setOpenDateRange] = useState(false);
  // const [dateRange, setDateRange] = useState({});


  useEffect(() => {
    getListUser(JSON.stringify(search))
      .then((data) => {
        // // console.log(data)
        setSearch({...search, count : data.data.length});
        setRows(
          data.data.map((row) => {
          let date = JSON.stringify(row.reg_time).split("T")[0].slice(1)
            return {
              id: row._id,
              name: row.name,
              gender: row.gender,
              email_address: row.email_address,
              school_or_college_name: row.school_or_college_name,
              class_year: row.class_year,
              city: row.city,
              mobile_no: row.mobile_no,
              password: row.password,
              reg_time: date,
              action: row,
            };
          })
        );
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [search.startDate,search.endDate,search.mobile]);

 

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Name", width: 150 },

    {
      field: "email_address",
      headerName: "Email",
      width: 200,
    },
    {
      field: "password",
      headerName: "Password",
      width: 150,
    },
    {
      field: "mobile_no",
      headerName: "Phone",
      width: 110,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 160,
    },
    {
      field: "school_or_college_name",
      headerName: "School Or College",
      width: 160,
    },
    {
      field: "class_year",
      headerName: "Class Or Year",
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      width: 160,
    },

    {
      field: "reg_time",
      headerName: "Registration Time",
      width: 160,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              // console.log(params);
              SideBox.setOpen({
                state: true,
                formType: "update_user",
                payload: params,
              });
            }}
            aria-label="update"
          >
            <CreateIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              deleteUser(params.formattedValue._id).then((res) => {
                despatchAlert.setNote({
                  open: true,
                  variant: "success",
                  message: "User deleted successfully !!!",
                });
              });
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    // console.log(e.target.name)
    if(e.target.name === 'email') localStorage.setItem('searchEmail',e.target.value);
    setSearch({
      ...search,
      [e.target.name] : e.target.value
    });
  };

// data grid for data view
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
          rows={Row}
          columns={columns}
          components={{
            Pagination: CustomPagination,
            LoadingOverlay: LinearProgress,
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading = {Row !== null ? false : true}
          filterModel={{
            items: [
              {
                columnField: "email_address",
                operatorValue: "contains",
                value: `${search.email}`,
              },
            ],
          }}
        />
      </div>
    );
  }

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


  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        User Panel
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
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>

        <div style={
            {
              display: 'flex',
              justifyContent: 'space-between',
            }
          } >

          <Typography variant="h6"> User List </Typography>
          <Typography variant="h6"> {search.count} </Typography>
          </div>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
