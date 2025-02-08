import { Link} from 'next/link';
 
 function Display({data,heading}) {
    
  return (
    <div className='w-[90%] xl:w-[80%] mx-auto my-[60px]'>
        <div className='flex flex-col items-center py-3'>  
        <h1 className='font-bold text-2xl lg:text-4xl my-[20px] '>{heading}</h1>
       <Link href=""> <button className='border border-gray-100 p-2 hover:border-black transition ease-in-out duration-[0.5s] mb-[10px]'>VIEW ALL</button></Link>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 cursor-pointer gap-x-1 gap-y-4'>
            {/* {
                data.map((item)=>{
                        return (
                            <Link href={`/${item.sub_category}/product/${item.id}`}>
                            <div key={item._id} className='relative my-[10px] p-2'>
                                <p className={item.sale ? "text-white bg-red-600 inline p-[3px] md:px-2 md:py-1 absolute right-0" : 'hidden' }>sale</p>
                                <div className='flex flex-col justify-center items-center'>
                                <img src={item.image} /> 
                                <h3 className='text-sm md:text-base lg:text-lg  mb-[10px] text-center'>{item.name}</h3>
                                </div>
                                <div className='w-[95%] flex gap-2 sm:justify-around mx-auto text-xs sm:text-sm md:text-base xl:text-lg'>
                                    <p className="">Rs 7000</p>
                                    <p className={`${!item.sale ? 'inline mx-auto' : null} `}>Rs { item.price}.00</p>
                                     <h3 className={`text-red-500 ${!item.sale ? 'hidden': null} `}>save {100 - (Math.ceil(item.new_price/Number(item.old_price) * 100))}%</h3>
                                </div>   
                            </div>
                            </Link>
                        )
                    
                }).slice(0,8)
            } */}
        </div>
    </div>
  )
}

export default Display