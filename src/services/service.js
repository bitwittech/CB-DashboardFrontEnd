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

