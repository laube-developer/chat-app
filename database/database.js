const mongoose = require("mongoose")

const main = async () => {
    mongoose.set("strictQuery", true)
    mongoose.connect(process.env.DATABASE_URL)
}

export {main}