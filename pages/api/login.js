import {hashPwd} from "../../util/bcrypt"

import { getUser } from "../../database/controllers/userController"

import {requestForaDoPadrao, convertRequestIntoJSON} from "../../util/requestValidation"

export default async function handler(req, res){
    if(requestForaDoPadrao(req)) res.status(400).json([{"message": "The request body should be a JSON data."}])

    const body = convertRequestIntoJSON(req)

    const user = body[0].user

    const dbUser = await getUser(user)

    res.status(200).json(dbUser)
}