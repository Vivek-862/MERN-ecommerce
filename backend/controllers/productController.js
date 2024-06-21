const Product = require("../models/productModel")


// Create Product-- Admin
exports.createProduct = async (req,res)=>{
try{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });

}catch(error){
    res.status(400).json({
        success: false,
        message: error.message

});
  


}
};



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

exports.updateProduct = async (req,res)=>{
    let product =await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindModify:false});

        res.status(200).json({
            success:true,
            product
        })
}


//get product details
exports.getProductDetails = async(req,res)=>{
    
    const product = await Product.findByIdf(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"

        })
    }

    res.status(200).json({
        success:true,
        product
    })

}


//Delete product--Admin
exports.deleteProduct = async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"

        })
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })

}