import styles from "../styles/Header.module.css";

//components
import AuthBar from "./AuthBar";

export default function Header({title}){
    return (
    <div className={styles.header}>
        <div className={styles.img}></div>
        <div className={styles.title}>
            <h1>{title}</h1>
        </div>
        <div></div>
        <AuthBar context={{uid: 30, authUser: {photoURL: "https://avatars.githubusercontent.com/u/59060532?v=4"}}}/>
    </div>
    )
}