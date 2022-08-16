import styles from "../styles/Messages.module.css"

function LeftMessage({children}){
    return (<div className={styles.left_message}>
        <div className={styles.head}>
            <img src="https://avatars.githubusercontent.com/u/59060532?s=400&u=e2da247b3c0714eac25e3b18d167232f9fdccc7c&v=4"/>
            <p>20:15</p>
        </div>
        <div className={styles.content}>
            <p>{children}</p>
        </div>
    </div>)
}

function RightMessage({children}){
    return (<div className={styles.right_message}>
        <div className={styles.content}>
            <p>{children}</p>
            <p><span>20:15</span></p>
        </div>
    </div>)
}

export {LeftMessage, RightMessage}