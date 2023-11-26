import { useRouter } from "next/router"
import styles from "../styles/AuthBar.module.css"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { signOut } from "firebase/auth"

import initializeFirebase from "../database/firebase"
const app = initializeFirebase().app
import { getAuth } from "firebase/auth"
const auth = getAuth(app)

export default function AuthBar(){
    const user = JSON.parse(Cookies.get("authUser") || "{}")
    
    const rotas = useRouter()

    useEffect(()=>{
        if (!user.uid) rotas.push("/")
    }, [])

    return (<div className={styles.main}>
        <UserIcon img_src={user.photoURL}/>
        <LogoutButton />
    </div>)
}

function LoginButton(){
    return (<button className={styles.fill_btn}>
        login
    </button>)
}

function LogoutButton(){
    const rotas = useRouter()

    let closeUser = ()=>{
        signOut(auth)
        .then(()=>{
            rotas.push("/")
        })
        .catch((err)=>{
            alert("Falha ao efeturar logout. Erro: " + err.message)
        })
    }

    return (<button className={styles.outline_btn} onClick={closeUser}>
        logout
    </button>)
}

function UserIcon({img_src}){
    return(<div className={styles.user_img}>
        <img src={img_src}></img>
    </div>)
}