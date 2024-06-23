import React from 'react'
import { useCookies } from 'react-cookie'
import VideoWithoutLogin from '../videos-without-login/VideoWithoutLogin';

const UserDashboard = () => {
    const[cookie,setCookie,removeCookie]=useCookies();

  return (
    <VideoWithoutLogin/>
  )
}

export default UserDashboard