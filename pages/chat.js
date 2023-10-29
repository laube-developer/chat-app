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
import { useState } from "react"

export default function Chat(){

    const [messages, setMessages] = useState([
        {type: "left", content:"Bom dia, tudo bem?", hora: new Date()},
    ])

    const [newMessageInput, setMessage] = useState("sdfasf")

    return (<div className={styles.container}>
        <Head>
            <link rel="icon" href="/favicon.svg" />
            <title>Chat</title>
        </Head>
        <div className={styles.main}>
            <Header title="Chat App"/>
            <div className={styles.content}>
                <div className={styles.left_box}>
                    <div className={styles.contacts + " scrollBar"}>
                        <div className={styles.search}>
                            <BiSearchAlt2></BiSearchAlt2>
                            <input />
                        </div>
                        <Contact name="Contact" description="Description" hour="20:18" img_url="https://avatars.githubusercontent.com/u/59060532?s=400&u=e2da247b3c0714eac25e3b18d167232f9fdccc7c&v=4"/>
                        <Contact name="BFF" description="Description" hour="20:01" img_url="https://avatars.githubusercontent.com/u/5692572?v=4"/>
                        <Contact name="James" description="Description" hour="20:40" img_url="https://avatars.githubusercontent.com/u/17869024?s=200&v=4"/>
                    </div>
                </div>
                <div className={styles.right_box}>
                    <div className={styles.chat_box}>
                        <div className={styles.messages + " scrollBar"}>
                            {messages.map((message)=>{
                                if(message.type == "right"){
                                    return <RightMessage date={message.hora}>{message.content}</RightMessage>
                                } else if(message.type == "left"){
                                    return <LeftMessage date={message.hora}>{message.content}</LeftMessage>
                                }
                            })}
                        </div>
                        <div className={styles.input_box}>
                            <div className={styles.input_bar}>
                                <GoSmiley/>
                                <input value={newMessageInput} onInput={(e)=>{setMessage(e.target.value)}}/>
                                <AiOutlinePaperClip />
                            </div>
                            <button onClick={(e)=>{
                                setMessages([...messages, {type: "right", content: newMessageInput, hora: new Date()}])
                                setMessage("")
                            }}><HiPaperAirplane /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}