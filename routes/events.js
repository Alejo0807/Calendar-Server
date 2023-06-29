/*
    User routes / Events
    host + /api /evente
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { validateJWT } = require('../middlewares/validate-jwt');
const isDate = require('../helpers/isDate');

router.use(validateJWT);

router.get('/', getEvents);

router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    fieldValidator
], createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;

