const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.newOrder = catchAsyncErrors(async(req,res,next)=>{

    const{
        shippingInfo,
        orderIntems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice, } = req.body

    const order = await Order.create({
        shippingInfo,
        orderIntems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,


    });

    res.status(201).json({
        success: true,
        order,
    });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHander("Order not found with this id ", 404));

    }

    res.status(200).json({
        success:true,
        order,
    })
})

//get loggedin user Orders
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{

    const orders = await Order.find({user:req.user._id})

   

    res.status(200).json({
        success:true,
        orders,
    })
})
