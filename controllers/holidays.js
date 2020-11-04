const express = require('express')
const holidays = express.Router()
const Holiday = require("../models/holiday.js")

// INDEX
holidays.get('/', (req, res) => {
    Holiday.find({}, (err, foundHolidays) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundHolidays)
    })
})

// seed route
holidays.get('/seed', (req, res) => {
    Holiday.create({ name: "National Ira Day" }, (err, createdHoliday) => {
        res.json(createdHoliday)
    })
})

// NEW - we don't do this with an API

// DELETE
holidays.delete("/:id", (req, res) => {
    Holiday.findByIdAndRemove(req.params.id, (err, deletedHoliday) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        if (deletedHoliday) {
            res.status(200).json(deletedHoliday)
        } else {
            res.status(404).json({ error: "Holiday not found" })
        }
    })
})
// UPDATE
holidays.put('/:id', (req, res) => {
    Holiday.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedHoliday) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(updatedHoliday)
    })
})

// CREATE

holidays.post('/', (req, res) => {
    Holiday.create(req.body, (error, createdHoliday) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(createdHoliday) //  .json() will send proper headers in response so client knows it's json coming back
    })
})
// EDIT - we don't do this with an API

// SHOW

module.exports = holidays