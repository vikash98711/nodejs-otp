
 

import {Table, TableHead, TableRow, TableCell, TableBody, styled, Button, } from '@mui/material';
import { useEffect, useState } from 'react';
// import {getuser, deleteUser} from '../APIcalling/api';
import {Link} from 'react-router-dom';

// import {Link} from 'react-router-dom';
import { Senduseremail, deleteUser, getuserdetails } from './api-calling/api';



const Container=styled(Table)`
width:100%;
margin: 50px auto 0 auto;
`
const Thead=styled(TableRow)`
background-color:Teal;
& > th{
    color:#ffff;
    font-size:24px
}
`
const Tbody =styled(TableRow)`
& > td{
    font-size:24px;
    color:black;
}
`

const ShowFiles =()=>{
    const [users, setUsers] = useState([])



const getAllusers =async()=>{
   let res =  await getuserdetails();
   setUsers(res.data);
console.log("response hello",res);
}

useEffect(()=>{
    getAllusers();
},[])


const deleteUserDetails = async(id)=>{
    await deleteUser(id);

}

const sendallemail = async()=>{
     users && users.map(async(val,i)=>{
        return(
            <>
    {await Senduseremail( [val.email])} 
            </> 
        )
      })
  
}

    return(

      <Container className='New-container'>
        <TableHead>
            <Thead>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              <TableCell>
              <Button variant='contained' style={{marginTop: 10, marginRight:20}}  color="secondary" onClick={()=>{sendallemail()}}>Send Email</Button>
              </TableCell>

            </Thead>
        </TableHead>
        <TableBody>
            {
            //   users && users.map(user =>(
                users && users.map((user, i)=>{
                    return(

                
                    <Tbody key={i}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>{user.email}</TableCell>
                    
                        <TableCell>
                        {/* <Button variant='contained' style={{marginRight: 10, width:91 , marginTop:10}} component={Link} to={`/edit/${user._id}`}>Edit</Button> */}
                        <Button variant='contained' style={{marginTop: 10, marginRight:20}}  color="secondary" onClick={()=>deleteUserDetails(user.id)}>Delete</Button>


                </TableCell>
                    </Tbody>
                        )
                    })
                // ))
            }
        </TableBody>
      </Container>
    )
}


export default ShowFiles;
