import Image from "next/future/image";
import React from "react";
import { v4 } from "uuid";

const OrderCard = ({ order }) => {
  const date = new Date(
    order?.data()?.createdAt?.seconds * 1000
  ).toDateString();

  return (
    <div className="w-full p-5 border rounded-xl shadow-md">
      <div className="flex justify-between space-x-3">
        <div>
          <p className="uppercase md:text-lg text-sm">order id</p>
          <p className="text-xs text-gray-600">#{order?.id}</p>
        </div>
        <div>
          <p className="uppercase md:text-lg text-sm">Date</p>
          <p className="text-xs text-gray-600">{date}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center space-x-3">
        {JSON.parse(order?.data()?.images)?.map((image) => (
          <div key={v4()}>
            <Image
              src={image}
              alt="image"
              width={100}
              height={100}
              priority={true}
              quality={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
