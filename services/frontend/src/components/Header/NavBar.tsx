import React, {useEffect, useMemo, useRef, useState} from "react";
import Link from "next/link";
import axios from "axios";
import {Redressed} from "next/font/google";
import {Container} from "../Container";
import {CartCount} from "./CartCount";
import {useAppSelector} from "@/store/types";
import {SearchLink} from "./SearchLink";

interface IProductSearch {
  id: string,
  name: string,
  description: string,
  quantity: number,
  on_stock: boolean,
  brand: string,
  price: number,
  category_id: number
}

const redressed = Redressed({subsets: ['latin'], weight: ['400']});
export const NavBar: React.FC = () => {
  const user = useAppSelector(state => state.userReducer.user)
  const [top, setTop] = useState(64)
  const [value, setValue] = useState('')
  const [isNotFound, setIsNotFound] = useState(false)
  const [products, setProducts] = useState<Array<IProductSearch>>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [dropDownVisible, setDropDownVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current)
      setTop(ref.current.offsetHeight)
  }, [ref]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setProducts([])
      setIsNotFound(false)
      if (value !== '')
        search()
    }, 700);

    return () => clearTimeout(timerId);
  }, [value])

  useEffect(() => {
    if (value.length === 0 || !isInputFocused) {
      setTimeout(() => {
        setDropDownVisible(false)
      }, 100)
    } else {
      setDropDownVisible(true)
    }
  }, [value, isInputFocused])

  const search = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/search?query=${value}`)
      setProducts(res.data)
      if (res.data.length === 0)
        setIsNotFound(true)
    } catch (e) {
      console.error(e);
    }
  }

  const memoizedProducts = useMemo(
    () => products.map(product => <SearchLink key={product.id} product={product}/>),
    [products]
  );

  return (
    <div ref={ref} className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            <Link href='/' className={`${redressed.className} font-bold text-2xl flex-1`}>
              Online Shop
            </Link>
            <input
              type="text"
              placeholder="Поиск"
              className='
                hidden md:block mx-auto focus:outline-none focus:border-none
                bg-none w-60 border-none px-[15px] text-center bg-transparent w-[65%]'
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-[65%]
                ${dropDownVisible ? 'visible' : 'hidden'}
                overflow-y-auto overflow-x-hidden max-h-[466px]`}
              style={{top: top + 'px'}}
            >
              {isNotFound &&
                <div className="text-center p-[64px] bg-white text-[20px]">
                  Товары не найдены!
                </div>
              }
              {memoizedProducts}
            </div>
            <div className='flex flex-1 items-center md:12 gap-8 justify-end'>
              <div>
                <CartCount/>
              </div>
              {user
                ? <Link href={'/'}>UserMenu</Link>
                : <Link href={'/login'}>LogIn</Link>
              }
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
