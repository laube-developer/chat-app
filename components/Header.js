import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

//components
import AuthBar from "./AuthBar";

export default function Header({title, lightBg, preventAutoRedirect, setLoading, isLoading}){
    const rotas = useRouter()

    return (
    <div className={!isLoading ? styles.header : ""}>
        <div className={styles.img} onClick={()=>{rotas.push("/")}}></div>
        <div className={styles.title} onClick={()=>{rotas.push("/")}}>
            <h1>{title}</h1>
        </div>
        <div></div>
        <AuthBar lightBg={true} preventAutoRedirect={preventAutoRedirect} setLoading={setLoading}/>
    </div>
    )
}