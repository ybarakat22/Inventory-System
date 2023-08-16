const express = require('express')
const Category = require('../models/category')
const router = new express.Router()

router.post('/categories', async (req, res) => {

    console.log(req.body)
    const category = new Category(req.body)

    try {
        await category.save()
        res.status(201).send(category)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/categories', async (req, res) => {

    try {
        const categories = await Category.find({})
        res.status(200).send(categories)

    } catch (e) {
        res.status(400).send(e)

    }

})

router.get('/categories/:id', async (req, res) => {

    const _id = req.params.id

    try {
        const category = await Category.findById(_id)
        if (!category) {
            return res.status(404).send()
        }
        res.send(category)
    } catch (e) {

        res.status(500).send(e)
    }

})

router.patch('/categories/:id', async (req, res) => {


    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']

    const isValiedOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValiedOperation) {
        res.status(400).send({ error: 'Invalid updates' })
    }
    const _id = req.params.id

    try {
        const category = await Category.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!category) {
            return res.status(404).send()
        }
        res.send(category)
    } catch (e) {
        res.status(400).send(e)

    }


})

router.delete('/categories/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const category = await Category.findOneAndDelete({ _id })
        if (!category) {
            res.status(404).send()
        }

        res.send(category)

    } catch (e) {
        res.status(500).send()

    }
})

module.exports = router