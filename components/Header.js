import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

//components
import AuthBar from "./AuthBar";

export default function Header({title}){
    const rotas = useRouter()

    return (
    <div className={styles.header}>
        <div className={styles.img} onClick={()=>{rotas.push("/")}}></div>
        <div className={styles.title} onClick={()=>{rotas.push("/")}}>
            <h1>{title}</h1>
        </div>
        <div></div>
        <AuthBar context={{uid: 30, authUser: {photoURL: "https://avatars.githubusercontent.com/u/59060532?v=4"}}}/>
    </div>
    )
}