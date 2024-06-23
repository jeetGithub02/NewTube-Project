import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useCookies } from 'react-cookie'
import { IoCloseSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

const UserLogin = () => {
    
  const[cookie,setCookie,removeCookie]=useCookies();
  let navigate=useNavigate();
    const formik=useFormik({
      initialValues:{
        UserId:'',
        Password:''
      },
      onSubmit:(user)=>{
          axios.get(`http://127.0.0.1:6060/get-users`).then(res=>{
                let u = res.data.find((item:any)=>item.UserId===user.UserId);
                if(u){
                  if(u.Password===user.Password){
                      setCookie('user',user);
                      navigate('/user-dashboard')
                  }else{
                    alert("Invalid Password")
                  }
                }else{
                  alert("Invalid UserId")
                }
          })
      }
    })

  return (
    <main>
      <div className="container">
          <form onSubmit={formik.handleSubmit} style={{width:"350px",maxWidth:"400px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} className="border rounded-3 p-3">
                  <dl>
                      <h4 className="d-flex align-items-center justify-content-between"><span>User Login</span> <Link to="/" className="text-dark"><IoCloseSharp/> </Link> </h4>
                      <dt className="mt-4">UserID</dt>
                      <dd><input type="text" name="UserId" className='form-control' placeholder="Enter user id"  onChange={formik.handleChange}/></dd>
                      <dt>Password</dt>
                      <dd><input type="password" name="Password" className='form-control' placeholder="Enter password"  onChange={formik.handleChange}/></dd>
                      <dd className='mt-4'> <button type="submit" className="btn btn-light fw-medium w-100">Login</button></dd>
                      <dd>Don't have account ? <Link to="/user-register">Create one</Link></dd>
                  </dl>
          </form>
      </div>
    </main>
  )
}

export default UserLogin