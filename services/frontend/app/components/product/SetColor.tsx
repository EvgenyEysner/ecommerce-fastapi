"use client"

import {SetColorProps} from "@/types";
import React from "react";

export const SetColor: React.FC<SetColorProps> = (
  {
    images,
    cartProduct,
    handleColorSelect
  }) =>
  (
    <div className='flex gap-4 items-center'>
      <span className='font-semibold'>Цвет: </span>
      <div className='flex gap-1'>
        {images.map(image => {
          return (
            <div key={cartProduct.id} className={
              `h-7 w-7 rounded-full border-teal-300 flex items-center justify-center
              ${
                cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'
              }`
            }
                 onClick={() => handleColorSelect(image)}
            >
              <div style={{background: image.colorCode}}
                   className='h-5 w-5 rounded-full border-[]1.2px border-slate-300 cursor-pointer'
              >
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )