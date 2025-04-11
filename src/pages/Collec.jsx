import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShortContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../Componnets/Title';
import ProductItem from '../Componnets/ProductItem';

const Collec = () => {
  // Get data from Context API
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false); // Toggle filter visibility for small screens
  //create state variables for mapping product
  const [filterProduct,setFilterProducts] = useState([]);
  //logic for check boxes
  const [category,setCategory] = useState([]);
  const [SubCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent');

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){

      setCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      //category not include in category array
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggeleSubCategory = (e) =>{
    if(SubCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }
  //use for category and subcategory state 
  const applyFilter = () =>{

    //create to coppy of all the product .provide the coppy of product in product array
    let productCoppy = products.slice();
    /* create method for .filter the product form search query  */
    if(showSearch && search)
    {
       productCoppy = productCoppy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0)//maen selected catogory
    {
      productCoppy = productCoppy.filter(item => category.includes(item.category));
    }
    //condition for sub category
    if(SubCategory.length > 0)
    {
      productCoppy = productCoppy.filter(item => SubCategory.includes(item.subCategory));
    }
    //save the filter product in array
    setFilterProducts(productCoppy);
  }

  //logic for fecher options
  const sortProduct = () =>{
     
    let fpcopy = filterProduct.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fpcopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpcopy.sort((a,b)=>(b.price-a.price)));
        break;  

      default:
        applyFilter();
        break;  
    }
  }

 //for sub category
 useEffect(()=>{
   applyFilter();
 },[category,SubCategory,search,showSearch])

 useEffect(()=>{
  sortProduct();
 },[sortType])


  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t">
      {/** Left Side (Filter) */}
      <div className="w-full sm:w-1/4">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          {/** Dropdown icon for small screens */}
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/** Category Filter */}
        <div
          className={`border border-gray-300 p-3 mt-3 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-2 text-xs font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-1 text-xs text-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Men" onChange={toggleCategory}/> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Women" onChange={toggleCategory}/> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Kids" onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>
        {/** SubCategory Filter */}
        <div
          className={`border border-gray-300 p-3 my-3 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-2 text-xs font-medium">TYPE</p>
          <div className="flex flex-col gap-1 text-xs text-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Topwear" onChange={toggeleSubCategory} /> Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Bottomwear"  onChange={toggeleSubCategory}/> Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Winterwear"  onChange={toggeleSubCategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/** Right Side (Content) */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title teaxt1={'ALL'} teaxt2={'COLLECTION'} />
          {/** Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-'>
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Sort</option>
          </select>
        </div>
       {/** map product */}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-2 ">
        {/** mapping all the product */}
           {
            filterProduct.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
           }
       </div>
      </div>
    </div>
  );
};

export default Collec;
