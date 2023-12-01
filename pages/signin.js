import styles from "../styles/Signin.module.css";
import Head from "next/head";
import Header from '../components/Header';

//components
import {GoogleButton, EmailButton, LogoutGoogleButton} from "../components/buttons";
import { useEffect, useState } from "react";
import Loadding from "../components/Loadding";
import InputText from "../components/InputText";

//Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import initializeFirebase from "../database/firebase";
import Cookies from "js-cookie";
const provider = new GoogleAuthProvider()
const app = initializeFirebase().app
const auth = getAuth(app)

//Next.js
import { useRouter } from "next/router";

export default function Signin(){
  const [count, setCount] = useState(0)
  const [alturaRelativa, setAltura] = useState(0)

  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("rafaellaube13@gmail.com")
  const [password, setPassword] = useState("123456")

  const rotas = useRouter()

  const [isLoadding, setLoading] = useState(true)

  useEffect(()=>{
    const authUser = JSON.parse(Cookies.get("user") || "{}")

    if(authUser?.uid) rotas.push("/chat")
    else setLoading(false)
  }, [rotas])

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount(count + 1)
      setAltura(Math.sin(2*Math.PI/60 * count) * 5)
    }, 2000/60)

    return () => {clearInterval(interval)}
  }, [count, alturaRelativa])

  let signInEmail = () => {
    if(!app) return

    signInWithEmailAndPassword(auth, email, password)
    .then(async ({user})=>{

      Cookies.set("user", JSON.stringify(user))

      rotas.push("/chat")
    })
    .catch((err)=>{
      alert(`Falha ao entrar! Tente novamente.\n\n${err.message}`)
      console.warn(err)
    })

  }

  let signInGoogle = async ()=>{
      if(!app) return

      signInWithPopup(auth, provider)
      .then(async ({user})=>{       
          Cookies.set("user", JSON.stringify(user))

          await saveUser({user})

          rotas.push("/chat")
          
      })
      .catch((err)=>{
          setGContext({...globalContext,isLoadding: false})
          console.warn(err)
      })
  }

  return <>
    {isLoadding && <Loadding />}

    {!isLoadding && <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <title>Entrar</title>
        </Head>
        <div className={styles.main}>
        <Header title={"Chat app"}/>
          <div className={styles.content}>
            <div className={styles.main_box + " scrollBar"}>
              <h1><img src="/favicon.svg" alt="Chat app - by Rafael Laube"/>Entrar no <span className={styles.blue_text}>Chat App</span></h1>
              <InputText fieldName={"Email"} setState={setEmail} value={email}/>
              <InputText fieldName={"Senha"} password  setState={setPassword} value={password}/>
              <div className={styles.bottom_box}>
                <button className={styles.submit} onClick={signInEmail}>Entrar</button>
              </div>
              <GoogleButton handleClick={signInGoogle}/>
              <div style={{textAlign: "center", fontSize:"1.2rem"}}>
                <h5><span className={styles.blue_text}><a href="/resetPassword">Esqueci a senha</a></span></h5>
                <h5><span className={styles.blue_text}><a href="/cadastrar">Realizar cadastro</a></span></h5>
              </div>
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
    </>}
  </>

}