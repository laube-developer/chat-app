import { useState } from "react"
import styles from "../styles/MessageBar.module.css"

export default function MessageBar({color, children}){
    const [blur, setBlur] = useState(false)

    return <div
        className={styles.background}
        onBlur={()=>{setBlur(true)}}
        style={{display: blur ? 'none' : 'flex'}}
        >
        <div className={styles.messageBar}>
            <p>{children}</p>
        </div>
    </div>
}