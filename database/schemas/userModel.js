import {Schema, model, models, ObjectId} from "mongoose";

const UserSchema = new Schema({
    nickname: {type: String, require: true, unique: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

const User = models.User || model("User", UserSchema)

export default User