import { useState } from "react";
import Image from "next/image";
import { IImage, IProduct } from "@/interfaces/product.interface";

interface ProductImageProps {
  product: IProduct,
}

export const ProductImage: React.FC<ProductImageProps> = ({
  product,
}) => {
  const [selectedImg, setSelectedImg] = useState(0)
  return (
    <div
      className="
        grid
        grid-cols-6
        gap-2
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
      "
    >
      <div
        className="
          flex
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
          (image: IImage, index) => {
            return (
              <div
                key={image.id}
                onClick={() => setSelectedImg(index)}
                className={`
                 relative w-[80%]
                 aspect-square
                 rounded
                 border-teal-300
                 ${selectedImg === index
                    ? "border-[1.5px]"
                    : "border:none"
                  }
                 `}
              >
                <Image
                  src={image.src}
                  alt={image.name}
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
        <Image 
          src={product?.images[selectedImg]?.src} 
          fill 
          alt={product?.images[selectedImg]?.name} 
          className='
            h-full
            w-full
            object-contain
            max-h-[500px]
            min-h-[300px]
            sm:min-h-[400px]
          '
        />
      </div>
    </div>
  );
};