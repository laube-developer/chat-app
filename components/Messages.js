import styles from "../styles/Messages.module.css"

function LeftMessage({children, date}){
    let hora = date ? date.getHours() : 0
    let minuto = date ? date.getMinutes() : 0

    return (<div className={styles.left_message}>
        <div className={styles.head}>
            <Image width={60} height={60} alt={"user"}src="https://avatars.githubusercontent.com/u/59060532?s=400&u=e2da247b3c0714eac25e3b18d167232f9fdccc7c&v=4"/>
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