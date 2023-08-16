const mongoose = require('mongoose');
const validator = require('validator');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

CategorySchema.pre('findOneAndDelete', async function() {


  const categoryId = this.getFilter()._id
  if (categoryId) {
    try {
      const Item = mongoose.model('Item')
      const items = await Item.find({ category_id: categoryId })
      items.forEach( async item => await Item.findOneAndDelete({_id : item.id}))
    } catch (error) {
      console.error(error)
    }
  }


})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category