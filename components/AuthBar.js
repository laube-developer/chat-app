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
import Image from "next/image"


export default function AuthBar({lightBg, preventAutoRedirect, setLoading}){
    const [user, setUser] = useState({})

    useEffect(()=>{
        let authUser = JSON.parse(Cookies.get("user") || "{}")

        setUser(authUser)

        console.log(user)
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
        <Image src={img_src} alt="user_icon" width={50} height={50} />
    </div>)
}