import styles from "../styles/Home.module.css";
import Head from "next/head";
import Header from './../components/Header';

//components
import {GoogleButton, EmailButton} from "../components/buttons";
import { useEffect, useState } from "react";
import MessageBar from "../components/MessageBar";
import { Router, useRouter } from "next/router";

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
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  const [messageCount, setMCount] = useState(10)

  const rotas = useRouter()

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount(count + 1)
      setAltura(Math.sin(2*Math.PI/60 * count) * 5)
    }, 2000/60)

    return () => {clearInterval(interval)}
  }, [count, alturaRelativa])

  useEffect(()=>{
    //Redirecionamento com tempo
    const messageInterval = setInterval(()=>{
      if(messageCount > 0) setMCount(messageCount - 1)
      if(messageCount == 0) {
        rotas.push("/chat")
        clearInterval(messageInterval)
      }
    }, 1000)

    return () => {clearInterval(messageInterval)}
  }, [messageCount])

  const submit = async (event)=>{
    const tentativaCadastro = await fetch("api/cadastrar", {
      method: "POST",
      body: JSON.stringify([{"user": {
        nickname: nickname,
        email: email,
        password: password 
      }}])
    })
    .then((response)=>{
      response.json().then((data)=>{
        console.log(response)
        setMessage(data.message)
        
        // Salvar o data.user na sessão atual e autenticar

        setMCount(10)
      })
    })
    .catch((err)=>{
      console.warn(err)
      setMessage(data.message)
      setMCount(10)
    })
  }

  return (<>
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <title>Cadastro</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.main_box + " scrollBar"}>
            <h1><img src="/favicon.svg" alt="Chat app - by Rafael Laube"/>Cadastrar no <span className={styles.blue_text}>Chat App</span></h1>
            <InputText fieldName={"Nickname"} setState={setNickname} value={nickname}/>
            <InputText fieldName={"Email"} setState={setEmail} value={email}/>
            <InputText fieldName={"Senha"} password  setState={setPassword} value={password}/>
            <GoogleButton />
            <EmailButton />
            <div className={styles.bottom_box}>
              <h5><span className={styles.blue_text}><a href="/">Esqueci a senha</a></span></h5>
              <button className={styles.submit} onClick={()=>{submit()}}>Cadastrar</button>
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
      {message != "" ? <MessageBar>{message}<br/>Redirecionando em {messageCount}</MessageBar> : <></>}
    </div>
  </>);
}