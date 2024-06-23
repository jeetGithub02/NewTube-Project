import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

const UserRegister = () => {
    let navigate=useNavigate();
    
    const formik=useFormik({
        initialValues:{
            Name:'',
            Email:'',
            UserId:'',
            Password:''
        },
        onSubmit:(user)=>{
            console.log(user);
            axios.post(`http://127.0.0.1:6060/register-user`,user).then(res=>{
                alert(res.data);
                navigate('/user-login')
            })
        }
    })

  return (
    <main>
        <div className="container">
            <form onSubmit={formik.handleSubmit} style={{width:"350px",maxWidth:"400px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} className="border rounded-3 p-3">
                    <dl>
                        <h4 className="d-flex align-items-center justify-content-between"><span>User Registration</span> <Link to="/" className="text-dark"><IoCloseSharp/> </Link> </h4>
                        <dt className="mt-4">Name</dt>
                        <dd><input type="text" className='form-control' name="Name" placeholder="Enter your name" onChange={formik.handleChange} /></dd>
                        <dt>Email</dt>
                        <dd><input type="email" name="Email" id="" className="form-control" placeholder="Enter your email" onChange={formik.handleChange} /></dd>
                        <dt >UserID</dt>
                        <dd><input type="text" name="UserId" className='form-control' placeholder="Create user id"  onChange={formik.handleChange}/></dd>
                        <dt>Password</dt>
                        <dd><input type="password" name="Password" className='form-control' placeholder="Create password"  onChange={formik.handleChange}/></dd>
                        <dd className='mt-4'> <button type="submit" className="btn btn-light fw-medium w-100">Sign up</button></dd>
                        <dd>Already have account ? <Link to="/user-login">Login</Link></dd>
                    </dl>
            </form>
        </div>
    </main>
  )
}

export default UserRegister