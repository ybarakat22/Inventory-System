const express = require('express')
const Purchase_Order = require('../models/purchase_order')
const Vendor = require('../models/vendor')
const router = new express.Router()



router.post('/purchase_orders', async (req, res) => {

    const order = new Purchase_Order(req.body)

    try {
        await order.save()
        res.status(201).send(order)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/purchase_orders', async (req, res) => {

    try {
        const orders = await Purchase_Order.find({})
        res.status(201).send(orders)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/purchase_orders/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const order = await Purchase_Order.findById(_id)
        if (!order) {
            return res.status(404).send()
        }
        res.send(order)
    } catch (e) {

        res.status(500).send(e)
    }

})

router.patch('/purchase_orders/:id', async (req, res) => {


    const updates = Object.keys(req.body)
    const allowedUpdates = ['vendor_id']

    const isValiedOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValiedOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }
    const _id = req.params.id

    try {
        const order = await Purchase_Order.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!order) {
            return res.status(404).send()
        }
        res.send(order)
    } catch (e) {
        res.status(400).send(e)

    }


})


router.delete('/purchase_orders/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const order = await Purchase_Order.findOneAndDelete({_id})

        if (!order) {
            res.status(404).send()
        }

        res.send(order)

    } catch (e) {
        res.status(500).send()

    }
})

module.exports = router