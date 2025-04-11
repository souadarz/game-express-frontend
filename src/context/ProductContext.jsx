import { createContext, useContext, useState, useEffect } from "react";
import api from '../api/axios'

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get('v1/admin/products');
      console.log('products', response.data)
      setProducts(response.data.products);

      return { success: true };
    } catch (error) {
      console.error('error product', error);

      return {
        success: false,
        message: error.response?.data?.message || 'error product'
      };
    } finally {
      setLoading(false);
    }
  }
  return (
    <ProductContext.Provider value={{ products, loading , fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
export const useProducts = () => useContext(ProductContext);

