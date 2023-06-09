import Image from "next/future/image";
import React from "react";
import AddressGif from "../public/gifs/address.gif";

const Address = () => {
  return (
    <div className="w-full h-[88vh] overflow-y-auto px-5 py-10 flex justify-center items-center pb-40">
      <div className="flex border shadow-md md:w-[800px] w-full mx-auto mt-14 md:px-10 px-5 pb-10 md:p-14 items-center bg-white rounded-xl md:flex-row flex-col">
        <div className="md:w-[50%]">
          <Image
            src={AddressGif}
            alt="address"
            width={500}
            height={500}
            quality={100}
            priority={true}
            className="w-[200px] 2xl:w-[400px] mx-auto pointer-events-none"
          />
        </div>
        <form className="w-full md:w-[50%] space-y-7">
            <h1 className="text-4xl font-extrabold text-center md:text-left">Fill The Details</h1>
            <div className="relative">
                <label htmlFor="address" className="absolute -top-3 left-4 bg-white">Address</label>
                <input type="text" className="w-full border rounded-xl px-4 py-2 outline-none focus:border-[#ff9900]" placeholder="Enter Your Current Address" required />
            </div>
            <div className="relative">
                <label htmlFor="pincode" className="absolute -top-3 left-4 bg-white">Pincode</label>
                <input type="number" className="w-full border rounded-xl px-4 py-2 outline-none focus:border-[#ff9900]" placeholder="Enter Your Pincode" required />
            </div>
            <div className="relative">
                <label htmlFor="city" className="absolute -top-3 left-4 bg-white">City</label>
                <input type="text" className="w-full border rounded-xl px-4 py-2 outline-none focus:border-[#ff9900]" placeholder="Enter Your City" required />
            </div>
            <div className="relative">
                <label htmlFor="country" className="absolute -top-3 left-4 bg-white">Country</label>
                <input type="text" className="w-full border rounded-xl px-4 py-2 outline-none focus:border-[#ff9900]" placeholder="Enter Your Country" required />
            </div>
            <div className="relative">
                <label htmlFor="phone" className="absolute -top-3 left-4 bg-white">Phone Number</label>
                <input type="number" className="w-full border rounded-xl px-4 py-2 outline-none focus:border-[#ff9900]" placeholder="Enter Your Phone Number" required />
            </div>
            <div>
            <button className='w-full px-4 py-2 bg-gradient-to-b from-[#ffd900] to-[#ffb300] hover:bg-gradient-to-t transition-all rounded-md text-white'>Add / Update</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
