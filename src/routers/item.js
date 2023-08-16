const express = require('express') 
const Item = require('../models/item')
const router = new express.Router()



router.post('/items', async (req, res) => {

    console.log(req.body)
    const item = new Item(req.body)
    console.log(req.body)

    try {
        await item.save()
        res.status(201).send(item)

    } catch (e) {
        res.status(400).send(e)

    }
   
})

router.get('/items', async (req, res) => {

    try {
        const items = await Item.find({})
        res.status(201).send(items)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/items/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const item = await Item.findById(_id)
        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
    } catch (e) {

        res.status(500).send(e)
    }

})

router.patch('/items/:id', async (req, res) => {


    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']

    const isValiedOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValiedOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }
    const _id = req.params.id

    try {
        const item = await Item.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
    } catch (e) {
        res.status(400).send(e)

    }


})


router.delete('/items/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const  item = await Item.findByIdAndDelete(_id)
        if (!item) {
            res.status(404).send()
        }

        res.send(item)

    } catch (e) {
        res.status(500).send(e)

    }
})

module.exports = router