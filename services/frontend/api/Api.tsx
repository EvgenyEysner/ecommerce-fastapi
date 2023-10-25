import useInterCeptor from "./interceptors";

const useApiHelper = () => {
  const axios = useInterCeptor();

  const api = {
    productsList: (params = {}) => axios.get(`/products`, params),
    productDetails: (id: number, params = {}) => axios.get(`products/${id}`, params),
    // createProduct: (id: number, data: any, params = {}) => axios.post(`products/${id}`, params),
    // deleteProduct: (id: number, params = {}) => axios.delete(`api/v1/delete-student/${id}`, params),
    // updateProduct: (id: number, data: any, params = {}) => axios.put(`api/v1/student-update/${id}/`, data, params)
  }

  return api;
}

export default useApiHelper;


// import axios from "axios"
// import { useState } from "react";

// async function GetApi(path: string) {
//   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
//   const [products, setProducts]: any = useState()
//   try {
//     await fetch(`${baseURL}${path}`)
//       .then(response => {
//         return response.json()
//       }).then(result => {
//         setProducts(result)
//         console.log('Products', products)
//       })
//   } catch (error) {
//     console.error(error);
//   }
//   return products
// }

// export default GetApi



//
