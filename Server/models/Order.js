const mongoose= require ('mongoose')
const { type } = require('os')

const Orderschema = new mongoose.Schema({
    name:{
        type:String,
    },
    amount:{
        type:Number
    },
    order_id:{
        type:String
    },
    razorpay_payment_id:{
        type:String, 
        default:null,
    }
},{
    timestamps:true
});
const OrderModel = mongoose.model("order",Orderschema);


module.exports={
    OrderModel
}