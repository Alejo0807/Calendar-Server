const { response } = require("express");
const User = require("../models/User");
const Event = require("../models/Event");

const getEvents = async(req, res = response) => {

    try {

        let events = await Event.find().populate('user', 'name');
        // console.log(events)
        // console.log(req.uid)

        events = events.filter(event => event.user._id.valueOf() === req.uid)
        // console.log(eventss)
        res.status(200).json({
            ok: true,
            msg: 'get events',
            events
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server Error',
        });
    }
};

const createEvent = async(req, res = response) => {

    try {
        const event = new Event (req.body);
        event.user = req.uid;
    
        await event.save();
    
        res.status(200).json({
            ok: true,
            msg: 'create event',
            event
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server Error',
        });
    }

};

const updateEvent = async(req, res = response) => {
    
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        const uid = req.uid;

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid event id'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Missing privilages'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });
    
        res.status(200).json({
            ok: true,
            msg: 'update event',
            updatedEvent
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server Error',
        });
    }
};

const deleteEvent = async(req, res = response) => {

    try {

        const { id } = req.params;
        const event = await Event.findById(id);

        const uid = req.uid;

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid event id'
            })
        }

        if(event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Missing privilages'
            })
        }

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'delete event',
            event
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server Error',
        });
    }
};


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}