const express = require('express')
require('./database/mongoose')

const categoryRouter = require('./routers/category')
const itemRouter = require('./routers/item')
const vendorRouter = require('./routers/vendor')
const purchaseOrderRouter = require('./routers/purchase_order')
const purchaseOrderItemRouter = require('./routers/purchase_order_item')
const adminRouter = require('./routers/admin')

const app = express()

const port = process.env.PORT 

app.use(express.json())

app.use(categoryRouter)
app.use(itemRouter)
app.use(vendorRouter)
app.use(purchaseOrderRouter)
app.use(purchaseOrderItemRouter)
app.use('/admin', adminRouter)



app.listen(port, () => {
    console.log('Server is up on ' + port)
})
