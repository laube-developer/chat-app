import styles from "../styles/PageOver.module.css"

import { IoCloseSharp } from "react-icons/io5";

export default function PageOver({children, handleClose}){
    return <div className={styles.bg}>
        <div className={styles.content}>
            <div className={styles.close} onClick={handleClose}>
                <IoCloseSharp />
            </div>
            {children}
        </div>
    </div>
}