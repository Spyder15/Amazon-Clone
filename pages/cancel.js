import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import CancelGif from "../public/gifs/cancel.gif";

const Cancel = () => {
  return (
    <div className="absolute w-full h-screen bg-white z-[999] text-center p-5">
      <div className="space-y-3 pt-10">
        <h1 className="text-3xl md:text-4xl font-semibold">❌ Opps! Try Again</h1>
        <p>Something went wrong</p>
        <Image
          src={CancelGif}
          alt=""
          width={500}
          height={500}
          className="w-[300px] mx-auto"
        />
      </div>
    </div>
  );
};

export default Cancel;
