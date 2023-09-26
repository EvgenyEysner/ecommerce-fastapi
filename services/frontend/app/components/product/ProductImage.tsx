import {ProductImageProps, SelectedImgType} from "@/types";
import Image from "next/image";
import React from "react";
import {images} from "next/dist/build/webpack/config/blocks/images";

export const ProductImage: React.FC<ProductImageProps> = ({
                                                            cartProduct,
                                                            product,
                                                            handleColorSelect,
                                                          }) => {
  return (
    <div
      className="grid
      grid-cols-6
      gap-2
      h-full
      max-h-[500px]
      min-h-[300px]
      sm:min-h-[400px]
    "
    >
      <div
        className="flex
      flex-col
      items-center
      justify-center
      gap-4
      cursor-pointer
      border
      h-full
      max-h-[500px]
      min-h-[300px]
      sm:min-h-[400px]
      "
      >
        {product.images.map(
          (image: { image: any; color?: string; colorCode?: string }) => {
            return (
              <div
                key={product.id}
                onClick={() => handleColorSelect(image as SelectedImgType)}
                className={`
                 relative w-[80%]
                 aspect-square
                 rounded
                 border-teal-300
                 ${cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border:none"
                }
                 `}
              >
                <Image
                  src={image.image}
                  alt={image.image.color}
                  fill
                  className="object-contain"
                />
              </div>
            );
          }
        )}
      </div>
      <div
        className='
        col-span-5
        relative
        acpect-square
      '
      >
        <Image src={cartProduct.selectedImg.image} fill alt={cartProduct.name} className='
          h-full
          w-full
          object-contain
          max-h-[500px]
          min-h-[300px]
          sm:min-h-[400px]
        '/>
      </div>
    </div>
  );
};
