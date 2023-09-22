import {SetQuantityProps} from "@/types";
import React from "react";


export const SetQuantity:React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  const btnStyle = 'border-[1.2px] border-slate-300 p-2 rounded'

  return (
    <div className='flex gap-8 items-center'>
      {cartCounter ? null : <div className='font-semibold'>
        Кол-во:
      </div>
      }
      <div className='flex gap-4 items-center text-base'>
        <button onClick={handleQtyDecrease} className={btnStyle}>-</button>
        <div>{cartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={btnStyle}>+</button>
      </div>
    </div>
  )
}
