import React, { useContext, useState } from 'react'
import Title from '../Componnets/Title'
import CartTotal from '../Componnets/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShortContext'

const Placeorder = () => {
  //create state variable for payment method
  const [method,setMethod] = useState('cod');
  //logic for navigate placeorder page
  const {navigate} = useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t'>
   {/** Left Side in this page */}
   <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
     <div className='text-xl sm:text-2xl my-3'>
       <Title teaxt1={'DELEVERY'} teaxt2={'INFORMATION'}/>
     </div>
     <div className='flex gap-3 '>
       <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='first name'/>
       <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='last name'/>
     </div>
     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='email'/>
     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='street'/>
     <div className='flex gap-3 '>
       <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='city'/>
       <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='state'/>
     </div>
     <div className='flex gap-3 '>
       <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='zip code'/>
       <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='country'/>
     </div>
     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='phone'/>
   </div>
   {/** Pight Side */}
   <div className='mt-8'>
      <div className='mt-8 min-w-80'>
          <CartTotal/>
      </div>

      <div className='mt-12'>
        <Title teaxt1={'PAYMENT'} teaxt2={'METHOD'} />
        {/** payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5  border rounded-full ${method === '' ? 'gb-green-400':'stripe'}`}></p>
               <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>   
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5  border rounded-full  ${method === '' ? 'gb-green-400':'razorpay'} `}></p>
               <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div> 
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5  border rounded-full ${method === '' ? 'gb-green-400':'cod'} `}></p>
               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div> 
          </div>
          <div className='w-full text-end mt-8'>
           <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
      </div>
   </div>
    </div>
  )
}

export default Placeorder