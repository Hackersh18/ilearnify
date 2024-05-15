import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../slice/cartSlice'
import Course_Card from './Course_Card'

const Cart = () => {
    // const wishlistItems=useSelector((store)=>store.wishlist.items)
    const cartItems=useSelector((store)=>store.cart.items)

    const dispatch=useDispatch()

    const handleClearCart=()=>{
        dispatch(clearCart())
    }




  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className=" p-2 m-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems?.length === 0 && (
          <h1 className='text-white text-lg'> Cart is empty. Add Items to the cart!</h1>
        )}
        <div className='flex flex-wrap gap-3'>
        {
      cartItems.map((pro)=>(
        <Course_Card course={pro}/>
      ))
    }
    </div>
      </div>
    </div>
  )
}

export default Cart