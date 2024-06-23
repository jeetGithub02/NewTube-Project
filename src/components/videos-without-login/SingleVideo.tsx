import React, { useEffect, useState } from 'react'
import { VideoContract } from '../../contracts/videoContract'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiDislike,BiLike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { IoIosMore } from "react-icons/io";
import moment from 'moment';

const SingleVideo = () => {
    const[video,setVideo]=useState<VideoContract>();
    const[videos,setVideos]=useState<VideoContract[]>();
    const params=useParams();


    useEffect(()=>{
        // axios.get(`http://127.0.0.1:6060/get-video/${params.VideoId}`).then(res=>{
        //    setVideo(res.data[0])
        // })
        axios.get(`http://127.0.0.1:6060/get-videos`).then(res=>{
            setVideos(res.data);
            setVideo(res.data.find((video:any)=>video.VideoId===params.VideoId))
        })

    })
  return (
    <section>
        <div className="container mt-2">
            <div className="row">
                <div className="col-lg-8">
                    <div><iframe title={video?.Title} className="rounded-4" src={video?.Url} style={{width:"100%", aspectRatio:"16/9"}}></iframe></div>
                    <h4 className="mt-md-2" style={{WebkitLineClamp:"2", display: "-webkit-box",WebkitBoxOrient:"vertical",overflow:"hidden"}}>{video?.Title}</h4>
                    <div className="px-1 d-flex align-items-center justify-content-between">
                       <div className='d-flex gap-2'>
                            <div className="rounded-circle bg-secondary" style={{height:"35px",width:"35px"}}> </div>
                            <div className="d-flex justify-content-between gap-2 align-items-center">
                                <div className="fw-medium">{video?.ChannelName}</div>
                                <div><button className="btn btn-dark rounded-5 py-1">Subscribe</button></div>
                            </div>
                       </div>
                        <div className="d-flex align-items-center gap-1" >
                            <div className="btn-group">
                                <button className="rounded-start-4 btn py-1 btn-light align-items-center"><BiLike className="fs-5"/> {video?.Likes}</button><button className="btn btn-light py-1 rounded-end-4 m-0"><BiDislike className="fs-5"/></button>
                            </div>
                            <button className="btn btn-light rounded-4 py-1 d-flex align-items-center gap-1 "><PiShareFat className="fs-5"/> Share</button>
                            <button className="btn btn-light rounded-4 py-1 d-flex align-items-center gap-1"><LiaDownloadSolid className="fs-5"/> Download</button>
                            <button className="btn p-2 btn-light rounded-circle d-flex align-items-center justify-content-center" style={{width:"35px",height:"35px"}}><IoIosMore className="fs-2"/></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    {videos?.map(video=>
                        <div key={video.VideoId} className='row my-2'>
                            <div className="col-md-5"><iframe src={video.Url} className="rounded-3" style={{width:"100%",aspectRatio:"16/9"}}></iframe></div>
                            <div className="col-md-7 py-1" style={{lineHeight:"18px"}}>
                                <div className="truncate2lines" >{video.Title}</div>
                                <div className='mt-1 text-secondary' style={{fontSize:"13px"}}>{video.ChannelId}</div>
                                <div className="text-secondary" style={{fontSize:"13px"}}>{moment(video.Date, "YYYYMMDD").fromNow()}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
  )
}

export default SingleVideo