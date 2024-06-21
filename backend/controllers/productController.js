const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create Product-- Admin
exports.createProduct = catchAsyncErrors(async (req,res)=>{
   const product = await Product.create(req.body);

   res.status(201).json({
    success:true,
    product,
   });

    });
  






//Get all products
exports.getAllProducts = async(req,res) =>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })

    res.status(201).json({message:"Route is working fine"})
}


//Update Product--Admin

exports.updateProduct = catchAsyncErrors(async (req,res)=>{
    let product =await Product.findById(req.params.id);
    if(!product){
        return next(ErrorHander("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindModify:false});

        res.status(200).json({
            success:true,
            product
        })
})


//get product details
exports.getProductDetails = catchAsyncErrors(async(req,res)=>{
    
    const product = await Product.findByIdf(req.params.id);
    if(!product){
        return next(ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success:true,
        product
    })

})


//Delete product--Admin
exports.deleteProduct = catchAsyncErrors(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(ErrorHander("Product not found",404));
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })

})