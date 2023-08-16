const mongoose = require('mongoose')
const connectionURL = 'mongodb://127.0.0.1:27017/inventory-system'


mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
   
})

