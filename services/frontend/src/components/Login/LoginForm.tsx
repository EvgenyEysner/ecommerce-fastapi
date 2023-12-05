import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { AiOutlineGoogle } from "react-icons/ai"
import toast from "react-hot-toast"

import { Heading } from "../Product/Heading"
import { CartButton } from "@/UI/CartButton"
import { Input } from "@/UI/Input"

import { validatePassword } from "@/helpers/validatePassword"
import { validateEmail } from "@/helpers/validateEmail"

import { useAppDispatch } from "@/store/types"
import { addUser } from "@/store/reducers/UserSlice"

import { IUser } from "@/interfaces/user.interface"


export const LoginForm = () => {

  const dispatch = useAppDispatch()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    console.log(validateEmail(data.email));
    
    if (!validateEmail(data.email)) {
      setIsLoading(false)
      return toast.error('Введите корректный адрес электронной почты') 
    }

    if (validatePassword(data.password) !== true) {
      setIsLoading(false)
      return toast.error(validatePassword(data.password).toString())
    }
    
    const params = new URLSearchParams();
    params.append('username', data.email);
    params.append('password', data.password);
    
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    };
    
    try {
      await axios.post('http://localhost:5000/login', params, config);

      const res: AxiosResponse<IUser> = await axios.get('http://localhost:5000/users/whoami', {
        withCredentials: true,
      })

      dispatch(addUser(res.data))
      // dispatch(uncheckDataBase())
      router.push('/')
    } catch (e) {
      toast.error('Что-то пошло не так...')
      console.log(e);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Heading title='Sign In to E-Shop' />
      <CartButton outline label='Sign In with Google' icon={AiOutlineGoogle} onClick={() => { }} />
      <hr className='bg-slate-300 w-full h-px' />
      <Input
        id='email'
        label='E-Mail'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
      <CartButton label={isLoading ? 'Loading' : 'Login'} onClick={handleSubmit(onSubmit)} />
      <p className='text-sm'>
        У вас ещё нет аккаунта? <Link href='/register' className='underline'>Зарегистрироваться</Link>
      </p>
      <p className='text-sm'>
        <Link href='/' className='underline'>Главная</Link>
      </p>
    </>
  )
}
