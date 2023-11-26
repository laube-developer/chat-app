import Head from "next/head";
import styles from "../styles/Index.module.css"

export default function Index(){
    return <div className={styles.main}>
        <Head>
            <link rel="icon" href="/favicon.svg" />
            <title>Chat app | Descubra</title>
        </Head>
        
    </div>
}