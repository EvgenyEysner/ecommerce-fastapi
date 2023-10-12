"use client"

import { Input } from "../components/inputs/Input"
import { Heading } from "../components/product/Heading"
import React from "react"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { CartButton } from "../components/button/CartButton"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"

export const LoginForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    console.log(data)

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
    </>
  )
}
