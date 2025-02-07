import React from 'react';

const Card = () => {
  return (
    <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
      <div className="h-48  rounded-xl" >
        <img src='https://nauanaz.com/wp-content/uploads/2018/12/thuc-don-mon-an-hang-ngay.jpg'/>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Tên món ăn</span>
            <p className="text-xs text-gray-700">ID: 23432252</p>
          </div>
          <span className="font-bold text-red-600">$25.99</span>
        </div>
        <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">Add to cart</button>
      </div>
    </div>
  );
}

export default Card;
