import styles from "../styles/Buttons.module.css";

//icons
import {FcGoogle} from "react-icons/fc";
import {MdOutlineAlternateEmail} from "react-icons/md"

//Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import initializeFirebase from "../database/firebase";
const provider = new GoogleAuthProvider()
const app = initializeFirebase().app
const auth = getAuth(app)

//js-cookie
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

function GoogleButton(){
    
    const rotas = useRouter()

    let popUp = async ()=>{
        let app = initializeFirebase().app
        if(!app) return

    
        signInWithPopup(auth, provider)
        .then(async (user)=>{
            //user is response.user
            Cookies.set("authUser", JSON.stringify(user))

            rotas.push("/chat")
        
        })
        .catch((err)=>{
            console.warn(err)
        })
    }

    return (<button className={styles.button} onClick={()=>{popUp()}}>
        <FcGoogle />
        Entrar com Google
    </button>)
}

function LogoutGoogleButton (){

    let logout = ()=>{
        signOut(auth)
        .then(()=>{
            alert("Logout efetuado com sucesso")
        })
        .catch((err)=>{
            console.warn(err)
        })
    }

    return (<button className={styles.button} onClick={()=>{logout()}}>
        Sair
    </button>)
}

function EmailButton({email, password}){

    return (<button className={styles.button} onClick={()=>{popUp()}}>
        <MdOutlineAlternateEmail />
        Entrar com Email
    </button>)
}

export {GoogleButton, EmailButton, LogoutGoogleButton}