const { response } = require('express')
const jwt = require('jsonwebtoken');


const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Missing token'
        })
    }

    try {
        const { uid, name} = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.name = name;
        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }

    next();

}


module.exports = {
    validateJWT
}
