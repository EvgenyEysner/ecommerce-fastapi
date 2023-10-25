import axios from 'axios';
export const NEXT_PUBLIC_APP_API_URL = process.env.NEXT_PUBLIC_APP_API_URL || "http://127.0.0.1:5000/"
const useInterCeptor = () => {

  const instance = axios.create({
    baseURL: NEXT_PUBLIC_APP_API_URL,
    timeout: 10000,
  });

  instance.defaults.timeout = 10000;
  instance.defaults.headers.common['Content-Type'] = 'application/json';
  instance.defaults.headers.common['Accept'] = 'application/json';


  instance.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      if (error.response.status === 500) {
        console.log("Internal Server Error");
      } else if (error.response.status === 403) {
        console.log(error?.response?.data.detail);
      } else if (error.response.status === 404) {

      } else if (error.response.status === 400) {

      } else if (error.response.status === 409) {

      } else if (error.response.status === 401) {
        localStorage.clear()
      }
      return Promise.reject(error)
    }
  );

  return (instance);

}

export default useInterCeptor;
