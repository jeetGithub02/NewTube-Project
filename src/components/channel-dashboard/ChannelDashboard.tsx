import React, { useEffect, useState } from 'react'
import { VideoContract } from '../../contracts/videoContract';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill,RiAdminFill } from "react-icons/ri";
import { BiSolidLike,BiSolidDislike ,BiLike,BiDislike} from "react-icons/bi";
import { MdHome } from "react-icons/md";
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { LiaUploadSolid } from "react-icons/lia";


const ChannelDashboard = () => {

    const[cookie,setCookie,removeCookie]=useCookies();
    const[videos,setVideos]=useState<VideoContract[]>();
    let navigate =useNavigate();


    function loadVideos(url:string){
        axios.get(url).then(response=>{setVideos(response.data)
    })
    }

    function handleDeleteVideo(VideoId:string,Title:string){
         
          let flag = window.confirm(`Are you sure to delete \n${Title}`)
          if(flag){
               axios.delete(`http://127.0.0.1:6060/delete-video/${VideoId}`).then((res)=>{
                    alert(res.data)
              })
              
          }
         
    }

    useEffect(()=>{
        loadVideos(`http://127.0.0.1:6060/get-videos/${cookie.channel.ChannelId}`);
    },[])

  return (
    <section>
        <div className="container-fluid py-2">
          <h3 className="pb-2 d-flex align-items-center justify-content-between"><span>My Channel : {cookie.channel.ChannelName}</span> <Link to={`/upload-video/${cookie.channel.ChannelName}`} title="Upload new video" className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"><LiaUploadSolid className="fs-5"/>Upload</Link></h3>
          <div className="row">
              <div className="col-2 d-flex flex-column gap-2">
                  <Link className="fw-medium d-flex gap-3 align-items-center text-decoration-none text-dark" to="/channel-dashboard"><MdHome className="fs-4"/> <span>Home</span></Link>
                  <Link className="fw-medium d-flex gap-3 align-items-center text-decoration-none text-dark" to="/channel-dashboard"><RiAdminFill className="fs-4"/> <span>Profile</span></Link>
              </div>
              <div className="col-10">
                <table className="table table-hover border">
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Details</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                      videos?.map(video=>
                        <tr key={video.VideoId}>
                          <td>
                            <iframe src={video.Url} height="150" className="rounded-3"></iframe>
                            <div className="input-group"><button className="btn btn-sm border py-0"><BiLike/> <span style={{fontSize:"12px"}}>{video.Likes}</span></button><button className='btn btn-sm border py-0'><BiDislike/></button></div>
                          </td>
                          <td className="border">
                            <div className='fw-bold text-truncate mb-1'>{video.Title} </div>
                            <div style={{WebkitLineClamp:"3", display: "-webkit-box",WebkitBoxOrient:"vertical",overflow:"hidden",fontSize:"14px"}}>{video.Description}</div>
                            <div>{moment(video.Date).format('LLLL')}</div>
                            <div style={{WebkitLineClamp:"2", display: "-webkit-box",WebkitBoxOrient:"vertical",overflow:"hidden",fontSize:"13px"}} className="d-flex flex-wrap gap-1 my-2"><span className="fw-medium"> Tags:</span> 
                              {
                                video.Tags.map(tag=><span key={tag} className="px-2 bg-light rounded-4 border">{tag}</span>)
                              }
                            </div>
                          </td>
                          <td className="align-content-center"><Link to={`/edit-video/${video.VideoId}?title=${video.Title}`} className="btn" title="Edit video"><RiEdit2Fill/></Link><button onClick={()=>handleDeleteVideo(video.VideoId,video.Title)} className="btn" title="Delete video"><FaTrash/></button></td>
                        </tr>    
                      )
                      }
                    </tbody>
                </table>
              </div>
          </div>
        </div>
    </section>
  )
}

export default ChannelDashboard