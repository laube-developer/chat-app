import styles from "../styles/Contact.module.css"

import Image from "next/image"

export default function Contact({name, description, hour, img_url, handleClick}){
    return (<div className={styles.contact} onClick={handleClick}>
        <Image src={img_url} alt="user image" width={40} height={40}/>
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