"use client"
import { CldImage } from 'next-cloudinary'
import React, { useEffect,useState } from 'react'
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Editproduct from './Editproduct'

function ListProducts({data}) {
    useEffect(()=>{
        document.title="Dashboard- All Products"
    },[])
    const [showConfirm, setShowConfirm] = useState(false)
    const [isLoading,setLoading]=useState(false)
    const [Id,setId]=useState()
    const [editPage,setEditPage]=useState(false)
    const [product,setProduct]=useState()

    const handleDelete=async()=>{
        setLoading(true)
        const response=await axios.get(`/api/deleteproduct/${Id}`).then((res)=>res.data)
        setLoading(false)
        setShowConfirm(false)
        if(response.success){
            toast.success("Product Deleted")
        }
    }
    
    return (
    <main className={`w-[90%] mx-auto ${editPage ? "" : ""}`}>
        <h1 className='font-bold text-2xl lg:text-4xl my-[20px] text-gray-800 tracking-widest text-center'>All Products ({data.length})</h1>
        <div className='w-[90%] lg:w-[70%] 2xl:w-[50%] mx-auto'>
            {
                data.map((item,i)=>{
                    return (
                        <div key={i} className='flex items-center gap-4 border-2 p-2 my-2 w-full relative flex-wrap' >
                            <Link href={`/collections/${item.subcategory}/product/${item._id}`} target='blank'>
                            <CldImage src={item.images[0]} alt='phtot' height={150} width={150} />
                            </Link>
                            <div className='flex flex-col gap-2 self-start w-[50%]'>
                                <h1>{item.name}</h1>
                                <h1 className='capitalize'>Category : {item.category}</h1>
                                <h4>Rs {item.price.toLocaleString("en-IN")}.00</h4>
                                <h6 className={`text-red-500 ${item.sale !=0 ? "block" : "hidden"}`}>Sale{item.sale}%</h6>
                                <p>Active : {item.isActive ? "Yes" : "No"}</p>
                                <div className='flex gap-4'>
                                    <button className='bg-green-600 text-white px-4 py-2 rounded-md' onClick={()=>{setEditPage(true),setProduct(item)}}>Edit</button>
                                    <button className='bg-red-600 text-white px-4 py-2 rounded-md' onClick={()=>{setId(item._id);setShowConfirm(true)}}>Delete</button>
                                </div>
                                
                            </div>
                            <table className='text-center right-8 md:absolute'>
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    item.sizes.map((size,i)=>{
                                        return <tr key={i}>
                                            <td>{size.size}</td>
                                            <td>{size.quantity}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </div>
        <DeleteConfirmationModal
         isOpen={showConfirm}
         onConfirm={handleDelete}
         onCancel={() => setShowConfirm(false)}
         loading={isLoading}
        />
        <div >
           { editPage && <Editproduct
            setEditPage={setEditPage} 
            editPage={editPage}
            product={product}
            />
           }
        </div>
    </main>
  )
}

export default ListProducts
