import React from "react";
import { ContainerProps } from "@/types";


export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (<div className='max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4'>{children}</div>)
}
