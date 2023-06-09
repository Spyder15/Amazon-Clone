import Head from "next/head";
import Image from "next/future/image";
import DeliveryGif from "../public/gifs/delivery.gif";
import { BsLaptopFill, BsSmartwatch } from "react-icons/bs";
import { GiSofa, GiWrappedSweet } from "react-icons/gi";
import { AiOutlineMobile } from "react-icons/ai";
import { FaTshirt, FaBicycle, FaHeadphonesAlt, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import Link from "next/link";
import Card from "../components/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { v4 } from "uuid";


export async function getServerSideProps(context) {
  const products = await fetch('https://www.screentechnicals.com/api/ecommerce/products', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });
  const data = await products.json();
  
  return {
    props: {
      data,
    },
  }
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <span  onClick={onClick} className="slick-arrow absolute p-0 top-[37%] -right-10 cursor-pointer md:text-xl" style={{ ...style, display: "block", color:"black"}}><FaAngleRight /></span>
  );
}

function PrevArrow(props) {
const { className, style, onClick } = props;
return (
  <span  onClick={onClick} className="slick-arrow absolute p-0 top-[37%] -left-12 cursor-pointer md:text-xl" style={{ ...style, display: "block", color:"black"}}><FaAngleLeft /></span>
  
);
}

export default function Home({ data }) {
  let componets = [
    {
      icon: <BsLaptopFill key={v4()} />,
      category: "laptop"
    },
    {
      icon: <GiSofa key={v4()} />,
      category: "sofa"
    },
    {
      icon: <AiOutlineMobile key={v4()} />,
      category: "phone"
    },
    {
      icon: <FaTshirt key={v4()} />,
      category: "tshirt"
    },
    {
      icon: <FaBicycle key={v4()} />,
      category: "cycle"
    },
    {
      icon: <FaHeadphonesAlt key={v4()} />,
      category: ""
    },
    {
      icon: <BsSmartwatch key={v4()} />,
      category: "watch"
    },
    {
      icon: <GiWrappedSweet key={v4()} />,
      category: "sweet"
    },
    {
      icon: <IoGameController key={v4()} />,
      category: "game"
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "linear",
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };

  return (
    <div className="w-full h-[88vh] md:p-10 p-3 overflow-y-auto">
      <div className="w-full xl:h-[40vh] h-[25vh] magic-gradient rounded-xl shadow-xl flex items-center xl:justify-between justify-center xl:flex-row flex-col">
        <div className="text-white md:p-10 p-5 md:space-y-4 space-y-3 md:text-left text-center">
          <h1 className="2xl:text-6xl md:text-5xl text-xl tracking-widest uppercase">
            Free Delivery
          </h1>
          <p>
            Don&#39;t miss it out! Only today, get free Next Day Delivery on all
            your orders.
          </p>
          <div>
            <Link href={"/products"}>
              <button className="bg-white text-black px-4 py-2 rounded-md tracking-widest hover:bg-[#000] hover:text-white transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[40%] xl:block hidden">
          <Image
            src={DeliveryGif}
            alt="gif"
            width={500}
            height={500}
            className="xl:w-[500px] w-[200px] pointer-events-none"
          />
        </div>
      </div>
      <div className="p-5">
        <h1 className="md:text-3xl text-xl font-bold text-center my-3">
          Popular Categories ✨
        </h1>
        <div className="flex items-center justify-center flex-wrap">
        {componets.map((component) => {
            return (
              <span key={v4()} >
                <Link href={`/category/${component.category.toLocaleLowerCase()}`}>
                  <div className="m-2 border p-5 rounded-xl bg-white shadow-md cursor-pointer hover:scale-90 transition-transform">
                    <span className="md:text-4xl 2xl:text-7xl text-2xl">
                      {component.icon}
                    </span>
                  </div>
                </Link>
              </span>
            );
          })}
        </div>
      </div>
      <div className="p-5">
        <h1 className="md:text-3xl text-xl text-center font-bold pb-5">
          Hot Deals 🔥
        </h1>
        <div className="relative px-3">
        <Slider {...settings}>
          {
            data?.slice(0, 10)?.map((product)=> <Card key={product.id} product={product} />)
          }
        </Slider>
        </div>
      </div>
    </div>
  );
}
