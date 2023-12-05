import React, { useState } from "react"
import Link from "next/link"
import axios, { AxiosResponse } from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AiOutlineGoogle } from "react-icons/ai"
import { Heading } from "../Product/Heading"
import { CartButton } from "@/UI/CartButton"
import { Input } from "@/UI/Input"
import { validateEmail } from "@/helpers/validateEmail"
import { validatePassword } from "@/helpers/validatePassword"
import { useAppDispatch, useAppSelector } from "@/store/types"
import { IUser } from "@/interfaces/user.interface"
import { addUser } from "@/store/reducers/UserSlice"
import { useRouter } from "next/router"

export const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const user = useAppSelector(state => state.userReducer.user)

  if (user) router.push('/')

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    
    if (!validateEmail(data.email)) {
      setIsLoading(false)
      return toast.error('Введите корректный адрес электронной почты') 
    }

    if (validatePassword(data.password) !== true) {
      setIsLoading(false)
      return toast.error(validatePassword(data.password).toString())
    }    

    try {
      const res: AxiosResponse<IUser> = await axios.post('http://localhost:5000/register', {
        email: data.email,
        full_name: data.name,
        password: data.password,
        // is_admin: false
      })
      router.push('/login')
    } catch (e) {
      toast.error('Что-то пошло не так...')
      console.log(e);
    } finally {
      setIsLoading(false)
    }
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
        У вас уже есть аккаунт? <Link href='/login' className='underline'>Войти</Link>
      </p>
    </>
  )
}
