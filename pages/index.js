import styles from "../styles/Home.module.css";
import Head from "next/head";
import Header from './../components/Header';

//components
import {GoogleButton, EmailButton} from "../components/buttons";
import { useEffect, useState } from "react";

function InputText({fieldName, password}){
  return (<div className={styles.inputBox}>
    <label>{fieldName}</label>
    <input type={password ? "password" : "text"}/>
  </div>
  )
}

export default function home(){
  const [count, setCount] = useState(0)
  const [alturaRelativa, setAltura] = useState(0)

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount(count + 1)
      setAltura(Math.sin(2*Math.PI/60 * count) * 5)
      console.log(count, alturaRelativa)
    }, 2000/60)

    return () => {clearInterval(interval)}
  }, [count, alturaRelativa])

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
            <InputText fieldName={"Nickname"}/>
            <InputText fieldName={"Email"}/>
            <InputText fieldName={"Senha"} password/>
            <GoogleButton />
            <EmailButton />
            <div className={styles.bottom_box}>
              <h5><span className={styles.blue_text}><a href="/">Esqueci a senha</a></span></h5>
              <button className={styles.submit}>Cadastrar</button>
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
  </>);
}