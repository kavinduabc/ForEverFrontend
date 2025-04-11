import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShortContext'
import Title from '../Componnets/Title'

const CartTotal = () => {
  //get cartTotal function in shopcontext
  const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full'>
     <div className="text-2xl">
      <Title teaxt1={'CART'} teaxt2={'TOTALS'} />
     </div>
     <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between '>
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr/>
        <div className="flex justify-between">
          <p>Shippin fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{getCartAmount() === 0 ? 0 :getCartAmount() + delivery_fee}.00</b>
        </div>
     </div>
    </div>
  )
}

export default CartTotal