import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShortContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSelar = () => {

    //get all the product data using the context api
    const {products} = useContext(ShopContext);
    const [bestseller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[])
  return (
    <div className='my-10'>
        <div className="text-center text-3xl py-8">
            <Title teaxt1={'BEST'} teaxt2={'SELLER'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            dummy test
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestseller.map((item,index)=>(
                 <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>

    </div>
  )
}

export default BestSelar