import { useEffect, useState } from "react"
import Loadding from "../Loadding"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const whiteList = [
    "/signin",
    "/cadastrar"
]

export default function AuthComponent({children, user, setUser}){
    const [isLoadding, setLoading] = useState(true)
    const rotas = useRouter()
    
    useEffect(()=>{
        let authUser = JSON.parse(Cookies.get("user"))

        if(!authUser?.uid && !whiteList[rotas.pathname]){
            rotas.push("/signin")
            return
        }else{
            setUser(authUser)
            setLoading(false)
        }
    },[rotas, setUser])

    return <div>
        {isLoadding && <Loadding />}
        {!isLoadding && children}
    </div>
}