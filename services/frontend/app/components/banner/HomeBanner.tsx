import React from "react";
import Image from "next/image";

export const HomeBanner: React.FC = () => {
  return (
    <div className='relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8'>
      <div className='mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly'>
        <div className='mb-8 md:mb-0 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>Распродажа</h1>
          <p className='text-lg md:text-xl text-white mb-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, repellendus!
          </p>
          <p className='text-2xl md:text-5xl text-yellow-400 font-bold'>Скидка до 50%</p>
        </div>
        <div className='w-1/2 relative aspect-video'>
          <Image
            src='/banner-image.png'
            alt='распродажа'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  )
}
