import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

const ChannelRegister = () => {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      ChannelName:"",
      ChannelId:"",
      Password:""
    },
    onSubmit:(channel)=>{
        axios.post(`http://127.0.0.1:6060/add-channel`,channel).then(()=>{
            navigate("/channel-login")
        })
    }
  })

  return (
    <main>
        <div className="container-fluid">
              <form onSubmit={formik.handleSubmit} style={{width:"350px",maxWidth:"400px",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} className="border rounded-3 p-3">
                  <dl>
                      <h4 className="d-flex align-items-center justify-content-between"><span>Create channel</span> <Link to="/" className="text-dark"><IoCloseSharp/> </Link> </h4>
                      <dt className="mt-4">Channel name</dt>
                      <dd><input type="text" name="ChannelName" className="form-control" placeholder="Create channel name" onChange={formik.handleChange} /></dd>
                      <dt >UserID</dt>
                      <dd><input type="text" name="ChannelId" className='form-control' placeholder="Create  channel id" onChange={formik.handleChange} /></dd>
                      <dt>Password</dt>
                      <dd><input type="password" name="Password" className='form-control' placeholder="Create password" onChange={formik.handleChange} /></dd>
                      <dd className='mt-4'> <button type="submit" className="btn btn-light fw-medium w-100">Create</button></dd>
                      <dd>Already have channel ? <Link to="/channel-login">Login</Link></dd>
                  </dl>
              </form>
        </div>
    </main>
  )
}

export default ChannelRegister