const express = require('express') 
const PurchaseOrderItem = require('../models/purchase_order_item')
const router = new express.Router()


router.post('/purchase_orders_items', async (req, res) => {

    // console.log(req.body)
    const order_item = new PurchaseOrderItem(req.body)

    try {
        await order_item.save()
        res.status(201).send(order_item)

    } catch (e) {
        res.status(400).send(e)

    }
   
})

router.get('/purchase_orders_items', async (req, res) => {

    try {
        const orders_items = await PurchaseOrderItem.find({})
        res.status(201).send(orders_items)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/purchase_orders_items/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const order_item = await PurchaseOrderItem.findById(_id)
        if (!order_item) {
            return res.status(404).send()
        }
        res.send(order_item)
    } catch (e) {

        res.status(500).send(e)
    }

})

router.patch('/purchase_orders_items/:id', async (req, res) => {


    const updates = Object.keys(req.body)
    const allowedUpdates = ['quantity' , 'price_per_item']

    const isValiedOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValiedOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }
    const _id = req.params.id

    try {
        const order_item = await PurchaseOrderItem.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!order_item) {
            return res.status(404).send()
        }
        res.send(order_item)
    } catch (e) {
        res.status(400).send(e)

    }


})


router.delete('/purchase_orders_items/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const  order_item = await PurchaseOrderItem.findByIdAndDelete(_id)
        if (!order_item) {
            res.status(404).send()
        }

        res.send(order_item)

    } catch (e) {
        res.status(500).send()

    }
})


module.exports = router