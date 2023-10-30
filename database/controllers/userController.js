import User from "../schemas/userModel"

import database from "../database"

const saveUser = async (queryUser) => {
    if(!database.connect()) return false
    
    const newUser = new User(queryUser)

    return await newUser.save()

}


export default{
    saveUser
}