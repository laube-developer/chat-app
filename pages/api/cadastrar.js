// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import userController from "../../database/controllers/userController";
import database from "../../database/database";

export default async function handler(req, res) {
  if (requestForaDoPadrao(req.body)) {res.status(400); return}

  const body = typeof(req.body) == "string" ? JSON.parse(req.body) : req.body

  const response = await userController.saveUser(body[0])
  .then((data)=>{
    res.status(200).json(data)
    console.log(data)
  })
  .catch(err=>{
    console.log(err)
  })

}


function requestForaDoPadrao(request){
  return !(typeof(request) === "string" || typeof(request) === "object")
}