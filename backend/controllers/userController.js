import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'

const authUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


const registerUser = asyncHandler(async(req, res) =>{
    const {name,email,password} = req.body
    const userExists= await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('Email already exists')
    }
    else{
        const user= await User.create({
            name,
            email,
            password,
        })

        if (user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                // isAdmin: user.isAdmin,
                // pic: user.pic,
                token: generateToken(user._id),
            })
        }else{
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
 })



const getUsers = asyncHandler(async(req, res) =>{
   const keyword=req.query.keyword
    ? { 
        $or: [ 
            { name: { $regex: req.query.keyword, $options: "i" } },
            { email: { $regex: req.query.keyword, $options: "i" } },
          ],       
      }
    : {}    

    const users = await User.find({...keyword}).find({ _id: { $ne: req.user._id } });
    res.json(users)
    
 })


export {
    authUser,
    registerUser,
    getUsers,
   
}