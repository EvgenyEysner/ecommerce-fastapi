import { HeadingProps } from "@/types";
import React from "react";

export const Heading: React.FC<HeadingProps> = ({ title, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className='font-bold text-2xl'>{title}</h1>
    </div>
  )
}
