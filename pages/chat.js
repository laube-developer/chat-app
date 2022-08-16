import styles from "../styles/Chat.module.css"

import Head from "next/head"

import Header from "../components/Header"
import { GoogleButton, EmailButton } from "../components/buttons"
import Contact from "../components/Contact"
import { Button } from "../components/Control"
import { LeftMessage, RightMessage } from "../components/Messages"

//icons
import {BiSearchAlt2} from "react-icons/bi"
import {BsPlus} from "react-icons/bs"
import {BsArrowDownShort} from "react-icons/bs"
import {GoSmiley} from "react-icons/go"
import {AiOutlinePaperClip} from "react-icons/ai"
import {HiPaperAirplane} from "react-icons/hi"

export default function Chat(){
    return (<div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.svg" />
            <title>Chat</title>
        </Head>
        <div className={styles.main}>
            <Header title="Chat App"/>
            <div className={styles.content}>
                <div className={styles.left_box}>
                    <div className={styles.search}>
                        <BiSearchAlt2></BiSearchAlt2>
                        <input />
                    </div>
                    <div className={styles.contacts}>
                        <Contact name="Contact" description="Description" hour="20:18" img_url="https://avatars.githubusercontent.com/u/59060532?s=400&u=e2da247b3c0714eac25e3b18d167232f9fdccc7c&v=4"/>
                        <Contact name="BFF" description="Description" hour="20:01" img_url="https://avatars.githubusercontent.com/u/5692572?v=4"/>
                        <Contact name="James" description="Description" hour="20:40" img_url="https://avatars.githubusercontent.com/u/17869024?s=200&v=4"/>
                    </div>
                </div>
                <div className={styles.right_box}>
                    <div className={styles.controls}>
                        <Button name="Nova Conversa"><BsPlus/></Button>
                        <Button name="Descer"><BsArrowDownShort/></Button>
                    </div>
                    <div className={styles.chat_box}>
                        <div className={styles.messages}>
                            <LeftMessage>Bom dia, tudo bem?</LeftMessage>
                            
                            <RightMessage>Tudo sim, e contigo?</RightMessage>
                            <RightMessage>Anda sumido...</RightMessage>
                        </div>
                        <div className={styles.input_box}>
                            <div className={styles.input_bar}>
                                <GoSmiley/>
                                <input />
                                <AiOutlinePaperClip />
                            </div>
                            <button><HiPaperAirplane /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}