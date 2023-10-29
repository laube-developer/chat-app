import styles from "../styles/Home.module.css";
import Head from "next/head";
import Header from './../components/Header';

//components
import {GoogleButton, EmailButton} from "../components/buttons";

function InputText({fieldName, password}){
  return (<>
    <label>{fieldName}</label>
    <input type={password ? "password" : "text"}/>
  </>
  )
}

export default function home(){
  return (<>
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <title>Cadastro</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.main_box + " scrollBar"}>
            <h1>Cadastrar no <span className={styles.blue_text}>Chat App</span></h1>
            <InputText fieldName={"Nickname"}/>
            <InputText fieldName={"Email"}/>
            <InputText fieldName={"Senha"} password/>
            <GoogleButton />
            <EmailButton />
            <div className={styles.bottom_box}>
              <h5><span className={styles.blue_text}><a href="/">Esqueci a senha</a></span></h5>
              <button className={styles.submit}>Cadastrar</button>
            </div>
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
  </>);
}