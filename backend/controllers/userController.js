const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto =require("crypto");


//Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl"

        }
    });



//    const token = user.getJWTToken();


//     res.status(201).json({
//         success:true,
//         token,

//     });
sendToken(user,201,res);

})

//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHander("Please Enter email and password",400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }

    // const token = user.getJWTToken();


    // res.status(200).json({
    //     success:true,
    //     token,

    // });
    sendToken(user,200,res);
})

//Log out
exports.logout = catchAsyncErrors (async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })


    res.status(200).json({
        success:true,
        message:"Logged Out"


    })

});

//forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHander("user not found",404))
    }

    //get ResetPassword token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email pls ignore it`;

    try{
        await sendEmail({
            email:user.email,
            subject:`Password Recovery`,
            message,

        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(error.message,500));
    }

})


//reset password
exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{
  

    //creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
        
    })
    if(!user){
        return next(new ErrorHander("Reset password Token is invalid or has been expired", 404))
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHander("Password does not match", 404))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

await user.save()

sendToken(user,200,res)

})


//GET User details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
   

    res.status(200).json({
        success:true,
        user,
    })

})


//Update User password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHander("Old password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword ){
        return next(new ErrorHander("password does not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();
   

    // res.status(200).json({
    //     success:true,
    //     user,
    // })
    sendToken(user, 200, res);

})


//Update User profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email,
    }


    //we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,

    })
    res.status(200).json({
        success:true,

    })


   

})


//Get all users
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    })
})


//Get single users (Admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`User doesnot exit with ID: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        users,
    })
})


//Update User Role --Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,
    }


    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,

    })
    res.status(200).json({
        success:true,

    })

})


//Delete User --Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    //we will remove cloudinary 
    if(!user){
       return next(new ErrorHander(`User does not exits with Id:${req.params.id}`));
    }

    await user.remove();

    
    res.status(200).json({
        success:true,

    })

})


