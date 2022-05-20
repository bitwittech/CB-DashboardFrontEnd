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

export const getListUser = async()=>{
   return await axios.get(`${localBaseUrl}/getListProduct`,{headers: { 
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

export const listCardTrack = async()=>{
   return await axios.get(`${localBaseUrl}/listCardTrack`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the listEnrollTrack

export const listEnrollTrack = async()=>{
   return await axios.get(`${localBaseUrl}/listEnrollTrack`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the listSearchTrack

export const listSearchTrack = async()=>{
   return await axios.get(`${localBaseUrl}/listSearchTrack`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

// for listing the listTrackData

export const listTrackData = async()=>{
   return await axios.get(`${localBaseUrl}/listTrackData`,{headers: { 
         'Authorization' : `Bearer ${localStorage.getItem('WDToken')}`
      }})
 
 }

