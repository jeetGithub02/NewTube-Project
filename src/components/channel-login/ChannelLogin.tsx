import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';


const ChannelLogin = () => {

  const[cookie,setCookie,removeCookie]=useCookies();
  let navigate=useNavigate();

  const formik =useFormik({
    initialValues:{
      ChannelId:"",
      Password:""
    },
    onSubmit:(user)=>{
      axios.get(`http://127.0.0.1:6060/get-channels`).then(response=>
      {
        var channel = response.data.find((ch:any)=>ch.ChannelId==user.ChannelId);
        console.log(channel)
        if(channel){
            if(channel.Password==user.Password){
                setCookie('channel',channel);
                navigate("/channel-dashboard");
            }else(
              alert("Invalid Credentials")
            )
        }else{
          console.log("Not Available")
        }

      
      })
    }
  });
 

  return (
    <main>
        <div className="container-fluid">
              <form onSubmit={formik.handleSubmit} style={{width:"350px",maxWidth:"400px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} className="border rounded-3 p-3">
                  <dl>
                      <h4 className="d-flex align-items-center justify-content-between"><span>Channel Login</span> <Link to="/" className="text-dark"><IoCloseSharp/> </Link> </h4>
                      <dt className="mt-4">UserID</dt>
                      <dd><input type="text" name="ChannelId" className='form-control' placeholder="Enter channel id"  onChange={formik.handleChange}/></dd>
                      <dt>Password</dt>
                      <dd><input type="password" name="Password" className='form-control' placeholder="Enter password"  onChange={formik.handleChange}/></dd>
                      <dd className='mt-4'> <button type="submit" className="btn btn-light fw-medium w-100">Login</button></dd>
                      <dd>Don't have channel ? <Link to="/channel-register">Create one</Link></dd>
                  </dl>
              </form>
        </div>
    </main>
  )
}

export default ChannelLogin