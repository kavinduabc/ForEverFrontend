import { useState } from 'react'
import {Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collec from './pages/Collec'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Placeorder from './pages/Placeorder'
import Navbar from './Componnets/Navbar'
import Orders from './pages/Orders'
import Footer from './Componnets/Footer'
import SearchBar from './Componnets/SearchBar'
//toastContainer using for notification in react project 
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='px:4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/> 
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collec/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<Placeorder/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      <Footer/>
     </div>
     
    </>
  )
}

export default App
