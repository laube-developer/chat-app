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
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import MainContext from "../util/server/GlobalContext";

function GoogleButton({handleClick}){
    return (<button className={styles.button} onClick={()=>{handleClick()}}>
        <FcGoogle />
        Entrar com Google
    </button>)
}

function EmailButton({email, password}){

    return (<button className={styles.button} onClick={()=>{popUp()}}>
        <MdOutlineAlternateEmail />
        Entrar com Email
    </button>)
}

function LogoutButton({lightBg}){
    const rotas = useRouter()

    let closeUser = ()=>{
        Cookies.remove("user")
        
        signOut(auth)
        .then(()=>{
            if(rotas.pathname != "/") rotas.push("/")
            else rotas.reload()
        })
        .catch((err)=>{
            alert("Falha ao efeturar logout. Erro: " + err.message)
        })
    }

    return (<button className={styles.fill_btn} onClick={closeUser}>
        Sair
    </button>)
}

function LoginButton({lightBg}){
    const rotas = useRouter()

    return (<button className={styles.fill_btn} onClick={()=>{rotas.push("/signin")}}>
        Entrar
    </button>)
}
function MinhasMensagens(){
    const rotas = useRouter()

    return <button className={styles.fill_btn} onClick={()=>{rotas.push("/chat")}}>
        Minhas Mensages
    </button>
}

export {
    GoogleButton,
    EmailButton,
    LogoutButton,
    LoginButton,
    MinhasMensagens
}