import { useRouter } from "next/router"
import styles from "../styles/AuthBar.module.css"
import Cookies from "js-cookie"
import { useContext, useEffect, useState } from "react"
import { signOut } from "firebase/auth"

import initializeFirebase from "../database/firebase"
const app = initializeFirebase().app
import { getAuth } from "firebase/auth"
const auth = getAuth(app)

import { LogoutButton, LoginButton, MinhasMensagens} from "./buttons"

import MainContext from "../util/server/GlobalContext"


export default function AuthBar({lightBg, preventAutoRedirect, setLoading}){
    const [user, setUser] = useState({})

    useEffect(()=>{
        let authUser = JSON.parse(Cookies.get("user") || "{}")

        setUser(authUser)
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

function UserIcon({img_src}){
    return(<div className={styles.user_img}>
        <img src={img_src}></img>
    </div>)
}