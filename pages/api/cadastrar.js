// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import userController, { saveUser } from "../../database/controllers/userController";
import {requestForaDoPadrao, convertRequestIntoJSON} from "../../util/requestValidation";

export default async function handler(req, res) {
  if (requestForaDoPadrao(req.body)) {res.status(400); return}

  const body = convertRequestIntoJSON(req)

  let user = body[0].user

  await saveUser(user).then((data)=>{
    res.status(200).json({
      message: "Usuário criado com sucesso!",
      user: {...data[0]._doc, password: undefined}
    })
  })
  .catch((err)=>{
    res.status(400).json({message: "Falha ao cadastrar usuário. "})
  })
}