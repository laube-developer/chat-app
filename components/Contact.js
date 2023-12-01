import styles from "../styles/Contact.module.css"

import Image from "next/image"

export default function Contact({name, description, hour, img_url}){
    return (<div className={styles.contact}>
        <Image src={img_url} alt="user image" width={30} height={30}/>
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