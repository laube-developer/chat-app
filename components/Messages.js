import styles from "../styles/Messages.module.css"

import Image from "next/image"

function LeftMessage({children, date, imgUrl}){
    let hora = date ? date.getHours() : 0
    let minuto = date ? date.getMinutes() : 0

    return (<div className={styles.left_message}>
        <div className={styles.head}>
            <Image width={60} height={60} alt={"user"} src={imgUrl}/>
            <p>{hora}:{minuto}</p>
        </div>
        <div className={styles.content}>
            <p>{children}</p>
        </div>
    </div>)
}

function RightMessage({children, date}){
    let hora = date ? date.getHours() : 0
    let minuto = date ? date.getMinutes() : 0

    return (<div className={styles.right_message}>
        <div className={styles.content}>
            <p>{children}</p>
            <span className={styles.hour}>{hora}:{minuto}</span>
        </div>
    </div>)
}

export {LeftMessage, RightMessage}