import { IUseCart } from "@/interfaces/cart.interface";
import { IProductCart } from "@/interfaces/product.interface";

const useCart = (): IUseCart => {

  // удаление продукта из корзины
  const deleteOneProductInCart = (id: number) => {
    const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (productsInCart) {
      const products: IProductCart[] = JSON.parse(productsInCart)
      const updatedProducts = products.filter(product => product.id !== id);
      window.sessionStorage.setItem('productsInCart', JSON.stringify(updatedProducts));
    }
  }

  // общее количество товара в корзине
  const cartTotalQty = () => {
    const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (productsInCart) {
      const products: IProductCart[] = JSON.parse(productsInCart)
      const countProducts = products.reduce((accumulator, product) => accumulator + product.quantity, 0)
      return countProducts
    }

    return 0
  }

  // добавление продукта в корзину
  const addProductToCart = (product: IProductCart) => {
    const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (productsInCart) {
      const products: IProductCart[] = JSON.parse(productsInCart)
      products.push(product)
      window.sessionStorage.setItem('productsInCart', JSON.stringify(products))
    } else {
      const products = [product]
      window.sessionStorage.setItem('productsInCart', JSON.stringify(products))
    }
  };

  // проверка продукта на наличие в корзине
  const isProductInCart = (id: number): boolean => {
    const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (productsInCart) {
      const products: IProductCart[] = JSON.parse(productsInCart)
      const product = products.find(el => el.id === id)
      return !!product
    }
    return false
  }

  // увеличение количествва товара в корзине
  const decreaseProduct = (id: number): void => {
    const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (productsInCart) {
      const products: IProductCart[] = JSON.parse(productsInCart)
      const updatedProducts = products.map(product => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity - 1 }
        }
        return product
      })
      window.sessionStorage.setItem('productsInCart', JSON.stringify(updatedProducts))
    }
  }

  // уменьшение количества товара в корзине
  const increaseProduct = (id: number) => {
    const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (productsInCart) {
      const products: IProductCart[] = JSON.parse(productsInCart)
      const updatedProducts = products.map(product => {
        if (product.id === id) {
          return { ...product, quantity: product.quantity + 1 }
        }
        return product
      })
      window.sessionStorage.setItem('productsInCart', JSON.stringify(updatedProducts))
    }
  }

  // очистить корзину
  const clearCart = () => {
    window.sessionStorage.removeItem('productsInCart')
  }

  // суммарная стоимость корзины
  const cartTotalAmount = () => {
    const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (productsInCart) {
      const products: IProductCart[] = JSON.parse(productsInCart)
      const price = products.reduce((accumulator, product) => accumulator + (product.quantity * product.price), 0)
      return price
    }

    return 0
  }

  return {
    addProductToCart, 
    cartTotalQty, 
    isProductInCart, 
    deleteOneProductInCart, 
    decreaseProduct, 
    increaseProduct, 
    clearCart,
    cartTotalAmount
  };
};

export default useCart;