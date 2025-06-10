import styles from "../styles/Signin.module.css";
import Head from "next/head";
import Header from '../components/Header';

//components
import {GoogleButton, EmailButton, LogoutGoogleButton} from "../components/buttons";
import { useEffect, useState } from "react";
import MessageBar from "../components/MessageBar";
import Loadding from "../components/Loadding";
import InputText from "../components/InputText";


//Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import initializeFirebase from "../database/firebase";
import Cookies from "js-cookie";
const provider = new GoogleAuthProvider()
const app = initializeFirebase().app
const auth = getAuth(app)

//Next.js
import { useRouter } from "next/router";
import MainContext from "../util/server/GlobalContext";
import Link from "next/link";
import Image from "next/image";


export default function Signin(){
  const [count, setCount] = useState(0)
  const [alturaRelativa, setAltura] = useState(0)

  const [email, setEmail] = useState("rafaellaube13@gmail.com")

  const rotas = useRouter()

  const [isLoadding, setLoading] = useState(true)

  const [pageState, setPageState] = useState({currPage: 1, erroMessage: ""})

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

  let recuperarSenha = () => {
    if(!app) return

    sendPasswordResetEmail(auth, email)
    .then((resposta)=>{
      setPageState({...pageState, currPage: 2})
    })
    .catch((err)=>{
      setPageState({...pageState, currPage: 3,
        erroMessage: `Problema ao recuperar senha: \n${err.message}`})

    })

  }


  return <>
    {isLoadding && <Loadding />}

    {!isLoadding && <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <title>Recuperar Senha</title>
        </Head>
        <div className={styles.main}>
        <Header title={"Chat app"}/>
          <div className={styles.content}>
            <div className={styles.main_box + " scrollBar"}>

              {pageState.currPage == 1 && <>
                <h1><Image width={100} height={100} src="/favicon.svg" alt="Chat app - by Rafael Laube"/>Recuperar senha no <span className={styles.blue_text}>Chat App</span></h1>
                <InputText fieldName={"Email"} setState={setEmail} value={email}/>
                <p>Digite o endereço de email para recuperar a sua senha. Será enviado um email para este endereço com as instruções para recuperação da senha.</p>
                <p>Email selecionado: <span className={styles.blue_text}>{email}</span></p>
                <div className={styles.bottom_box}>
                  <h5><span className={styles.blue_text}><Link href="/signin">Entrar com email</Link></span></h5>
                  <button className={styles.submit} onClick={recuperarSenha}>Enviar email</button>
                </div>
              </>}

              {pageState.currPage == 2 && <>
                <h1><Image width={100} height={100} src="/favicon.svg" alt="Chat app - by Rafael Laube"/>Recuperar senha no <span className={styles.blue_text}>Chat App</span></h1>
                <h2 style={{color: "#00b100"}}>Email enviado com sucesso</h2>
                <div className={styles.bottom_box}>
                  <button className={styles.submit} onClick={()=>{setPageState({...pageState, currPage: 1})}}>Voltar</button>
                  <button className={styles.submit} onClick={()=>{rotas.push("/signin")}}>Realizar login</button>
                </div>
              </>}

              {pageState.currPage == 3 && <>
                <h1><Image width={100} height={100} src="/favicon.svg" alt="Chat app - by Rafael Laube"/>Recuperar senha no <span className={styles.blue_text}>Chat App</span></h1>
                <h2 style={{color: "#b10000"}}>Falha ao recuperar senha</h2>
                <p>{pageState.erroMessage}</p>
                <div className={styles.bottom_box}>
                  <button className={styles.submit} onClick={()=>{setPageState({...pageState, currPage: 1})}}>Voltar</button>
                </div>
              </>}


              <p>Este é um site de conversas, crie sua conta no <span className={styles.blue_text}>Chat App</span> e comece a compartilhar suas ideias instantaneamente.</p>

            </div>
            <div className={styles.chamada}>
              <div className={styles.legenda} style={{top: alturaRelativa + "px"}} onClick={()=>{setAltura(0)}}>
                <h1>Compartilhe suas <span className={styles.blue_text}>ideias</span> instantaneamente com o <span className={styles.blue_text}>Chat App</span></h1>
              </div>
              <div className={styles.mockup}>
                <Image width={100} height={100} src="/img/mockup_chat.png" alt="mockup_chat"
                className={styles.mockup_chat}/>
                <Image width={100} height={100} src="/img/mockup_celular.png" alt="mockup_celular"
                className={styles.mockup_celular}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>}
  </>

}