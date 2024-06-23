import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { VideoContract } from '../../contracts/videoContract';
import { useFormik } from 'formik';
import axios from 'axios';

const EditVideo = () => {
    const params=useParams();
    const[video,setVideo]=useState<VideoContract>();
    const[categories,setCategories]=useState<string[]>();
    const[tagInput,setTagInput]=useState<string>('');
    const[tags,setTags]=useState<string[]>([]);
    let navigate=useNavigate()

    function addTag(){
        setTagInput("");
        setTags(pre=>[tagInput,...pre])
    }

    function tagInputChange(e:any){
        setTagInput(e.target.value)
    }       

    const formik=useFormik({
        initialValues:{
                VideoId:video?.VideoId,
                Url:video?.Url,
                Title:video?.Title,
                Description:video?.Description,
                Likes:video?.Likes,
                Dislikes:video?.Dislikes,
                Category:video?.Category,
                Tags:video?.Tags,
                ChannelId:video?.ChannelId,
                ChannelName:video?.ChannelName,
                Date:video?.Date
        },
        onSubmit:(video)=>{
           
            video.Tags?.push(...tags);
            axios.put(`http://127.0.0.1:6060/edit-video/${params.VideoId}`,video).then(res=>{
                alert(res.data);
                console.log(res.data)
            })
            navigate('/channel-dashboard')
        },
        enableReinitialize:true
    })
    useEffect(()=>{
        axios.get(`http://127.0.0.1:6060/get-video/${params.VideoId}`).then(res=>{
            console.log(res.data[0])
            setVideo(res.data[0]);
        })
        axios.get(`http://127.0.0.1:6060/get-categories`).then(res=>{
            setCategories(res.data)
        })
    },[])

  return (
    <section className="pt-3">
        <div className="container border py-2 rounded-3">
            <form onSubmit={formik.handleSubmit} >
                <dl className="row">
                    <dt className="col-12 mb-3 d-flex align-items-center justify-content-between fs-4"><span className="flex-grow-1 text-center">Edit video  </span> <Link to="/channel-dashboard"  className="text-dark"><IoCloseSharp title="Cancel"/></Link></dt>
                    <dt className="col-md-3">Title</dt>
                    <dd className='col-md-9'><input type="text" name="Title" value={formik.values.Title} onChange={formik.handleChange} className="form-control" /></dd>
                    <dt className='col-md-3'>Description</dt>
                    <dd className='col-md-9'><textarea rows={5} name="Description" value={formik.values.Description} className='form-control'></textarea></dd>
                    <dt className="col-md-3">Category</dt>
                    <dd className='col-md-9'><select name="Category" value={formik.values.Category} className='form-select'>{categories?.map(category=><option value={category} key={category}>{category}</option>)}</select></dd>
                    <dt className="col-md-3">Tags</dt>
                    <dd className="col-md-9 d-flex gap-1 ">
                        <input onChange={tagInputChange} placeholder="Write tag here" value={tagInput} type="text" className='form-control' />
                        <button onClick={addTag} type="button" className="btn btn-secondary">Add</button>
                        <div className="d-flex gap-1 w-100 overflow-hidden border rounded-2 align-items-center p-2"  style={{fontSize:"13px",overflow:"hidden",whiteSpace:"nowrap"}}>{tags.map(tag=><span key={tag} className="px-2 rounded-4 border">{tag}</span>)}</div>
                    </dd>
                </dl>
                <div className='text-center'><button type="submit" className="my-2 btn btn-dark">Update</button></div>
            </form>
        </div>
    </section>
  )
}

export default EditVideo