import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import { IoVideocam } from "react-icons/io5";
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UploadVideo = () => {
    let navigate=useNavigate();
    const[cookie,setCookie,removeCookie]=useCookies(['channel']);
    const[categories,setCategories]=useState<string[]>();
    const[tagInput,setTagInput]=useState<string>('');
    const[tags,setTags]=useState<string[]>([]);

    function tagsChange(e:any){
        setTagInput(e.target.value);
    }
    function addTag(){
        setTagInput("");
        setTags(pre=>[tagInput,...pre])
    }

    const formik=useFormik({
      initialValues:{
          VideoId:"",
          Url:"",
          Title:"",
          Description:"",
          Likes:0,
          Dislikes:0,
          Category:"",
          Tags:tags,
          ChannelId:cookie.channel.ChannelId,
          ChannelName:cookie.channel.ChannelName
      },
      onSubmit:(video)=>{
          video.VideoId=video.VideoId+cookie.channel.ChannelId;
          video.Tags=tags;
          console.log(video);
          axios.post(`http://127.0.0.1:6060/upload-video/${cookie.channel.ChannelId}`,video).then(res=>{
            alert(res.data);
            navigate("/channel-dashboard")
          })
      }
    })

    function loadCategories(){
        axios.get(`http://127.0.0.1:6060/get-categories`).then(res=>{
         res.data.unshift("Select a category") ;
         setCategories(res.data)
        })
    }
    useEffect(()=>{
        loadCategories();
    },[])
  return (
    <section className="pt-3">
        <div className="container border rounded-3 py-2">
            <form onSubmit={formik.handleSubmit}>
                 <dl className='row'>
                    <dt className="col-12 mb-3 d-flex align-items-center justify-content-between fs-4"><span className="flex-grow-1 text-center">Upload new video</span> <Link to="/channel-dashboard"  className="text-dark"><IoCloseSharp title="Cancel"/></Link></dt>
                    <dt className="col-md-3">Video ID</dt>
                    <dd className="col-md-9"><input type="number" placeholder="Numeric only 1 to n" onChange={formik.handleChange} name="VideoId" id="" className="form-control" /></dd>
                    <dt className="col-md-3">Video URL</dt>
                    <dd className="col-md-9"><input type="text" defaultValue="http://www.youtube.com/embed/" className="form-control" onChange={formik.handleChange} name="Url" /></dd>
                    <dt className="col-md-3">Title</dt>
                    <dd className="col-md-9"><input type="text" placeholder="Enter title" className="form-control" onChange={formik.handleChange} name="Title" /></dd>
                    <dt className="col-md-3">Description</dt>
                    <dd className="col-md-9"><textarea rows={5} name="Description" placeholder="Enter description" onChange={formik.handleChange} className="form-control"></textarea></dd>
                    <dt className="col-md-3">Category</dt>
                    <dd className="col-md-9">
                      <select name="Category" className="form-select" onChange={formik.handleChange}>
                        {
                          categories?.map(category=><option value={category} key={category}>{category}</option>)
                        }
                      </select>
                    </dd>
                    <dt className="col-md-3">Tags</dt>
                    <dd className="col-md-9 d-flex gap-2"><div className='input-group'><input type="text" placeholder="Enter tag and click on add" onChange={tagsChange} value={tagInput}  className="form-control" /><button type="button" onClick={addTag} className="btn btn-sm btn-light">Add</button> </div><div id="tagsList" className='w-100 p-2 d-flex gap-1 align-items-center border rounded-2' style={{fontSize:"13px",overflow:"hidden",whiteSpace:"nowrap"}}>{tags.map(tag=><span className="px-2 rounded-3 border" key={tag}>{tag}</span>)} </div></dd>
                </dl>
                <div><button type="submit" className="mt-3 mb-2 mx-auto btn btn-sm btn-primary d-flex align-items-center gap-1">Upload <IoVideocam className="fs-5"/></button></div>
            </form>
        </div>
    </section>
  )
}

export default UploadVideo