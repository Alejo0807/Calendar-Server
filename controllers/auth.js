const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res=response) => {
    
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }
        
        user = new User(req.body);
        //Encrypt passwrod
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);
    
        res.status(201).json({
            ok: true,
            msg: 'register',
            uid: user.id,
            name: user.name,
            token
        });
        

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Server Error',
        });
    }
}

const loginUser = async(req, res=response) => {

    const { email, password } = req.body;

    const incorrectCredentials = {
        ok: false,
        msg: 'User or email incorrect'
    };

    try {
        let user = await User.findOne({email});
        if(!user) return res.status(400).json(incorrectCredentials);
    
        //Confirm password
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) return res.status(400).json(incorrectCredentials);

        //Generate JWT
        const token = await generateJWT(user.id, user.name);
    
        res.json({
            ok: true,
            msg: 'login',
            user,
            token
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server Error',
        });
    }

};

const revalidateToken = async(req, res) => {

    const { uid, name } = req;
    //Generate JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        msg: 'renew',
        token
    });
};


module.exports = {
    createUser,
    loginUser,
    revalidateToken
}