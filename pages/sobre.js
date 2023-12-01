import Image from "next/image"
import styles from "../styles/Sobre.module.css"

export default function Sobre(){
    return (<div className={styles.main}>
        <h1>Sobre o projeto <span>Chat App</span></h1>
        <p>Aplicativo de mensagens</p>
        <Image className={styles.img} src="/img/mockup_chat.png" alt="mockup"/>
    </div>)
}