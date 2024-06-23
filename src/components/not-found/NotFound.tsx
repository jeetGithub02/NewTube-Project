import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { FaYoutube } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className='text-center text-secondary fs-5 fw-medium d-flex align-items-center gap-2 justify-content-center flex-column' style={{minHeight:"100vh",}}>
        <div className="fs-1 fw-bold" style={{letterSpacing:"-3px"}}><FaYoutube className="text-danger"/> NewTube</div>
        <div>Oops! We're sorry. The Web address you entered is not a functioning page on our site.</div>
        <div className="text-dark"> <FaArrowLeft/> Go to NewTube's <Link to="/" className="fw-medium">Home</Link> Page</div>
    </div>
  )
}

export default NotFound