import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup
} from "@mui/material";
import { Editor } from '@tinymce/tinymce-react'
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import "../assets/custom/css/sideForm.css";
import { useDropzone } from "react-dropzone";
import CancelIcon from "@mui/icons-material/Cancel";
import { OpenBox, Mode, Notify } from "../App";

// service 
import {
  updateUser
} from '../services/service.js'


  const yearCatelog = [
    {
      value: "class_6",
      label: "Class-6",
    },
    {
      value: "class_7",
      label: "Class-7",
    },
    {
      value: "class_8",
      label: "Class-8",
    },
    {
      value: "class_9",
      label: "Class-9",
    },
    {
      value: "class_10",
      label: "Class-10",
    },
    {
      value: "class_11",
      label: "Class-11",
    },
    {
      value: "class_12",
      label: "Class-12",
    },
    {
      value: "year_1",
      label: "Year-1",
    },
    {
      value: "year_2",
      label: "Year-2",
    },
    {
      value: "year_3",
      label: "Year-3",
    },
    {
      value: "year_4",
      label: "Year-4",
    },
    {
      value: "year_5",
      label: "Year-5",
    },

  ];



const  Sideform = () =>{

  // context
  const SideBox = useContext(OpenBox);
  const viewMode = useContext(Mode);
  const dispatchAlert = useContext(Notify);

  // states
  const [Year, setYear] = useState();



  // pres data
  const [preData, setPreData] = useState({
          name: '' ,
          gender: '' ,
          email_address: '' ,
          school_or_college_name: '' ,
          mobile_no: '' ,
          password: '' ,
  })

  useEffect(() => {


    switch (SideBox.open.formType) {

      case 'update_user':
        setPreData({
          name: SideBox.open.payload.row.name ,
          gender: SideBox.open.payload.row.gender ,
          email_address: SideBox.open.payload.row.email_address ,
          school_or_college_name: SideBox.open.payload.row.school_or_college_name ,
          mobile_no: SideBox.open.payload.row.mobile_no ,
          password: SideBox.open.payload.row.password ,
          city: SideBox.open.payload.row.city ,
        })

        setYear(SideBox.open.payload.value.class_year)
        break;
      default:
        console.log('');

    }
  }, [SideBox.open.formType, SideBox.open.state])

  const handleChangeData = (e) => {

    switch (SideBox.open.formType) {
        
     case 'update_user':

        setPreData({
          ...preData,
          [e.target.name]: e.target.value
        })

        break;

      default:
        console.log('');

    }

  }

  const handleChangeYear = (e) =>{
    setYear(e.target.value);
  }

  const handleClose = () => {
    SideBox.setOpen({ state: false, formType: null });
  };


  // function for handling Update Products category
  const handleUpdateProduct = (e) => {
    
    const FD = new FormData();

    e.preventDefault();

    FD.append('_id',SideBox.open.payload.row.id)
    FD.append('name',e.target.name.value)
    FD.append('gender',e.target.gender.value)
    FD.append('email_address',e.target.email_address.value)
    FD.append('school_or_college_name',e.target.school_or_college_name.value)
    FD.append('mobile_no',e.target.mobile_no.value)
    FD.append('password',e.target.password.value)
    FD.append('class_year',e.target.year.value)


    const res = updateUser(FD)

    res.then((data) => {
      console.log(data.status)

      if (data.status === 203) {
        
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: data.data.message

        })
      }
      else {
        
        dispatchAlert.setNote({
          open: true,
          variant: 'success',
          message: data.data.message

        })
      }

    })
      .catch((err) => {
        console.log(err)
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "Somthing Went Worang !!!"

        })
      })

  }



    return (
    <>
      <Slide
        direction="left"
        in={SideBox.open.state}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={SideBox.open.state}
        //   onClick={handleClose}
        >
          <Box className={viewMode.mode === true ? "mainDarkContainer" : "mainContainer"}>
            <IconButton
              onClick={handleClose}
              color="primary"
              className="crossButton"
            >
              <CancelIcon />
            </IconButton>

            {/*update user */}

            {SideBox.open.formType === "update_user" && (

              <Grid container p={5}>
               

                <Grid item xs={12}>
                  <Typography variant="h5">
                    Update User
                    <Typography
                      sx={{ display: "block !important" }}
                      variant="caption"
                    >
                      Update user information from
                      here
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={12} mt={5}>


                  <form className="form" id='myForm' onSubmit={handleUpdateProduct} enctype='multipart/form-data' method="post">

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      onChange  = {handleChangeData}
                      value = {preData.name}
                      label="User Name"
                      type="text"
                      variant="outlined"
                      name="name"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      onChange  = {handleChangeData}
                      value = {preData.email_address}
                      autoComplete={false}
                      id="fullWidth"
                      label="User Email"
                      type="email"
                      variant="outlined"
                      name='email_address'
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      onChange  = {handleChangeData}
                      autoComplete={false}
                      id="fullWidth"
                      value = {preData.password}
                      label="Password"
                      type="text"
                      variant="outlined"
                      name='password'
                    />
                    <br></br>
                    <TextField
                      fullWidth
                      onChange  = {handleChangeData}
                      autoComplete={false}
                      id="fullWidth"
                      value = {preData.mobile_no}
                      label="Contact Number"
                      type="number"
                      variant="outlined"
                      name='mobile_no'
                    />
                    <br></br>
                    <TextField
                      fullWidth
                      onChange  = {handleChangeData}
                      autoComplete={false}
                      id="fullWidth"
                      label="City"
                      value = {preData.city}
                      type="text"
                      variant="outlined"
                      name='contact'
                    />
                    <br></br>
                    <TextField
                      fullWidth
                      onChange  = {handleChangeData}
                      autoComplete={false}
                      id="fullWidth"
                      label="School or College"
                      value = {preData.school_or_college_name}
                      type="text"
                      variant="outlined"
                      name='school_or_college_name'
                    />
                   
<br></br>

<FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="gender"
    value = {preData.gender}
    onChange  = {handleChangeData}
  >
    <FormControlLabel value="Male" control={<Radio />} label="Male" />
    <FormControlLabel value="Female" control={<Radio />} label="Female" />
    <FormControlLabel value="Other" control={<Radio />} label="Other" />
  </RadioGroup>
</FormControl>



<br></br>

<TextField
  fullWidth
  id="outlined-select"
  select
  name='year'
  label="Class or Year"
  value={Year}
  onChange  = {handleChangeYear}
  multiple
  helperText="Please select your tax rate."

>
  {yearCatelog.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
  <MenuItem key={'none'} value={undefined}>
    {'None'}
  </MenuItem>
</TextField>


                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Update User
                    </Button>
                  </form>
                </Grid>
              </Grid>
            )}

            {/*ends update user */}



          </Box>
        </Backdrop>
      </Slide>
    </>
  );
};

export default Sideform;
