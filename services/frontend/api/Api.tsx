import axios from "axios"
//
// export const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
// })


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`)

    const products = response.data

    console.log(`GET: Here's the list of todos`, products)

    return products
  } catch (errors) {
    console.error(errors)
  }
}


