"use client"


import { Input } from "../components/inputs/Input"
import { Heading } from "../components/product/Heading"
import React from "react"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { CartButton } from "../components/button/CartButton"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"

export const RegisterForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
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
      <Heading title='Sign Up to E-Shop' />
      <CartButton outline label='Sign up with Google' icon={AiOutlineGoogle} onClick={() => { }} />
      <hr className='bg-slate-300 w-full h-px' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
      <CartButton label={isLoading ? 'Loading' : 'Sign Up'} onClick={handleSubmit(onSubmit)} />
      <p className='text-sm'>
        У вас уже есть аккаунт? <Link href='/login' className='underline'>Log in</Link>
      </p>
    </>
  )
}
