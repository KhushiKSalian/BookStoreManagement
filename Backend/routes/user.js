const router= require('express').Router();
const User = require("../models/user");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
const user = require('../models/user');
// sign up
router.post("/sign-up", async(req,res)=>{
    try{
        const {username,email,password,address} = req.body;
        // check username length is more than 3 or 4
        if(username.length <= 4)
            {
                return res.status(400).json({message:"username length should be more then 3 characters"});
            }
            // check user exists
        const existingUsername = await User.findOne({username: username});
        if(existingUsername)
                {
                    return res.status(400).json({message:"username already exists"});
                }


            // check email exists
        const existingUseremail = await User.findOne({email: email});
        if(existingUseremail)
                {
                    return res.status(400).json({message:"Email already exists"});
                }     

                     // check password is length than 6 
                     if(password.length <= 5)
                        {
                            return res.status(400).json({message:"password length should be more then 5 characters"});
                        }
                        const hashPassword= await bcrypt.hash(password,10);
            const newUser = new User({ 
                username:username, 
                email:email, 
                password:hashPassword, 
                address:address,
            });
                await newUser.save();
                return res.status(500).json({message:"sign up successful"});

            }catch(error){
        res.status(400).json({message:"Internal server error"});
    };
});

// sign in
router.post("/sign-in", async(req,res)=>{
    try{
        const {username,password} = req.body;
            // check user exists
        const existingUsername = await User.findOne({username});
        if(!existingUsername)
                {
                    return res.status(400).json({message:"Invalid credentials"});
                }

        await bcrypt.compare(password, existingUsername.password,(err,data)=>{
            if(data)
                {
                    const authclaims=[{
                        name:existingUsername.username
                    },{role:existingUsername.role},];
                    const token= jwt.sign({authclaims},"bookStore123",{expiresIn:"30d",});
                    res.status(200).json({
                        id: existingUsername._id,
                        role:existingUsername.role,
                        token:token,
                    });
                 }
            else
            {
                return res.status(400).json({message:"Invalid credentials"});      
            }
        });
            }catch(error){
        res.status(400).json({message:"Internal server error"});
    };
});

// get user information
router.get("/get-user-information",  authenticateToken ,async(req,res)=>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    }
    catch(error)
    {
        res.status(500).json({message:"Internal server error"});
    }
});

// update address
router.put("/update-address", authenticateToken, async(req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await user.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});
    }
    catch(error)
    {
        res.status(500).json({message:"Internal server error"});
    }
})
module.exports = router;