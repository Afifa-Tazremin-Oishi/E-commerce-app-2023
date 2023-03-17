import {  hashPassword } from "./../helpers/authHelper.js";
import userModel from "../models/userModel.js";
// import { Jwt } from "jsonwebtoken";
// import { response } from "express";

export const registerController = async (req, res) => {
    try{
        const {name,email,password,phone,address} = req.body;
        //validations
        if(!name){
            return res.send({error:'Name is Required'});
        }
        if(!email){
            return res.send({error:'email is Required'});
        }
        if(!password){
            return res.send({error:'password is Required'});
        }
        if(!phone){
            return res.send({error:'phone is Required'});
        }
        if(!address){
            return res.send({error:'address is Required'});
        }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already register please login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = new userModel({name,email,phone,address,password:hashedPassword,}).save();

        res.status(201).send({
            success: true,
            message:'User Register Successfully',
            user, 
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error, 
        });
    }
};

//post login
// export const loginController = async(req,res) =>{ 
//  try{
//    const {email,password} = req.body 
//    //validation
//    if(!email || !password){
//     return res.status(404).send({
//         success: false,
//         message: 'Invalide email or password'
//     })
//    }

//    //check user
//    const user = await userModel.findOne({email})
//    if(!user){
//     return res.status(404).send({
//         success: false,
//         message:'Email is not registered'
//     })
//    }

//    const match = await comparePassword(password,user.password)
//    if(!match){
//     return res.ststus(200).send({
//         success: false,
//         message: 'Invalid Password'
//     })
//    }

//    //token
//    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: "7s"});
//    res.status(200).send({
//     success: true,
//     message:'login successfully',
//     user:{
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         address: user.address,
//     },
//     token,

//    });
   

// } catch(error){
//     console.log(error)
//     res.status(500).send({
//         success: false,
//         message: 'Error in ligin',
//         error
//     })
// }
   
// };

 