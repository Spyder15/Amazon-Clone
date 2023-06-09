import React from 'react'
import { ImSpinner2 } from "react-icons/im"
const Prelaoder = () => {
  return (
    <div className='w-full h-screen flex justify-center bg-white items-center'>
        <ImSpinner2 className='inline animate-spin text-5xl md:text-8xl text-[#ff9900]' />
    </div>
  )
}

export default Prelaoder
