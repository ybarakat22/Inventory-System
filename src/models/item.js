const mongoose = require('mongoose')
const validator = require('validator')
const Category = require('../models/category');
const Purchase_Order = require('./purchase_order');

const ItemSchema = new mongoose.Schema({
    name: {

        type: String,
        required: true,
    } , 
    category_id : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category' , 
        validate: {
            validator: async (value) => {
                const category = await Category.findOne({ _id: value });

                if (!category) {
                    throw new Error('The category_id does not exist');
                }
            }
        }
    }
})

ItemSchema.pre('findOneAndDelete', async function() {


    const itemId = this.getFilter()._id
    if (itemId) {
      try {
        const Purchase_Order_Item = mongoose.model('Purchase_Order_Item')
        const orders = await Purchase_Order_Item.find({ item_id: itemId })
        orders.forEach( async order => await Purchase_Order_Item.findOneAndDelete({_id : order.id}))
      } catch (error) {
        console.error(error)
      }
    }
  
  
  })
const Item = mongoose.model('Item',ItemSchema)
module.exports = Item