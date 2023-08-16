const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Purchase_Order = require('../models/purchase_order')

dotenv.config({ path: './.env' })

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    databases: [mongoose],
    rootpath: '/admin',

})

const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {

        if (ADMIN.email === email && ADMIN.password === password) {
            return ADMIN
        }
        return null
    },
    cookiePassword: process.env.COOKIE_PASSWORD,
    cookieName: process.env.COOKIE_NAME
})

module.exports = router
