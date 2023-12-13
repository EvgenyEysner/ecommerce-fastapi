import { NextPage } from "next"
import { Container } from "@/components/Container"
import { RootLayout } from "@/components/RootLayout"
import Link from "next/link"
import Head from "next/head"

const Error404: NextPage = () => {  

  return (
    <>
      <Head>
        <title>Online-Shop | 404</title>
      </Head>
      <RootLayout>
        <div className='p-8'>
          <Container>
            <div className="text-center my-[15px]">
              <h3 className="font-semibold sm:mb-[15px] mb-[8px] text-cyan-800 md:text-3xl sm:text-xl ">Страница не найдена!</h3>
              <Link href={'/'} className="transition ease-in-out delay-10 hover:text-gray-400 md:text-lg sm:text-sm text-[14px]">Вернуться на главную страницу</Link>
            </div>
          </Container>
        </div>
      </RootLayout>
    </>
    
  ) 
}

export default Error404 