import styles from "../styles/Chat.module.css"

import Head from "next/head"
import { useContext, useEffect, useState } from "react"

//Components
import Header from "../components/Header"
import Contact from "../components/Contact"
import { LeftMessage, RightMessage } from "../components/Messages"
import AuthComponent from "../components/auth/AuthComponent"

//icons
import {BiSearchAlt2} from "react-icons/bi"
import {GoSmiley} from "react-icons/go"
import {AiOutlinePaperClip} from "react-icons/ai"
import {HiPaperAirplane} from "react-icons/hi"

//app context
import MainContext from "../util/server/GlobalContext"

//firebase authentication
import initializeFirebase from "../database/firebase"
import { getAuth } from "firebase/auth"
const app = initializeFirebase().app
const auth = getAuth(app)

//firestore database

export default function Chat(){
    const {globalContext, setGContext} = useContext(MainContext)
    const [user, setUser] = useState({})
    
    const [messages, setMessages] = useState([
        {type: "left", content:"Bom dia, tudo bem?", hora: new Date()},
    ])
    const [isLoading, setLoading] = useState(false)

    const [newMessageInput, setMessage] = useState("sdfasf")

    // useEffect(()=>{
    //     const execute = async ()=>{
    //         let contatos = await getContacts({user: globalContext.user})
        
    //         console.log(contatos)
    //     }
    //     execute()
    // }, [])

    return (<AuthComponent user={user} setUser={setUser}>
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <title>Chat</title>
            </Head>
            <div className={styles.main}>
                <Header title="Chat App" isLoading={isLoading} setLoading={setLoading}/>
                {!isLoading && 
                
                <div className={styles.content}>
                    <div className={styles.left_box}>
                        <div className={styles.contacts + " scrollBar"}>
                            <div className={styles.search}>
                                <BiSearchAlt2></BiSearchAlt2>
                                <input />
                            </div>
                            {}
                            {/* <Contact key={1} name="Contact" description="Description" hour="20:18" img_url="https://avatars.githubusercontent.com/u/59060532?s=400&u=e2da247b3c0714eac25e3b18d167232f9fdccc7c&v=4"/>
                            <Contact key={2} name="BFF" description="Description" hour="20:01" img_url="https://avatars.githubusercontent.com/u/5692572?v=4"/>
                            <Contact key={3} name="James" description="Description" hour="20:40" img_url="https://avatars.githubusercontent.com/u/17869024?s=200&v=4"/> */}
                        </div>
                    </div>
                    <div className={styles.right_box}>
                        <div className={styles.chat_box}>
                            <div className={styles.messages + " scrollBar"}>
                                {messages.map((message, id)=>{
                                    if(message.type == "right"){
                                        return <RightMessage key={id} date={message.hora}>{message.content}</RightMessage>
                                    } else if(message.type == "left"){
                                        return <LeftMessage key={id} date={message.hora}>{message.content}</LeftMessage>
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
                }
            </div>
        </div>
    </AuthComponent>)

    return <></>
}