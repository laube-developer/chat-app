import styles from "../styles/Signin.module.css";
import Head from "next/head";
import Header from '../components/Header';

//components
import {GoogleButton, EmailButton, LogoutGoogleButton} from "../components/buttons";
import { useEffect, useState } from "react";
import MessageBar from "../components/MessageBar";

//Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import initializeFirebase from "../database/firebase";
import Cookies from "js-cookie";
const provider = new GoogleAuthProvider()
const app = initializeFirebase().app
const auth = getAuth(app)

//Next.js
import { useRouter } from "next/router";

function InputText({fieldName, password, setState, value}){
  return (<div className={styles.inputBox}>
    <label>{fieldName}</label>
    <input
      type={password ? "password" : "text"}
      onInput={(event)=>{setState(event.target.value)}}
      value={value}  
    />
  </div>
  )
}

export default function home(){
  const [count, setCount] = useState(0)
  const [alturaRelativa, setAltura] = useState(0)

  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("rafaellaube13@gmail.com")
  const [password, setPassword] = useState("123456")

  const rotas = useRouter()

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount(count + 1)
      setAltura(Math.sin(2*Math.PI/60 * count) * 5)
    }, 2000/60)

    return () => {clearInterval(interval)}
  }, [count, alturaRelativa])

  let popUp = () => {
    if(!app) return

    const currUser = Cookies.get("authUser")

    if(currUser == undefined) {signInWithEmailAndPassword(auth, email, password)
    .then(async (user)=>{
      Cookies.set("authUser", JSON.stringify(user))
      rotas.push("/chat")

      console.log(user)
    })
    .catch((err)=>{
        alert("Falha ao entrar! Tente novamente.")
        console.log(err)
    })}
    
    else {
      rotas.push("/chat")
    }

}

  return <>
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <title>Cadastro</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.main_box + " scrollBar"}>
            <h1><img src="/favicon.svg" alt="Chat app - by Rafael Laube"/>Entrar no <span className={styles.blue_text}>Chat App</span></h1>
            <InputText fieldName={"Email"} setState={setEmail} value={email}/>
            <InputText fieldName={"Senha"} password  setState={setPassword} value={password}/>
            <div className={styles.bottom_box}>
              <h5><span className={styles.blue_text}><a href="/">Esqueci a senha</a></span></h5>
              <button className={styles.submit} onClick={()=>{popUp()}}>Entrar</button>
            </div>
            <GoogleButton />
            <p>Este é um site de conversas, crie sua conta no <span className={styles.blue_text}>Chat App</span> e comece a compartilhar suas ideias instantaneamente.</p>
          </div>
          <div className={styles.chamada}>
            <div className={styles.legenda} style={{top: alturaRelativa + "px"}} onClick={()=>{setAltura(0)}}>
              <h1>Compartilhe suas <span className={styles.blue_text}>ideias</span> instantaneamente com o <span className={styles.blue_text}>Chat App</span></h1>
            </div>
            <div className={styles.mockup}>
              <img src="/img/mockup_chat.png"
              className={styles.mockup_chat}></img>
              <img src="/img/mockup_celular.png"
              className={styles.mockup_celular}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}