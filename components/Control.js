import styles from "../styles/Control.module.css"

function Button({name, icon, handleClick, children}){
    return (
    <button
        className={styles.button}
        onClick={handleClick}
    >
        {children}
        {name}
    </button>)
}

export {Button}