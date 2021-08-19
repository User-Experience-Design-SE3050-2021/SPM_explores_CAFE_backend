const Users = require('../models/userModel')

const authManager = async (req, res, next) => {
    try {
        //get user by id
        const user = await Users.findOne({
            _id: req.user.id
        })
        //customer
        if(user.role === 0)
            return res.status(400).json({msg: "Manager resources access denied - customer"})

        //kitchen manager
        if(user.role === 1)
        return res.status(400).json({msg: "Manager resources access denied - kitchen manager"})

        //Cashier
        if(user.role === 2)
        return res.status(400).json({msg: "Manager resources access denied - Cashier"})

        //Chef
        if(user.role === 3)
        return res.status(400).json({msg: "Manager resources access denied - Chef"})

        next() 

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authManager