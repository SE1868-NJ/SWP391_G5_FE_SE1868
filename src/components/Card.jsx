import React from 'react';
import { formatMoney } from '../utils';

const Card = ({item}) => {
  // console.log("item",item);
  
  return (
    <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
      <div className="h-48  rounded-xl" >
        <img className='h-48 w-60' src={item.ProductImg}/>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold">{item.ProductName}</span>
            <p className="text-xs text-gray-700">SL: {item.StockQuantity}</p>
          </div>
          <span className="font-bold text-red-600">{formatMoney(item.Price)} VND</span>
        </div>
        <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md">Add to cart</button>
      </div>
    </div>
  );
}

export default Card;
