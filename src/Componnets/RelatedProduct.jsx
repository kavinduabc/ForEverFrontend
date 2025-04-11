import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShortContext'; // Adjust the path based on your project structure
import Title from '../Componnets/Title'
import ProductItem from './ProductItem';
const RelatedProduct = ({ category, subCategory }) => {
  /**
   * This component is used to filter related products on the product page.
   */
  // Get all product data from context API
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Logic to filter by category and subcategory
    if (products && products.length > 0) {
      // Copy all products
      let productsCopy = [...products];

      224// Filter by category and subcategory
      productsCopy = productsCopy.filter(item => category === item.category && subCategory === item.subCategory);

      // Set the filtered products (up to 5)
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title teaxt1={'RELATED'} teaxt2={'PRODUCTS'}  />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {related.map((item,index)=>(
           <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
