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
  addCategory, editCategory, addProduct, getLastProduct, updateProduct, categoryList, addSubCategories, getSubCatagories, editSubCatagories, addPrimaryMaterial, editPrimaryMaterial,
  addSecondaryMaterial, editSecondaryMaterial, getPrimaryMaterial, getSecondaryMaterial, addPolish, editPolish, getPolish, addHinge, editHinge, getHinge,
  addFitting, editFitting, getFitting, addKnob, getKnob, editKnob, addDoor, getDoor, updateImage, editDoor, addHandle, getHandle, editHandle,addImage
} from '../services/service.js'


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};



const Sideform = () => {
  // multple images 
  const [files, setFiles] = useState([]);
  const [featured, setFeatured] = useState([]);

  // single images
  const [Image, setImages] = useState([]);

  function FeaturesPreviews(props) {


    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      multiple: false,
      onDrop: acceptedFiles => {


        setFeatured(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))

      }
    });

    const thumbs = featured.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }

  function ProductsPreviews(props) {


    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      multiple: true,
      onDrop: acceptedFiles => {


        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))

      }
    });

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }
  function ImagePreviews(props) {


    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      multiple: false,
      onDrop: acceptedFiles => {


        setImages(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))

      }
    });

    const thumbs = Image.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt="Images"
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section className="container dorpContainer">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>{props.text}</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }


  const post = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Accountant",
      label: "Accountant",
    },
    {
      value: "CEO",
      label: "CEO",
    },
    {
      value: "Driver",
      label: "Driver",
    },
    {
      value: "Delivery Person",
      label: "Delivery Person",
    },
    {
      value: "Manager",
      label: "Manager",
    },
    {
      value: "Security Gaurd",
      label: "Security Gaurd",
    },
  ];



  const dispatchTimeCatalog = [
    {
      value: "3 to 5 Days",
      label: "3 to 5 Days",
    },
    {
      value: "5 to 8 Days",
      label: "5 to 8 Days",
    },
    {
      value: "1 to 2 Week",
      label: "1 to 2 Week",
    },
    {
      value: "2 to 3 Week",
      label: "2 to 3 Week",
    },
    {
      value: "3 to 4 Week",
      label: "3 to 4 Week",
    },
    {
      value: "4 to 5 Week",
      label: "4 to 5 Week",
    },
    {
      value: "5 to 6 Week",
      label: "5 to 6 Week",
    },
    {
      value: "6 to 7 Week",
      label: "6 to 7 Week",
    }
  ];


  const taxRateCatalog = [
    {
      value: "18",
      label: "18",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "2",
      label: "2",
    }

  ];


  const legCatalog = [
    {
      value: "Folding Legs",
      label: "Folding Legs",
    },
    {
      value: "Knockdown Legs",
      label: "Knockdown Legs",
    }

  ];

  const weightCapCatalog = [
    {
      value: "Child",
      label: "Child",
    },
    {
      value: "Light Weight",
      label: "Light Weight",
    },
    {
      value: "Adult",
      label: "Adult",
    }

  ];

  const trollyMaterial = [
    {
      value: "Teak Wood",
      label: "Teak Wood",
    },
    {
      value: "Natural Solid Wood",
      label: "Natural Solid Wood",
    }
    ,
    {
      value: "Stone",
      label: "Stone",
    }
    ,
    {
      value: "Metal",
      label: "Metal",
    }
    ,
    {
      value: "Brass",
      label: "Brass",
    }
    ,
    {
      value: "Copper",
      label: "Copper",
    }
    ,
    {
      value: "Glass",
      label: "Glass",
    }
    ,
    {
      value: "Mango Wood",
      label: "Mango Wood",
    }
    ,
    {
      value: "Pine wood",
      label: "Pine wood",
    }
    ,
    {
      value: "Acacia wood",
      label: "Acacia wood",
    }
    ,
    {
      value: "Sheesham wood",
      label: "Sheesham wood",
    }
    ,
    {
      value: "Ceramic",
      label: "Ceramic",
    }
    ,
    {
      value: "Brass Coated SS",
      label: "Brass Coated SS",
    }
    ,
    {
      value: "Iron Jali",
      label: "Iron Jali",
    }
    ,
    {
      value: "Glass Jali",
      label: "Glass Jali",
    }

  ];





  // context
  const SideBox = useContext(OpenBox);
  const viewMode = useContext(Mode);
  const dispatchAlert = useContext(Notify);

  // states
  const [cat, setCat] = useState();
  const [subCat, setSubCat] = useState();
  const [dispatchTime, setDispatch] = useState();
  const [taxRate, setTaxRate] = useState();
  const [fitting, setFitting] = useState();
  const [Polish, setPolish] = useState();
  const [Hinge, setHinge] = useState();
  const [Knob, setKnob] = useState();
  const [handle, setHandle] = useState();
  const [door, setDoor] = useState();
  const [weightCap, setWeightCap] = useState();
  const [material, setMaterial] = useState();
  const [secMaterial, setSecMaterial] = useState();
  const [mirrorVal, setMirrorVal] = useState('no');
  const [assemblyVal, setAssemblyVal] = useState();
  const [leg, setLeg] = useState();
  const [silver, setSilver] = useState();
  const [trollyVal, setTrollyVal] = useState();
  const [trolly, settrolly] = useState();


  // states for the dynamic rendering 
  const [SKU, setSKU] = useState('');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [materialCatalog, setMaterialCatalog] = useState([]);
  const [secMaterialCatalog, setSecMaterialCatalog] = useState([]);
  const [polishCatalog, setPolishCatalog] = useState([]);
  const [hingeCatalog, setHingeCatalog] = useState([]);
  const [fittingCatalog, setFittingCatalog] = useState([]);
  const [knobCatalog, setKnobCatalog] = useState([]);
  const [doorCatalog, setDoorCatalog] = useState([]);
  const [handleCatalog, setHandleCatalog] = useState([]);


  // pres data
  const [preData, setPreData] = useState({
    product_title: '',
    seo_title: '',
    seo_des: '',
    seo_keyword: '',
    product_des: '',
    category: '',
    sub_category: '',
    lenght: '',
    breadth: '',
    height: '',
    priMater: '',
    priMater_weight: '',
    secMater: '',
    secMater_weight: '',
    selling_price: '',
    mrp: '',
    discount_cap: '',
    dispatch_time: '',
    polish: '',
    hinge: '',
    knob: '',
    handle: '',
    door: '',
    wwight_cap: '',
    wall_hanging: '',
    assembly_required: '',
    assembly_leg: '',
    assembly_parts: '',
    fitting: '',
    rotating: '',
    eatable: '',
    no_chemical: '',
    straight_back: '',
    lean_back: '',
    weaving: '',
    not_micro_dish: '',
    tilt_top: '',
    inside_comp: '',
    stackable: '',
    silver: '',
    selling_point: '',
    mirror: '',
    joints: '',
    tax_rate: '',
    seat_width: '',
    seat_depth: '',
    seat_height: '',
    wheel: '',
    trolly: '',
    trolly_mater: '',
    top_size: '',
    dial_size: '',
  })

  useEffect(() => {


    switch (SideBox.open.formType) {
      case 'update_category':
        setPreData({
          ...preData,
          category: SideBox.open.payload.row.category_name
        })
        break;
      case 'update_PrimaryMaterial':
        setPreData({
          ...preData,
          priMater: SideBox.open.payload.row.primaryMaterial_name
        })
        break;
      case 'update_polish':
        setPreData({
          ...preData,
          polish: SideBox.open.payload.row.polish_name
        })
        break;
      case 'update_knob':
        setPreData({
          ...preData,
          knob: SideBox.open.payload.row.knob_name
        })
        break;
      case 'update_fitting':
        setPreData({
          ...preData,
          fitting: SideBox.open.payload.row.fitting_name
        })
        break;
      case 'update_hinge':
        setPreData({
          ...preData,
          hinge: SideBox.open.payload.row.hinge_name
        })
        break;
      case 'update_door':
        setPreData({
          ...preData,
          door: SideBox.open.payload.row.door_name
        })
        break;
      case 'update_handle':
        setPreData({
          ...preData,
          handle: SideBox.open.payload.row.handle_name
        })
        break;

      case 'update_Subcategory':
        setCat(
          SideBox.open.payload.row.category_id
        )
        break;


      case 'update_secondaryMaterial':
        setPreData({
          ...preData,
          secMater: SideBox.open.payload.row.secondaryMaterial_name
        })
        break;

      case 'update_product':
        setPreData({
          SKU: SideBox.open.payload.row.SKU,
          product_title: SideBox.open.payload.row.product_title,
          product_description: SideBox.open.payload.row.product_description,
          seo_title: SideBox.open.payload.row.seo_title,
          seo_description: SideBox.open.payload.row.seo_description,
          seo_keyword: SideBox.open.payload.row.seo_keyword,
          featured_image: SideBox.open.payload.row.featured_image,
          secondary_material_weight: SideBox.open.payload.row.secondary_material_weight,
          length: SideBox.open.payload.row.length,
          breadth: SideBox.open.payload.row.breadth,
          height: SideBox.open.payload.row.height,
          weight: SideBox.open.payload.row.weight,
          selling_points: SideBox.open.payload.row.selling_points,
          top_size: SideBox.open.payload.row.top_size,
          dial_size: SideBox.open.payload.row.dial_size,
          seating_size_width: SideBox.open.payload.row.seating_size_width,
          seating_size_depth: SideBox.open.payload.row.seating_size_depth,
          seating_size_height: SideBox.open.payload.row.seating_size_height,
          weight_capacity: SideBox.open.payload.row.weight_capacity,
          wall_hanging: SideBox.open.payload.row.wall_hanging,
          assembly_required: SideBox.open.payload.row.assembly_required,
          assembly_part: SideBox.open.payload.row.assembly_part,
          mirror: SideBox.open.payload.row.mirror,
          mirror_width: SideBox.open.payload.row.mirror_width,
          mirror_length: SideBox.open.payload.row.mirror_length,
          silver: SideBox.open.payload.row.silver,
          silver_weight: SideBox.open.payload.row.silver_weight,
          joints: SideBox.open.payload.row.joints,
          wheel: SideBox.open.payload.row.wheel,
          trolley: SideBox.open.payload.row.trolley,
          trolley_material: SideBox.open.payload.row.trolley_material,
          rotating_seats: SideBox.open.payload.row.rotating_seats,
          eatable_oil_polish: SideBox.open.payload.row.eatable_oil_polish,
          no_chemical: SideBox.open.payload.row.no_chemical,
          straight_back: SideBox.open.payload.row.straight_back,
          lean_back: SideBox.open.payload.row.lean_back,
          weaving: SideBox.open.payload.row.weaving,
          not_suitable_for_Micro_Dish: SideBox.open.payload.row.not_suitable_for_Micro_Dish,
          tilt_top: SideBox.open.payload.row.tilt_top,
          inside_compartments: SideBox.open.payload.row.inside_compartments,
          stackable: SideBox.open.payload.row.stackable,
          MRP: SideBox.open.payload.row.MRP,
          selling_price: SideBox.open.payload.row.selling_price,
          discount_limit: SideBox.open.payload.row.discount_limit,

        })

        setCat(SideBox.open.payload.value.category_id)
        setSubCat(SideBox.open.payload.value.sub_category_id)
        setMaterial(SideBox.open.payload.value.primary_material)
        setSecMaterial(SideBox.open.payload.value.secondary_material)
        setPolish(SideBox.open.payload.value.polish)
        setHinge(SideBox.open.payload.value.hinge)
        setKnob(SideBox.open.payload.value.knob)
        setHandle(SideBox.open.payload.value.handle)
        setDoor(SideBox.open.payload.value.door)
        setFitting(SideBox.open.payload.value.fitting)
        setLeg(SideBox.open.payload.value.legs)
        setTaxRate(SideBox.open.payload.value.tax_rate)
        setDispatch(SideBox.open.payload.value.dispatch_time)


        setWeightCap(SideBox.open.payload.row.weight_capacity)
        setMirrorVal(SideBox.open.payload.row.mirror)
        setAssemblyVal(SideBox.open.payload.row.assembly_required)
        setSilver(SideBox.open.payload.row.silver)
        setTrollyVal(SideBox.open.payload.trolley)
        settrolly(SideBox.open.payload.trolley_material)



        break;


      default:
        console.log('');

    }

    categoryList().then((data) => {
      if (data.data === null) return setCategory([])

      return setCategory(data.data)
    })

    getSubCatagories().then((data) => {
      if (data.data === null) return setSubCategory([])

      return setSubCategory(data.data)
    })

    getPrimaryMaterial().then((data) => {
      if (data.data === null) return setMaterialCatalog([])

      return setMaterialCatalog(data.data)
    })

    getSecondaryMaterial().then((data) => {
      if (data.data === null) return setSecMaterialCatalog([])

      return setSecMaterialCatalog(data.data)
    })

    getPolish().then((data) => {
      if (data.data === null) return setPolishCatalog([])

      return setPolishCatalog(data.data)
    })

    getHinge().then((data) => {
      if (data.data === null) return setHingeCatalog([])

      return setHingeCatalog(data.data)
    })

    getFitting().then((data) => {
      if (data.data === null) return setFittingCatalog([])

      return setFittingCatalog(data.data)
    })

    getKnob().then((data) => {
      if (data.data === null) return setKnobCatalog([])

      return setKnobCatalog(data.data)
    })

    getDoor().then((data) => {
      if (data.data === null) return setDoorCatalog([])

      return setDoorCatalog(data.data)
    })

    getHandle().then((data) => {
      if (data.data === null) return setHandleCatalog([])

      return setHandleCatalog(data.data)
    })



  }, [SideBox.open.formType, SideBox.open.state])

  const handleChangeData = (e) => {

    switch (SideBox.open.formType) {
      case 'update_category':
        setPreData({
          ...preData,
          category: e.target.value
        })
        break;
      case 'update_PrimaryMaterial':
        setPreData({
          ...preData,
          priMater: e.target.value
        })
        break;
      case 'update_polish':
        setPreData({
          ...preData,
          polish: e.target.value
        })
        break;
      case 'update_knob':
        setPreData({
          ...preData,
          knob: e.target.value
        })
        break;
      case 'update_fitting':
        setPreData({
          ...preData,
          fitting: e.target.value
        })
        break;
      case 'update_hinge':
        setPreData({
          ...preData,
          hinge: e.target.value
        })
        break;
      case 'update_door':
        setPreData({
          ...preData,
          door: e.target.value
        })
        break;
      case 'update_handle':
        setPreData({
          ...preData,
          handle: e.target.value
        })
        break;
      case 'update_secondaryMaterial':
        setPreData({
          ...preData,
          secMater: e.target.value
        })
        break;
      case 'update_product':

        setPreData({
          ...preData,
          [e.target.name]: e.target.value
        })

        break;

      default:
        console.log('');

    }

  }






  // ref
  const editorRef = useRef();
  const sellingPoints = useRef();

  const handleChange = (event) => {
    setCat(event.target.value);
  };
  const handleChangeSubCat = (event) => {
    setSubCat(event.target.value);
  };
  const handleChangeTrollyVal = (event) => {
    setTrollyVal(event.target.value);
  };
  const handleChangeTrolly = (event) => {
    settrolly(event.target.value);
  };

  const handleChangeDispatchTime = (event) => {
    setDispatch(event.target.value);
  };

  const handleChangeTaxRate = (event) => {
    setTaxRate(event.target.value);
  };

  const handleChangeFitting = (event) => {
    setFitting(event.target.value);
  };

  const handleChangePolish = (event) => {
    setPolish(event.target.value);
  };

  const handleChangeHinge = (event) => {
    setHinge(event.target.value);
  };

  const handleChangeKnob = (event) => {
    setKnob(event.target.value);
  };

  const handleChangeHandle = (event) => {
    setHandle(event.target.value);
  };

  const handleChangeDoor = (event) => {
    setDoor(event.target.value);
  };

  const handleChangeWeightCap = (event) => {
    setWeightCap(event.target.value);
  };

  const handleChangeMaterial = (event) => {
    setMaterial(event.target.value);
  };

  const handleChangeSecMaterial = (event) => {
    setSecMaterial(event.target.value);
  };
  const handleChangeMirror = (event) => {
    // console.log(event.target.value);
    setMirrorVal(event.target.value);
  };

  const hanleChangeAssembly = (event) => {
    // console.log(event.target.value);
    setAssemblyVal(event.target.value);
  };


  const handleChangeLeg = (event) => {
    // console.log(event.target.value);
    setLeg(event.target.value);
  };



  const handleClose = () => {
    resetAll();
    SideBox.setOpen({ state: false, formType: null });
  };

  const handleChangeSilver = (e) => {
    setSilver(e.target.value)
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 10,
    accept: "image/jpeg,image/png",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // function for genrating product SKU ID

  const getSKU = () => {

    getLastProduct()
      .then((res) => {
        if (res.data.length > 0) {
          // console.log(res.data[0].SKU)

          let index = parseInt(res.data[0].SKU.split('-')[1]) + 1;

          setSKU(`WS-0${index}`);
        }
        else {
          setSKU('WS-01001')
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }



  // function for handling category
  const handleCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('category_image', Image[0]);
    FD.append('category_name', e.target.category_name.value)
    FD.append('category_status', e.target.category_status.checked)


    // console.log(acceptedFiles[0].name, e.target.category_name.value)



    const res = addCategory(FD)



    res.then((data) => {
      console.log(data.status)

      if (data.status === 203) {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: data.data.message

        })
      }
      else {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'success',
          message: data.data.message

        })
      }

    })
      .catch((err) => {
        console.log(err)
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "Somthing Went Worang !!!"

        })
      })



  }

  // function for handling update category
  const handleUpdateCategory = (e) => {
    e.preventDefault();

    const FD = new FormData();

    FD.append('_id', SideBox.open.payload.row.id)


    Image[0] !== undefined && FD.append('category_image', Image[0]);

    e.target.category_name.value !== undefined ? FD.append('category_name', e.target.category_name.value) : console.log();



    const res = editCategory(FD);
    res.then((data) => {
      console.log(data.status)

      if (data.status === 203) {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: data.data.message

        })
      }
      else {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'success',
          message: data.data.message

        })
      }

    })
      .catch((err) => {
        console.log(err)
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "Somthing Went Worang !!!"

        })
      })




  }

  // function fo reseting the values

  const resetAll = () => {

    setImages([])
    setFeatured([])
    setFiles([])
    setCat(null)
    setSubCat(null)
    setDispatch(null)
    setTaxRate(null)
    setFitting(null)
    setPolish(null)
    setHinge(null)
    setKnob(null)
    setHandle(null)
    setDoor(null)
    setWeightCap(null)
    setMaterial(null)
    setSecMaterial(null)
    setMirrorVal(null)
    setAssemblyVal(null)
    setLeg(null)
    setSilver(null)
    setTrollyVal(null)
    settrolly(null)
    document.getElementById('myForm').reset();
  }

  const handleAddImage = (e) =>{
    e.preventDefault()
    const FD = new FormData();

    files.map((element) => {
      return FD.append('product_image',element);
    })

    FD.append('SKU',e.target.SKU.value)

    const res = addImage(FD)

    res.then((data)=>{

      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message
      })

    })
    .catch((data)=>{
      dispatchAlert.setNote({
        open: true,
        variant: 'error',
        message: data.data.message

      })
    })



  }

  const handleUpdateGallery = (e) =>{
    const FD = new FormData();

    e.preventDefault();

    FD.append('category_image', Image[0]);
    FD.append('SKU', SideBox.open.payload.SKU)
    FD.append('ImageIndex', SideBox.open.payload.imageIndex)

    const  res = updateImage(FD);

    console.log(SideBox.open.payload)

    res.then((data)=>{

      dispatchAlert.setNote({
        open: true,
        variant: 'success',
        message: data.data.message

      })

    })
    .catch((data)=>{
      dispatchAlert.setNote({
        open: true,
        variant: 'error',
        message: data.data.message

      })
    })


  }

  // function for handling Update Products category
  const handleUpdateProduct = (e) => {
    
    const FD = new FormData();

    e.preventDefault();


    FD.append('_id', SideBox.open.payload.row.id)

    console.log(SideBox.open.payload.row.id)

    FD.append('SKU', e.target.SKU.value);


    featured.map((element) => {
      return FD.append('featured_image', element);

    })


    materialCatalog.map((item) => {

      return item._id === e.target.primary_material.value && FD.append('primary_material_name', item.primaryMaterial_name)

    })
    secMaterialCatalog.map((item) => {

      return item._id === e.target.secondary_material.value && FD.append('secondary_material_name', item.secondaryMaterial_name)

    })



    featured.map((element) => {
      return FD.append('featured_image', element);

    })

    category.map((item) => {

      return item._id === e.target.category_name.value && FD.append('category_name', item.category_name)

    })

    subCategory.map((item) => {

      return item._id === e.target.sub_category_name.value && FD.append('sub_category_name', item.sub_category_name)

    })

    polishCatalog.map((item) => {

      return item._id === e.target.polish.value && FD.append('polish_name', item.polish_name)

    })
    hingeCatalog.map((item) => {

      return item._id === e.target.hinge.value && FD.append('hinge_name', item.hinge_name)

    })
    fittingCatalog.map((item) => {

      return item._id === e.target.fitting.value && FD.append('fitting_name', item.fitting_name)

    })
    knobCatalog.map((item) => {

      return item._id === e.target.knob.value && FD.append('knob_name', item.knob_name)

    })
    doorCatalog.map((item) => {

      return item._id === e.target.door.value && FD.append('door_name', item.door_name)

    })
    handleCatalog.map((item) => {

      return item._id === e.target.handle.value && FD.append('handle_name', item.handle_name)

    })


    // DROPDOWNs
    e.target.dispatch_time.value !== null && FD.append('dispatch_time', e.target.dispatch_time.value);
    e.target.selling_price.value !== null && FD.append('selling_price', e.target.selling_price.value);
    e.target.weight.value !== null && FD.append('weight', e.target.weight.value);
    e.target.weight_capacity.value !== null && FD.append('weight_capacity', e.target.weight_capacity.value);
    e.target.tax_rate.value !== null && FD.append('tax_rate', e.target.tax_rate.value);



    if (secMaterial !== undefined)
      FD.append('secondary_material_weight', e.target.secondary_material_weight.value);

    editorRef.current.getContent() && FD.append('product_description', editorRef.current.getContent());
    sellingPoints.current.getContent() && FD.append('selling_points', sellingPoints.current.getContent());


    e.target.product_title.value !== '' && FD.append('product_title', e.target.product_title.value);
    e.target.MRP.value !== '' && FD.append('MRP', e.target.MRP.value);
    e.target.seo_title.value !== '' && FD.append('seo_title', e.target.seo_title.value);
    e.target.seo_description.value !== '' && FD.append('seo_description', e.target.seo_description.value);
    e.target.discount_limit.value !== '' && FD.append('discount_limit', e.target.discount_limit.value);
    e.target.length_main.value !== '' && FD.append('length_main', e.target.length_main.value);
    e.target.breadth.value !== '' && FD.append('breadth', e.target.breadth.value);
    e.target.height.value !== '' && FD.append('height', e.target.height.value);
    e.target.top_size.value !== '' && FD.append('top_size', e.target.top_size.value);
    e.target.dial_size.value !== '' && FD.append('dial_size', e.target.dial_size.value);
    e.target.seating_size_width.value !== '' && FD.append('seating_size_width', e.target.seating_size_width.value);
    e.target.seating_size_depth.value !== '' && FD.append('seating_size_depth', e.target.seating_size_depth.value);
    e.target.seating_size_height.value !== '' && FD.append('seating_size_height', e.target.seating_size_height.value);

    // Radio button
    FD.append('assembly_required', e.target.assembly_required.value);
    FD.append('mirror', e.target.mirror.value);
    FD.append('joints', e.target.joints.value);
    FD.append('wheel', e.target.wheel.value);
    FD.append('trolley', e.target.trolley.value);
    FD.append('silver', e.target.silver.value);
    FD.append('wall_hanging', e.target.wall_hanging.value);

    if (assemblyVal === 'shipping')
      FD.append('assembly_part', e.target.assembly_part.value);
    if (assemblyVal === 'yes')
      FD.append('legs', e.target.legs.value);

    if (silver === 'yes')
      FD.append('silver_weight', e.target.silver_weight.value);


    if (trolly === 'yes')
      FD.append('trolly_matterial', e.target.trollyMat.value);


    if (e.target.mirror.value === 'yes') {
      FD.append('mirror_length', e.target.mirror_length.value)
      FD.append('mirror_width', e.target.mirror_width.value)
    }



    // check Box
    e.target.rotating_seats.checked && FD.append('rotating_seats', e.target.rotating_seats.checked);
    e.target.eatable_oil_polish.checked && FD.append('eatable_oil_polish', e.target.eatable_oil_polish.checked);
    e.target.no_chemical.checked && FD.append('no_chemical', e.target.no_chemical.checked);
    e.target.lean_back.checked && FD.append('lean_back', e.target.lean_back.checked);
    e.target.straight_back.checked && FD.append('straight_back', e.target.straight_back.checked);
    e.target.weaving.checked && FD.append('weaving', e.target.weaving.checked);
    e.target.not_suitable_for_Micro_Dish.checked && FD.append('not_suitable_for_Micro_Dish', e.target.not_suitable_for_Micro_Dish.checked);
    e.target.tilt_top.checked && FD.append('tilt_top', e.target.tilt_top.checked);
    e.target.inside_compartments.checked && FD.append('inside_compartments', e.target.inside_compartments.checked);
    e.target.stackable.checked && FD.append('stackable', e.target.stackable.checked);

    // FD.get('product_image')


    for (var value of FD.values()) {
      console.log(">>>>", value);
    }



    const res = updateProduct(FD)

    res.then((data) => {
      console.log(data.status)

      if (data.status === 203) {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: data.data.message

        })
      }
      else {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'success',
          message: data.data.message

        })
      }

    })
      .catch((err) => {
        console.log(err)
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: "Somthing Went Worang !!!"

        })
      })

  }


  const handleProduct = (e) => {
    e.preventDefault();

    const FD = new FormData();

    files.map((element) => {
      return FD.append('product_image', element);
    })




    materialCatalog.map((item) => {

      return item._id === e.target.primary_material.value && FD.append('primary_material_name', item.primaryMaterial_name)

    })
    secMaterialCatalog.map((item) => {

      return item._id === e.target.secondary_material.value && FD.append('secondary_material_name', item.secondaryMaterial_name)

    })



    featured.map((element) => {
      return FD.append('featured_image', element);

    })

    category.map((item) => {

      return item._id === e.target.category_name.value && FD.append('category_name', item.category_name)

    })

    subCategory.map((item) => {

      return item._id === e.target.sub_category_name.value && FD.append('sub_category_name', item.sub_category_name)

    })

    polishCatalog.map((item) => {

      return item._id === e.target.polish.value && FD.append('polish_name', item.polish_name)

    })
    hingeCatalog.map((item) => {

      return item._id === e.target.hinge.value && FD.append('hinge_name', item.hinge_name)

    })
    fittingCatalog.map((item) => {

      return item._id === e.target.fitting.value && FD.append('fitting_name', item.fitting_name)

    })
    knobCatalog.map((item) => {

      return item._id === e.target.knob.value && FD.append('knob_name', item.knob_name)

    })
    doorCatalog.map((item) => {

      return item._id === e.target.door.value && FD.append('door_name', item.door_name)

    })
    handleCatalog.map((item) => {

      return item._id === e.target.handle.value && FD.append('handle_name', item.handle_name)

    })



    FD.append('polish', e.target.polish.value);
    FD.append('hinge', e.target.hinge.value);
    FD.append('knob', e.target.knob.value);
    FD.append('handle', e.target.handle.value);
    FD.append('door', e.target.door.value);
    FD.append('fitting', e.target.fitting.value);



    FD.append('category_id', e.target.category_name.value);
    FD.append('sub_category_id', e.target.sub_category_name.value);
    FD.append('dispatch_time', e.target.dispatch_time.value);
    FD.append('product_title', e.target.product_title.value);
    FD.append('product_description', editorRef.current.getContent());
    FD.append('selling_points', sellingPoints.current.getContent());
    FD.append('SKU', e.target.SKU.value);
    FD.append('MRP', e.target.MRP.value);
    FD.append('seo_title', e.target.seo_title.value);
    FD.append('seo_description', e.target.seo_description.value);
    FD.append('seo_keyword', e.target.seo_keyword.value);
    FD.append('discount_limit', e.target.discount_limit.value);
    FD.append('selling_price', e.target.selling_price.value);
    FD.append('primary_material', e.target.primary_material.value);
    FD.append('secondary_material', e.target.secondary_material.value);
    //  console.log(secMaterial) 
    if (secMaterial !== null)
      FD.append('secondary_material_weight', e.target.secondary_material_weight.value);
    FD.append('length_main', e.target.length_main.value);
    FD.append('breadth', e.target.breadth.value);
    FD.append('height', e.target.height.value);
    FD.append('weight', e.target.weight.value);

    FD.append('top_size', e.target.top_size.value);
    FD.append('dial_size', e.target.dial_size.value);
    FD.append('seating_size_width', e.target.seating_size_width.value);
    FD.append('seating_size_depth', e.target.seating_size_depth.value);
    FD.append('seating_size_height', e.target.seating_size_height.value);
    FD.append('weight_capacity', e.target.weight_capacity.value);
    FD.append('wall_hanging', e.target.wall_hanging.value);
    FD.append('assembly_required', e.target.assembly_required.value);

    if (assemblyVal === 'shipping')
      FD.append('assembly_part', e.target.assembly_part.value);
    if (assemblyVal === 'yes')
      FD.append('legs', e.target.legs.value);

    if (silver === 'yes')
      FD.append('silver_weight', e.target.silver_weight.value);


    if (trolly === 'yes')
      FD.append('trolley_material', e.target.trolley_material.value);




    FD.append('mirror', e.target.mirror.value);

    if (e.target.mirror.value === 'yes') {
      FD.append('mirror_length', e.target.mirror_length.value)
      FD.append('mirror_width', e.target.mirror_width.value)
    }
    FD.append('joints', e.target.joints.value);
    FD.append('wheel', e.target.wheel.value);
    FD.append('trolley', e.target.trolley.value);
    FD.append('silver', e.target.silver.value);
    FD.append('rotating_seats', e.target.rotating_seats.checked);
    FD.append('eatable_oil_polish', e.target.eatable_oil_polish.checked);
    FD.append('no_chemical', e.target.no_chemical.checked);
    FD.append('lean_back', e.target.lean_back.checked);
    FD.append('weaving', e.target.weaving.checked);
    FD.append('not_suitable_for_Micro_Dish', e.target.not_suitable_for_Micro_Dish.checked);
    FD.append('straight_back', e.target.straight_back.checked);
    FD.append('tilt_top', e.target.tilt_top.checked);
    FD.append('inside_compartments', e.target.inside_compartments.checked);
    FD.append('stackable', e.target.stackable.checked);
    FD.append('tax_rate', e.target.tax_rate.value);

    // FD.get('product_image')


    for (var value of FD.values()) {
      console.log(">>>>", value);
    }



    const res = addProduct(FD)

    res.then((data) => {
      console.log(data.status)

      if (data.status === 203) {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'error',
          message: data.data.message

        })
      }
      else {
        setImages([]);
        dispatchAlert.setNote({
          open: true,
          variant: 'success',
          message: data.data.message

        })
      }

    })
      .catch((err) => {
        console.log(err)
        setImages([]);
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


                  <form className="form" id='myForm' onSubmit={handleProduct} enctype='multipart/form-data' method="post">

                    <br></br>
                    <TextField
                      fullWidth
                      autoComplete={false}
                      id="fullWidth"
                      required
                      label="User Name"
                      type="text"
                      variant="outlined"
                      name="name"
                    />

                    <br></br>
                    <TextField
                      fullWidth
                      required
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
                      required
                      autoComplete={false}
                      id="fullWidth"
                      label="Password"
                      type="text"
                      variant="outlined"
                      name='password'
                    />
                    <br></br>
                    <TextField
                      fullWidth
                      required
                      autoComplete={false}
                      id="fullWidth"
                      label="Contact Number"
                      type="number"
                      variant="outlined"
                      name='contact'
                    />

                    <br></br>

                    <Button color="primary" type='submit' fullWidth variant="contained">
                      Add Product
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
