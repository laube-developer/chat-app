import styles from "../styles/Loadding.module.css"

import Lottie from "react-lottie"
import * as animationData from "../util/server/loadding_animation.json"

//Fonts
import {Inter} from "next/font/google"
const inter200 = Inter({
    weight: "200",
    subsets: ["latin"]
})


const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

export default function Loadding(){
    return <div className={`${styles.loadding} ${inter200.className}`}>
        <div className={styles.animation}>
            <Lottie options={defaultOptions}></Lottie>
        </div>
        <h1>Carregando suas mensagens...</h1>
    </div>
}