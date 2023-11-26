import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

//components
import AuthBar from "./AuthBar";
import Cookies from "js-cookie";

export default function Header({title, lightBg}){
    const rotas = useRouter()

    return (
    <div className={styles.header}>
        <div className={styles.img} onClick={()=>{rotas.push("/")}}></div>
        <div className={styles.title} onClick={()=>{rotas.push("/")}}>
            <h1>{title}</h1>
        </div>
        <div></div>
        <AuthBar lightBg={true}/>
    </div>
    )
}