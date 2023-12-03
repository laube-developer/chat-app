import styles from "../styles/Chat.module.css"

import Head from "next/head"
import { useContext, useEffect, useRef, useState } from "react"

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
import { NewContactButton } from "../components/NewContact"
const app = initializeFirebase().app
const auth = getAuth(app)

//realtime db
import { getChats } from "../database/realtimeDB"

import Cookies from "js-cookie"

export default function Chat(){
    const {globalContext, setGContext} = useContext(MainContext)
    const [user, setUser] = useState({})

    const MessagesBoxRef = useRef(null)

    const [messages, setMessages] = useState([
        {type: "left", content:"Bom dia, tudo bem?", hora: new Date()},
    ])
    const [isLoading, setLoading] = useState(false)

    const [newMessageInput, setMessage] = useState("sdfasf")

    const [contacts, setContacts] = useState([
        // {
        //     name: "Contact",
        //     description: "Description",
        //     lastMessageDate: new Date(new Date().getTime()),
        //     img_url: "https://avatars.githubusercontent.com/u/59060532?s=400&u=e2da247b3c0714eac25e3b18d167232f9fdccc7c&v=4"
        // },{
        //     name: "BFF",
        //     description: "Description",
        //     lastMessageDate: new Date(new Date().getTime()),
        //     img_url: "https://avatars.githubusercontent.com/u/5692572?v=4"
        // },{
        //     name: "James",
        //     description: "Description",
        //     lastMessageDate: new Date(new Date().getTime()),
        //     img_url: "https://avatars.githubusercontent.com/u/17869024?s=200&v=4"
        // },
    ])
    function scrollToBottom(){
        setTimeout(()=>{
            MessagesBoxRef.current.scrollTop = MessagesBoxRef.current.scrollHeight + MessagesBoxRef.current.clientHeight

        }, 1)
    }

    function sendMessage(e){
        if(newMessageInput == "") return
        setMessages([...messages, {type: "right", content: newMessageInput, hora: new Date()}])
        setMessage("")
        scrollToBottom()
        
    }

    function receiveMessage({content, hora}){
        setMessages([...messages, {type: "left", content: content, hora: hora}])
        scrollToBottom()
    }

    useEffect(()=>{
        getChats(user.uid, (chats)=>console.log(chats))
    }, [])

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
                            {contacts.length == 0 && <NewContactButton />}
                            {contacts.map((item)=>{
                                return <Contact
                                    name={item.name}
                                    description={item.description}
                                    hour={`${item.lastMessageDate.getHours()}:${item.lastMessageDate.getMinutes()}`}
                                    img_url={item.img_url}
                                />
                            })}

                        </div>
                    </div>
                    <div className={styles.right_box}>
                        <div className={styles.chat_box}>
                            <div className={styles.messages + " scrollBar"} ref={MessagesBoxRef}>
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
                                    <input value={newMessageInput} onInput={(e)=>{setMessage(e.target.value)}} onKeyDown={(e)=>{if(e.key == "Enter") sendMessage()}}/>
                                    <AiOutlinePaperClip onClick={()=>{receiveMessage({content:"e aí",hora: new Date()})}}/>
                                </div>
                                <button onClick={sendMessage}><HiPaperAirplane /></button>
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