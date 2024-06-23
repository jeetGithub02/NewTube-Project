import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import UserLogin from './components/user-login/UserLogin';
import NotFound from './components/not-found/NotFound';
import ChannelLogin from './components/channel-login/ChannelLogin';
import ChannelRegister from './components/channel-login/ChannelRegister';
import ChannelDashboard from './components/channel-dashboard/ChannelDashboard';
import UploadVideo from './components/channel-dashboard/UploadVideo';
import UserRegister from './components/user-login/UserRegister';
import UserDashboard from './components/user-dashboard/UserDashboard';
import VideoWithoutLogin from './components/videos-without-login/VideoWithoutLogin';
import SingleVideo from './components/videos-without-login/SingleVideo';
import EditVideo from './components/channel-dashboard/EditVideo';


function App() {
  return (
    <BrowserRouter>
       
        <Routes>
            <Route path="/" element={<Header/>} >
                <Route index element={<VideoWithoutLogin/>} />
                <Route path="channel-login" element={<ChannelLogin/>} />
                <Route path="channel-register" element={<ChannelRegister/>}/>
                <Route path="upload-video/:ChannelName" element={<UploadVideo/>} />
                <Route path="edit-video/:VideoId" element={<EditVideo/>} />
                <Route path="user-login" element={<UserLogin/>} />  
                <Route path="user-register" element={<UserRegister/>} />
                <Route path="channel-dashboard"element={<ChannelDashboard/>} />
                <Route path="user-dashboard" element={<UserDashboard/>} />
                <Route path="watch/:VideoId" element={<SingleVideo/>} />

            </Route>

            <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
