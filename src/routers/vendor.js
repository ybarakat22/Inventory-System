const express = require('express')
const Vendor = require('../models/vendor')
const PurchaseOrder = require('../models/purchase_order')
const router = new express.Router()



router.post('/vendors', async (req, res) => {

    // console.log(req.body)
    const vendor = new Vendor(req.body)

    try {
        await vendor.save()
        res.status(201).send(vendor)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/vendors', async (req, res) => {

    try {
        const vendors = await Vendor.find({})
        res.status(201).send(vendors)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/vendors/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const vendor = await Vendor.findById(_id)
        if (!vendor) {
            return res.status(404).send()
        }
        res.send(vendor)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/vendors/:id', async (req, res) => {


    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email']

    const isValiedOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValiedOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }
    const _id = req.params.id

    try {
        const vendor = await Vendor.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!vendor) {
            return res.status(404).send()
        }
        res.send(vendor)
    } catch (e) {
        res.status(400).send(e)

    }


})


router.delete('/vendors/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const vendor = await Vendor.findOneAndDelete({_id})
        if (!vendor) {
            res.status(404).send()
        }
        res.send(vendor)

    } catch (e) {
        res.status(500).send()

    }
})

module.exports = router