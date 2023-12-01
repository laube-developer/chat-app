import styles from "../styles/InputText.module.css"

export default function InputText({fieldName, password, setState, value}){
return (<div className={styles.inputBox}>
        <label>{fieldName}</label>
        <input
        type={password ? "password" : "text"}
        onInput={(event)=>{setState(event.target.value)}}
        value={value}  
        />
    </div>)
}