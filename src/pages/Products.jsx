import React, { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';

function Products() {
  const { products, loading, fetchProducts } = useProducts();
  useEffect(() => {
    console.log(' useEffect dans ProductProvider');
    fetchProducts();
  }, []);
  // console.log(products);

    return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Product List</h2>

      <div className="grid grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="border rounded-xl shadow p-4 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
