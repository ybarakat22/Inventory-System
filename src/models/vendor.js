const mongoose = require('mongoose')
const validator = require('validator')

const VendorSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true,
    }, email: {

        type: String,
        trim: true,
        lowerCase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    }

})

VendorSchema.pre('findOneAndDelete', async function() {

    const vendorId = this.getFilter()._id
    // console.log(vendorId)
    if (vendorId) {
      try {
        const Purchase_Order = mongoose.model('Purchase_Order')
        const orders = await Purchase_Order.find({ vendor_id: vendorId })
        orders.forEach( async order => await Purchase_Order.findOneAndDelete({_id : order.id}))
        
      } catch (error) {
        console.error(error)
      }
    }
  })

const Vendor = mongoose.model('Vendor' , VendorSchema)

module.exports = Vendor