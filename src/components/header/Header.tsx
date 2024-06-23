import React, { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { VideoContract } from '../../contracts/videoContract'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Header = () => {
    const[searchText,setSearchText]=useState<string>();
    const[videos,setVideos]=useState<VideoContract[]>();
    const[cookie,setCookie,removeCookie]=useCookies();
    let navigate=useNavigate();



    function textChange(e:any){
        setSearchText(e.target.value);
    }

    function channelBtnClick(e:any){
        if(!cookie.channel){
          navigate('/channel-login');
        }else{
            removeCookie("channel");
            navigate("/")
        }
    }

    function userBtnClick(){
      if(!cookie.user){
        navigate('/user-login')
      }else{
          removeCookie("user");
          navigate('user-login')
      }
     
    }
    function searchClick(){
        // axios.get(`http://127.0.0.1:6060/get-videos`).then(res=>{
        //     // console.log(res.data);
        //     setVideos(res.data.filter((video:any)=>{
        //       return video.Tags.includes(searchText)
        //     }))
        // })
    } 

  return (
    <>
        <header className="py-2">
            <div className="container-fluid d-flex align-items-center gap-2 justify-content-between">

                <Link to="/" className="fs-5 fw-bold  text-decoration-none d-flex text-dark align-items-center" style={{letterSpacing:"-2px"}}><span><FaYoutube className="text-danger fs-3"/></span>NewTube.</Link>
                <div className="input-group" style={{maxWidth:"500px"}}>
                  <input type="text" placeholder="Search" onChange={textChange}  className='form-control rounded-start-5' />
                  <button className='btn border fw-bold rounded-end-5' onClick={searchClick}><FiSearch/></button>
                </div>
                <div className="d-flex flex-row gap-1">
                  <Link to="/channel-dashboard" className={`btn btn-sm fw-medium btn-outline-dark ${cookie.channel?"d-inline-block":"d-none"}`}>Dashboard</Link>
                  <button onClick={channelBtnClick} className={`btn btn-sm btn-outline-dark fw-medium ${cookie.user?"d-none":"d-inline-block"}`}>{cookie.channel?"Logout":"Channel"}</button>
                  <button onClick={userBtnClick} className={`btn btn-sm btn-outline-dark fw-medium  ${cookie.channel?"d-none":"d-inline-block"}`}>{cookie.user?"Logout":"User"}</button>
                </div>
            </div>
     </header>
     <Outlet/>
    </>
  )
}

export default Header