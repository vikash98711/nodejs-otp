import axios from 'axios';

const URL = 'http://localhost:8080';

 export const senduser= async(data)=>{
    try{
       await axios.post(`${URL}/api/uploadfile`, data)

    }catch(error){
        console.log('api calling is not connecting correct ',error)

    }
}
 export const getuserdetails= async()=>{
    try{
    return await axios.get(`${URL}/getusers`,)

    }catch(error){
        console.log('api calling is not connecting correct ',error)

    }
}



// delete 
export const deleteUser= async(id)=>{
    try{
     return await axios.delete(`${URL}/deleteuser/${id}`);
 
    }catch(error){
     console.log("error while calling deleteUser api",error);
    }
 }




//  send otp to all users email starting

export const Senduseremail= async(obj)=>{
    try{
       await axios.post(`${URL}/Alluseremail`, obj)

    }catch(error){
        console.log('api calling is not connecting correct ',error)

    }
}



//  send otp to all users email ending




// post api for ck editor starting

export const senduserCk= async(data)=>{
    try{
       await axios.post(`${URL}/createcrk`, data)

    }catch(error){
        console.log('api calling is not connecting correct ',error)

    }
}


// post api for ck editor ending 