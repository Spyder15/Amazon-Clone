import Image from "next/future/image";
import ErrorGif from '../public/gifs/error.gif'

export default function Custom404() {
    return (
        <div className="absolute top-0 left-0 bg-white w-full h-screen z-[999] flex justify-center items-center">
            <Image src={ErrorGif} alt="404" width={300} height={300} priority={true} quality={100} className="pointer-events-none" />
        </div>
    )
  }