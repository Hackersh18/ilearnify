import React from 'react'
import productdata from "../data/product.json"
import Card from '../Components/Card'
import axios from 'axios'
const CheckoutHandler = async({name,amount})=>{
  const {data:{order}} = await axios.post("http://localhost:4000/payment/checkout",{
    name,amount
  })
  var options = {
    "key": "rzp_test_YoaD5WnvwTLPTk", // Enter the Key ID generated from the Dashboard
    "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency":order.currency,
    "name": "The Avengers",
    "description": "course charge",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKtsmCNG1TQvJkLXAmUjWyxYwo_Sj0BmTfwikEtbbnHAsIEO3dfDhUPBSlmWamdiN7D_M&usqp=CAU",
    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "http://localhost:4000/payment/paymentVerification",
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
  console.log({order})
}
const Product=()=> {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto"> 
          <div className="flex flex-wrap -m-4">
            {
              productdata?.map((c,i)=>{
                return <Card key={i} image={c.image} title={c.title} price={c.price} category={c.category} onCheckOut={CheckoutHandler}/> 
              })
            }
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Product
