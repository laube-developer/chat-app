import styles from "../styles/Contact.module.css"

export default function Contact({name, description, hour, img_url}){
    return (<div className={styles.contact}>
        <img src={img_url}/>
        <div className={styles.bottom}>
            <div>
                <h3>{name}</h3>
                <h5>{description}</h5>
            </div>
            <div>
                {/* Hour */}
                <p>{hour}</p>
            </div>
        </div>

    </div>) 
}