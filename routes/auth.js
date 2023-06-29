/*
    User routes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/register', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email has not the format').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    fieldValidator
], createUser);

router.post('/', [
    check('password', 'The password is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'The email has not the format').isEmail(), 
    fieldValidator
],loginUser);

router.get('/renew', validateJWT, revalidateToken);



module.exports = router;

