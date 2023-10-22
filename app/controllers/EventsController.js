const EventModel = require('../models/Eventmodel')

module.exports = {
    index: (req, res, next) => {
        EventModel.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Error while fetching Events',
                error: err
            })
        })
    },

    create: (req, res, next) => {
        const event = new EventModel({
            name: req.body.name,
            event: req.body.event,
            city: req.body.city
        })
        event.save()
            .then((event) => {
                next()
                return res.status(201).json(event)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error while creating Event',
                    error: err
                })
            })
    },


    blabla: () => {
        console.log('middleware blabla')
    },


    delete: (req, res, next) => {
        const id = req.params.id;
        console.log(id)
        EventModel.findByIdAndRemove(id)
            .then((id) => {
                return res.status(200).json({
                    id: id,
                    deleted: true
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    message: "Error while deleting Event",
                    error: err
                })
            })
    }
}