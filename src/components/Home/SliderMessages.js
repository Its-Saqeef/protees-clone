"use client"
import React,{useEffect, useState} from 'react'

function SliderMessages() {

  const messages=["Free Shipping on all orders above 2000","Hassle Free Returns 7-day postage pay returns","Happy Shopping"]

  const [index,setIndex]=useState(0)

  useEffect(() => {  

    const timeout = setTimeout(() => {
      setIndex((prevIndex) => {
        if (prevIndex < messages.length - 1) {
          return prevIndex + 1
        } else {
          return 0
        }
      })
    }, 4000)

    return () => clearTimeout(timeout)  // This cleans up the timeout on component unmount or re-run
  }, [index])

  return (
    <section className='w-full '>
      <div className='flex items-center text-white text-sm p-2 justify-center bg-red-700'>
        <p>{messages[index]}</p>
      </div>
    </section>
  )
}

export default SliderMessages