import {formatPrice} from "@/helpers/formatPrice"
import Link from "next/link"

export const SearchLink = ({product}: { product: any }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="bg-white flex w-full border-b-2 border-gray-300 justify-between p-[8px] gap-[16px] items-center"
    >
      <div className="flex-1">
        <h4 className="text-xl">{product.name}</h4>
        <p className="h-12 overflow-hidden text-ellipsis line-clamp-2">
          {product.description}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg">{formatPrice(product.price)}</p>
        {product.on_stock
          ? <p className="text-lime-600 text-sm">В наличии</p>
          : <p className="text-red-600 text-sm">Отсутствует</p>
        }
      </div>
    </Link>
  )
}
