import { useEffect, useState } from "react"
import { fakestoreProduct } from "../contracts/fakestoreProductContract";
import axios from "axios";
import { RiMenu3Fill } from "react-icons/ri";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";

export default function APIDemo(){
    const[categories,setCategories]=useState<string[]>();
    const[products,setProducts]=useState<fakestoreProduct[]>();

    function loadCategoris():void{
        axios.get(`https://fakestoreapi.com/products/categories`)
        .then(res=>{res.data.unshift("all")   
                    setCategories(res.data)
                    })
    }

    function loadProducts(url:string):void{
        axios.get(url).then(res=>setProducts(res.data))
    }    
    
    function handleCategoryChange(e:any){
        if(e.target.value!="all"){
            loadProducts(`https://fakestoreapi.com/products/category/${e.target.value}`)
        }else{
            loadProducts(`https://fakestoreapi.com/products`)
        }
    }

    useEffect(()=>{
            loadCategoris();
            loadProducts(`https://fakestoreapi.com/products`);
    },[])
    return(
       <>
       <header className="bg-light py-1">
            <div className="container d-flex align-items-center justify-content-between">
                <h2>ApnaShop.</h2>
                <button className='btn fs-4 p-1 py-0'><RiMenu3Fill/></button>
            </div>
       </header>
       <section>
            <div className="container-fluid pt-md-3 pt-2">
                <div className="row row-gap-3">

                    <div className="col-md-2 ">
                        <div className='fw-medium'>Select Category</div>
                        <select name="" className="form-select" onChange={handleCategoryChange}>
                           {
                           categories?.map(category=>
                            <option key={category} value={category} >{category.toUpperCase()}</option>
                           )} 
                        </select>
                    </div>

                    <div className="col-md-10 " style={{maxHeight:"calc(100vh - 80px)",overflowY:"auto"}} >
                        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 row-gap-3">
                            { 
                              products?.map(product=>
                                <div key={product.id} className="col px-2">
                                    <div className="card">
                                        <img src={product.image} alt="Product Image" height="200" width="100%" className="card-img-top object-fit-contain"/>
                                        <div className="card-body pb-1">
                                            <h6 className="text-truncate my-1">{product.title}</h6>
                                            <div style={{WebkitLineClamp:"2", display: "-webkit-box",WebkitBoxOrient:"vertical",overflow:"hidden",lineHeight:"16px",fontSize:"14px"}}>{product.description}</div>
                                            <div className='mt-2 row align-items-center'>
                                                    <div  className='col p-1 fs-4 fw-medium'> ${product.price}</div>
                                                
                                                    <div className="col p-0 text-end">
                                                        <span className="badge bg-success ">{product.rating.rate} <MdOutlineStar/></span><span className="badge p-1 text-secondary">{product.rating.count}</span>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="card-footer p-0">
                                            <button className="bi bi-cart3 btn fw-medium w-100">Add to <MdAddShoppingCart/></button>
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
       </>
    )
}