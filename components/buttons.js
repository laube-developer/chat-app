import styles from "../styles/Buttons.module.css";

import {FcGoogle} from "react-icons/fc";
import {MdOutlineAlternateEmail} from "react-icons/md"

function GoogleButton(){
    return (<button className={styles.button}>
        <FcGoogle />
        Entrar com Google
    </button>)
}

function EmailButton(){
    return (<button className={styles.button}>
        <MdOutlineAlternateEmail />
        Entrar com Email
    </button>)
}

export {GoogleButton, EmailButton}