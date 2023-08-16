const mongoose = require('mongoose')
const validator = require('validator')
const Item = require('../models/item')
const Purchase_Order = require('../models/purchase_order')

const PurchaseOrderItemSchema = new mongoose.Schema({

    purchase_order_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Purchase_Order',
        required: true,
        validate: {
            validator: async (value) => {
                const order = await Purchase_Order.findOne({ _id: value });

                if (!order) {
                    throw new Error('The order_id does not exist');
                }
            }
        }
    },
    quantity: {
        type: Number,
        default: 0,

    },
    price_per_item: {
        type: Number,
        default: 0
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Item',
        required: true,
        validate: {
            validator: async (value) => {
                const item = await Item.findOne({ _id: value });

                if (!item) {
                    throw new Error('The item_id does not exist');
                }
            }
        }
    }
})

const Purchase_Order_Item = mongoose.model('Purchase_Order_Item', PurchaseOrderItemSchema)
module.exports = Purchase_Order_Item