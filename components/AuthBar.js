import { useRouter } from "next/router"
import styles from "../styles/AuthBar.module.css"
import Cookies from "js-cookie"
import { useContext, useEffect } from "react"
import { signOut } from "firebase/auth"

import initializeFirebase from "../database/firebase"
const app = initializeFirebase().app
import { getAuth } from "firebase/auth"
const auth = getAuth(app)

import MainContext from "../util/server/GlobalContext"

export default function AuthBar({lightBg, preventAutoRedirect, setLoading}){

    
    const rotas = useRouter()
    const {globalContext, setGContext} = useContext(MainContext)
    
    const user = globalContext.user

    useEffect(()=>{
        // console.log(preventAutoRedirect)
        if (!user?.uid && !preventAutoRedirect) rotas.push("/signin")
        else{
            setGContext({...globalContext, isLoadding: false})
        }
    }, [])

    if(user?.uid) return (<div className={styles.main}>
        <UserIcon img_src={user.photoURL}/>
        <MinhasMensagens />
        <LogoutButton lightBg={lightBg}/>
    </div>)

    else return (<div className={styles.main}>
        <LoginButton lightBg={lightBg}/>
    </div>)
}

function LoginButton({lightBg}){
    const rotas = useRouter()

    return (<button className={styles.fill_btn} onClick={()=>{rotas.push("/signin")}}>
        Entrar
    </button>)
}

function LogoutButton({lightBg}){
    const rotas = useRouter()

    const {globalContext, setGContext} = useContext(MainContext)

    let closeUser = ()=>{
        signOut(auth)
        .then(()=>{
            setGContext({...globalContext, user: undefined})

            if(rotas.pathname != "/") rotas.push("/")

            else rotas.reload()
        })
        .catch((err)=>{
            alert("Falha ao efeturar logout. Erro: " + err.message)
        })
    }

    return (<button className={styles.fill_btn} onClick={closeUser}>
        sair
    </button>)
}

function UserIcon({img_src}){
    return(<div className={styles.user_img}>
        <img src={img_src}></img>
    </div>)
}

function MinhasMensagens(){
    const rotas = useRouter()

    return <button className={styles.fill_btn} onClick={()=>{rotas.push("/chat")}}>
        Minhas Mensages
    </button>
}