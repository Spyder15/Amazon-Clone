import Image from "next/future/image";
import React from "react";
import HelpGif from "../public/gifs/help.gif";

const Help = () => {
  return (
    <div className="w-full h-[88vh] overflow-y-auto px-5 flex justify-center items-center pb-40">
      <div className="flex border shadow-md w-full md:w-[800px] mx-auto mt-14 px-10 pb-10 md:p-14 items-center bg-white rounded-xl md:flex-row flex-col">
        <div className="md:w-[50%]">
          <Image
            src={HelpGif}
            alt="help"
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
                <label htmlFor="email" className="absolute -top-3 left-4 bg-white">Email</label>
                <input type="email" className="w-full border rounded-xl px-4 py-2 outline-none focus:border-[#ff9900]" placeholder="Enter Your Email Address" required />
            </div>
            <div className="relative">
                <label htmlFor="phone" className="absolute -top-3 left-4 bg-white">Problem</label>
                <textarea className="w-full border rounded-xl px-4 py-2 outline-none focus:border-[#ff9900] min-h-[15vh]" placeholder="Write Your Problem" required />
            </div>
            <div>
            <button className='w-full px-4 py-2 bg-gradient-to-b from-[#ffd900] to-[#ffb300] hover:bg-gradient-to-t transition-all rounded-md text-white'>Ask</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
