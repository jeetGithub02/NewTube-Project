import React, { useEffect, useState } from 'react'
import { VideoContract } from '../../contracts/videoContract';
import "./video.css"
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineWatchLater } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchLater } from '../../slicers/video-slicer';
import  { RootState } from '../../store/store';

const VideoWithoutLogin = () => {

    const[categories,setCategories]=useState<string[]>();
    const[videos,setVideos]=useState<VideoContract[]>();
    let navigate=useNavigate();
    const dispatch=useDispatch();
    const laterVideos=useSelector((state:RootState)=>state.video.videos)


    function loadVideos(url:string){
        axios.get(url).then(res=>{
            setVideos(res.data);
        })
    }

    function videoClick(e:any){
          if(e.target.id){
            console.log(e.target.id)
            navigate(`/watch/${e.target.id}?channel=${e.target.title}`)
          }
    }
    function loadCategories(){
        axios.get(`http://127.0.0.1:6060/get-categories`).then(res=>{
            setCategories(res.data)
        })
    }

    function handleWatchLater(video:VideoContract){
        dispatch(addToWatchLater(video));
        console.log(laterVideos)
      
        
    }

    function categoryVideoClick(e:any){
       if(e.target.textContent!=="Home"){
        setVideos(pre=>pre?.filter(v=>v.Category==e.target.textContent));
        navigate(`/?category=${e.target.textContent}`)
       }else{
            loadVideos(`http://127.0.0.1:6060/get-videos`);
       }
    }

    useEffect(()=>{
        loadVideos(`http://127.0.0.1:6060/get-videos`);
        loadCategories();
    },[])
  return (
    <section>
        <div className="container-fluid mt-2">
            <div className="text-right"><span className="fw-medium">Watch later:</span> {laterVideos.length} videos</div>
            <div className="row row-gap-2">
                <div className="col-lg-2" onClick={categoryVideoClick}>
                         
                   <ul className="d-flex flex-column gap-1 list-unstyled">
                      <li className='btn btn-light w-lg-100 text-start fw-medium'><Link to="/" className="text-decoration-none text-dark" >Home</Link></li>
                    {
                            categories?.map(category=>
                                <li key={category} className="btn btn-light w-lg-100 text-start fw-medium">{category}</li>
                            )
                        }
                   </ul>

                </div>
                <div className="col-lg-10">
                <div onClick={videoClick} className="row row-gap-md-4 row-gap-2 row-cols-1  row-cols-md-2 row-cols-lg-3">
                {
                  videos?.map(video=>
                    <div key={video.VideoId} className="col">
                        <iframe src={video.Url} width="100%" style={{aspectRatio:"16/9"}} className="rounded-4"></iframe>
                        <div className="row px-2">
                            <div className="col-2 rounded-circle bg-secondary" style={{height:"35px",width:"35px"}}></div>
                            <div className='col-10' style={{lineHeight:"20px"}}>
                                <div id={video.VideoId} className='fw-medium title truncate2lines'  title={video.ChannelName} >{video.Title}</div>
                                <div style={{fontSize:"14px",marginTop:"5px"}} className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <div>{video.ChannelName}</div>
                                        <div>{moment(video.Date, "YYYYMMDD").fromNow()}</div>
                                    </div>
                                    <div>
                                        <button onClick={()=>handleWatchLater(video)} className="btn btn-sm btn-light" title="Save for watch later"><MdOutlineWatchLater/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  )  
                }
            </div>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default VideoWithoutLogin