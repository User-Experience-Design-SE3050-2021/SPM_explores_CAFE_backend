const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password, designation, phone, dateOfBirth, gender, emergencyPhone, hireDate, dutyType, userName} = req.body;
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "User email exist"})

            if(password.length < 6)
                return res.status(400).json({msg: "Password should contain 6 characters"})

            if(password.length < 6)
            return res.status(400).json({msg: "Password must contain at least 6 characters"})

            //password encrypt
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, 
                designation, 
                email, 
                phone, 
                dateOfBirth, 
                gender, 
                emergencyPhone, 
                hireDate, 
                dutyType, 
                userName, 
                password: passwordHash
            })

            //save to DB
            await newUser.save() 
            
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({accesstoken})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login : async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})

            //check given email exist
            if(!user) return res.status(400).json({msg: "User does not exist"})

            //comparing passwods
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password Incorrect"})

            //if login success, create a accessToken and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
            })
            
            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})

            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) => {
        //const rf_token = req.cookies.refreshtoken;
        try {
            const rf_token = req.cookies.refreshtoken;
            res.json({rf_token})
            if(!rf_token) return res.status(400).json({msg: "Please login or register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login or register"})
                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist"})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
}
module.exports = userCtrl