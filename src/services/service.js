import axios from 'axios';


const localBaseUrl = 'http://localhost:8000/api';


//  login 

export const login = async(data)=>{
   return await axios.post(`${localBaseUrl}/login`,data)
  }
 
// =========================== CURD FOR User  ===========================


// for  adding category to the list 

export const addProduct = async(data)=>{
   
   return await axios.post(`${localBaseUrl}/addProducts`,data,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the products

export const getListUser = async(data)=>{
   return await axios.get(`${localBaseUrl}/getListProduct/?filter=${data}`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for deleting the product 

export const deleteUser = async (ID) => {
   return await axios.delete(`${localBaseUrl}/deleteUser/?ID=${ID}`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// for update the product 

export const updateUser = async (data) => { 
   return await axios.patch(`${localBaseUrl}/updateUser`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// ==================== service of the Track ========================

// for listing the listCardTrack

export const listCardTrack = async(data)=>{
   return await axios.get(`${localBaseUrl}/listCardTrack?filter=${data}`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the listEnrollTrack

export const listEnrollTrack = async(data)=>{
   return await axios.get(`${localBaseUrl}/listEnrollTrack?filter=${data}`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the listSearchTrack

export const listSearchTrack = async(data)=>{
   return await axios.get(`${localBaseUrl}/listSearchTrack?filter=${data}`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the listTrackData

export const listTrackData = async(data)=>{
   return await axios.get(`${localBaseUrl}/listTrackData?filter=${data}`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the searchUser

export const searchUser = async(data)=>{
   return await axios.get(`${localBaseUrl}/searchUser?filter=${data}`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

//  =========================== CURD For Banner ========================

// add banner

export const addBanner = async (data)=>{
   return await axios.post(`${localBaseUrl}/addBanner`,data,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// list banner

export const listBanner = async ()=>{
   return await axios.get(`${localBaseUrl}/listBanner`,{headers: { 
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

// change status banner

export const chaneStatus = async (data)=>{
   return await axios.patch(`${localBaseUrl}/chaneStatusBanner`,data,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}


//  =========================== CURD For Site Report    ========================

export const siteReport = async ()=>{
   return await axios.get(`${localBaseUrl}/siteReport`,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}

export const miniReport = async (data)=>{
   return await axios.get(`${localBaseUrl}/miniReport?filter=${data}`,{headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
   }})
}