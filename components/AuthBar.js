import { useRouter } from "next/router"
import styles from "../styles/AuthBar.module.css"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { signOut } from "firebase/auth"

import initializeFirebase from "../database/firebase"
const app = initializeFirebase().app
import { getAuth } from "firebase/auth"
const auth = getAuth(app)

export default function AuthBar({lightBg}){
    const user = JSON.parse(Cookies.get("authUser") || "{}")
    
    const rotas = useRouter()

    useEffect(()=>{
        if (!user) rotas.push("/")
    }, [])

    if(user.uid) return (<div className={styles.main}>
        <UserIcon img_src={user.photoURL}/>
        <LogoutButton lightBg={lightBg}/>
    </div>)

    else return (<div className={styles.main}>
        <LoginButton lightBg={lightBg}/>
    </div>)
}

function LoginButton({lightBg}){
    const rotas = useRouter()

    return (<button className={`${styles.outline_btn} ${lightBg ? styles.outline_light_theme : styles.fill_btn}`} onClick={()=>{rotas.push("/signin")}}>
        Entrar
    </button>)
}

function LogoutButton({lightBg}){
    const rotas = useRouter()

    let closeUser = ()=>{
        signOut(auth)
        .then(()=>{
            Cookies.set("authUser", "")
            Cookies.remove("authUser")

            if(rotas.pathname != "/") rotas.push("/")

            else rotas.reload()
        })
        .catch((err)=>{
            alert("Falha ao efeturar logout. Erro: " + err.message)
        })
    }

    return (<button className={`${styles.outline_btn } ${styles.outline_light_theme}`} onClick={closeUser}>
        logout
    </button>)
}

function UserIcon({img_src}){
    return(<div className={styles.user_img}>
        <img src={img_src}></img>
    </div>)
}