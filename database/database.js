const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

const connect = async () => {
    return await mongoose.connect(process.env.DATABASE_URL)
}

const disconnect = async () => {
    return await mongoose.disconnect(process.env.DATABASE_URL)
}

export default {connect, disconnect}