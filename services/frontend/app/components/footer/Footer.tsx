import React from "react";
import { Container } from "@/app/Container";
import { FooterList } from "@/app/components/footer/FooterList";
import Link from "next/link";
import { FaTelegram, FaVk, FaWhatsapp, FaYoutube } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className='bg-slate-700 text-slate-200 text-sm mt-16'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Категории</h3>
            <Link href='#'>Категория 1</Link>
            <Link href='#'>Категория 2</Link>
            <Link href='#'>Категория 3</Link>
            <Link href='#'>Категория 4</Link>
            <Link href='#'>Категория 5</Link>
            <Link href='#'>Категория 6</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Покупателю</h3>
            <Link href='#'>Категория 1</Link>
            <Link href='#'>Категория 2</Link>
            <Link href='#'>Категория 3</Link>
            <Link href='#'>Категория 4</Link>
            <Link href='#'>Категория 5</Link>
            <Link href='#'>Категория 6</Link>
          </FooterList>
          <div className='w-full md:w-1/3 mb-6 md:mb-0'>
            <h3 className='text-base font-bold mb-2'>О нас</h3>
            <p className='mb-2'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              A accusantium facere inventore nostrum praesentium repudiandae
              sed voluptatibus! Cum libero magni, officiis omnis quaerat sequi sunt totam?
              Distinctio ipsam nulla totam!
            </p>
            <p>&copy; {new Date().getFullYear()} Online Shop All rights reserved</p>
          </div>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Мы в соцсетях</h3>
            <div className='flex gap-2'>
              <Link href='#'><FaTelegram size={24} /></Link>
              <Link href='#'><FaVk size={24} /></Link>
              <Link href='#'><FaWhatsapp size={24} /></Link>
              <Link href='#'><FaYoutube size={24} /></Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  )
}
