import {hashPwd} from "../../util/bcrypt"

import {main} from "../database"

import User from "../schemas/userModel"

const saveUser = async (queryUser) => {
    await main()

    const newPwd = hashPwd(queryUser.password)
    
    const newUser = {
        ...queryUser,
        password: newPwd
    }
    
    const modelUser = new User(newUser)

    return User.insertMany(modelUser)
}

const getUser = async (queryUser) => {
    return await User.find(queryUser)
}

export {
    saveUser,
    getUser
}
