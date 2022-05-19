import React, { useState, useContext,useEffect } from "react";
import {
 
  Typography,
  TextField,
  Grid,
  IconButton,InputAdornment
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { DataGrid } from "@mui/x-data-grid";
import { OpenBox, Notify } from "../App";
import {getListProduct, deleteProduct} from '../services/service'

export default function Products() {


  // useContext 

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);


  // states

  const [search,setSearch] = useState('')
  const [Row, setRows] = useState()



  useEffect(()=>{
    getListProduct()
    .then((data) => {
      console.log(data.data)

      setRows(data.data.map((row) => {

        return ({
          id: row._id,
          name: row.name ,
          gender: row.gender ,
          email_address: row.email_address ,
          school_or_college_name: row.school_or_college_name ,
          class_year: row.class_year ,
          city: row.city ,
          mobile_no: row.mobile_no ,
          password: row.password ,
          reg_time: row.reg_time ,
          action: row
        })
      }))
    })
    .catch((err) => {
      console.log(err)
    })


  },[])



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
      renderCell: (params) => 
      <div>
        
        <IconButton onClick={() => {
          
          console.log(params)
              SideBox.setOpen({
                state : true,
                formType : 'update_user',
                payload : params
              }) 
            }} aria-label="update"  >
              <CreateIcon />
        </IconButton>
        
        <IconButton onClick={() => { deleteProduct(params.formattedValue._id).then((res)=>{
              despatchAlert.setNote({
                open : true,
                variant : 'success',
                message : "Product deleted successfully !!!"
              })
            }) }} aria-label="delete"  >
              <DeleteIcon />
        </IconButton>
        
      </div>,
    }
    
  ];

 

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={Row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          filterModel={{
            items: [{ columnField: 'email_address', operatorValue: 'contains', value: `${search}` }],
          }}
        />
      </div>
    );
  }

 

  const handleSearch = (e)=>{
    // console.log(e.target.value)
     setSearch(e.target.value)
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
        <Grid xs={12} >
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="User Eamil"
            onChange = {handleSearch}
            name = 'seachQuery'
            InputProps={{
              startAdornment: <InputAdornment position="start">Email</InputAdornment>,
            }}
            type="search"
          />
        </Grid>
{/* 
        <Grid xs={12} md={2.8}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid xs={12} md={2.8}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={price}
                label="Price"
                onChange={handleChangePrice}
              >
                <MenuItem value={20}>Low to High</MenuItem>
                <MenuItem value={30}>High To Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid xs={12} md={2.8}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            onClick = {()=>{SideBox.setOpen({state : true, formType : 'product'})}}
          >
            Add Product
          </Button>
        </Grid> */}
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Product List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
