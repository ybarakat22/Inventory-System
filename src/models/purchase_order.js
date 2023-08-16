const mongoose = require('mongoose')
const validator = require('validator')
const Vendor = require('../models/vendor')

const PurchaseOrderSchema = new mongoose.Schema({

    vendor_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Vendor',
        required: true,
        validate: {
            validator: async (value) => {
                const vendor = await Vendor.findOne({ _id: value });

                if (!vendor) {
                    throw new Error('The vendor_id does not exist');
                }
            }
        }
    }

})

PurchaseOrderSchema.pre('findOneAndDelete', async function() {

    const orderId = this.getFilter()._id
    // console.log("order :",orderId)
    if (orderId) {
      try {
        const Purchase_Order_Item = mongoose.model('Purchase_Order_Item')
        const order_items = await Purchase_Order_Item.deleteMany({ purchase_order_id: orderId })
      } catch (error) {
        console.error(error)
      }
    }
  })

const Purchase_Order = mongoose.model('Purchase_Order', PurchaseOrderSchema)
module.exports = Purchase_Order