import styles from "../styles/Chat.module.css"

import Head from "next/head"
import { useEffect, useRef, useState } from "react"

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
import { BiMenu  } from "react-icons/bi";
import { AiFillPlusCircle } from "react-icons/ai";

//app context
import MainContext from "../util/server/GlobalContext"

//firebase authentication
import initializeFirebase from "../database/firebase"
import { getAuth } from "firebase/auth"
import { NewContactButton } from "../components/NewContact"
const app = initializeFirebase().app
const auth = getAuth(app)
const db = getDatabase(app)

//realtime db
import { getChat, getMessages, getUserData, sendMessageData } from "../database/realtimeDB"

import { get, getDatabase, onValue, ref } from "firebase/database"
import PageOver from "../components/pageOver"

export default function Chat(){
    const [user, setUser] = useState({})

    const MessagesBoxRef = useRef(null)
    const InputRef = useRef(null)

    const [chats, setChats] = useState({
        current: false,
        list: []
    })


    const [isLoading, setLoading] = useState(false)

    const [newMessageInput, setMessage] = useState()

    const [contacts, setContacts] = useState([])

    const [showMenuContatos, setShowMenuContatos] = useState(false)

    const [showTelaAdicionarContato, setShowTelaAdicionarContato] = useState(false)

    const [inputFiltrarContatos, setInputFiltrar] = useState("")

    // Atualizar automaticamente a lista de contatos
    useEffect(()=>{
        const chatsRef = ref(db, `users/${user.uid}/chats`)

        return onValue(chatsRef, async (snapshot)=>{
            try{
                if(snapshot.exists && snapshot.val() == null) return
                const chatsList = Object.entries(snapshot.val())

                //buscar o chats
                let chatsDataListPromisses = chatsList.map(async (chat)=>{
                    let snapshot = await getChat(chat[0])

                    if(!snapshot.exists) return

                    const chatData = await snapshot.val()

                    return chatData
                })

                const chatsDataList = await Promise.all(chatsDataListPromisses)

                //buscar os dados dos usuários de cada chat
                let membersDataListPromisses = chatsDataList.map(async (chat)=>{
                    let membersListId = Object.entries(chat.members)

                    const chatMembersDataPromises = membersListId.map(async member=>{
                        let memberUid = member[0]
                        if(memberUid == user.uid) return false

                        let snapshot = await getUserData({uid: memberUid})

                        if(!snapshot.exists) return

                        const memberData = snapshot.val()

                        return memberData
                    })

                    return (await Promise.all(chatMembersDataPromises)).filter(i=>i)
                })

                let contactsData = await Promise.all(membersDataListPromisses)

                let contactsList = contactsData.map(async (data, id)=>{
                    let userData = Object.entries(data[0])[0][1]
                    let chatId = chatsList[id][0]

                    let snapshotLastMessage = await get(ref(db, `messages/${chatId}/lastMessage`))

                    if(!snapshotLastMessage.exists) return

                    const lastMessage = snapshotLastMessage.val()

                    console.log(lastMessage)

                    return {
                        name: userData.username,
                        description: String(lastMessage?.text).split(" ").slice(0, 4).join(" ") + " ..." || "",
                        lastMessageDate: new Date(lastMessage?.timestamp || new Date().getTime()),
                        imgUrl: userData.profilePicture,
                        email: userData.email,
                        chatId
                    }
                })

                console.log(Object.entries(await Promise.all(contactsList)))

                setContacts(Object.entries(await Promise.all(contactsList)))
                
            } catch (e) {
                console.log(e)
            }
        })
    }, [user])

    // Atualizar automaticamente as mensagens quando houver atualizações
    useEffect(()=>{
        let currChatRef = ref(db, `messages/${chats.current}`)

        return onValue(currChatRef, async (snapshot)=>{
            if(!snapshot.exists || snapshot.val() == null) return

            console.log(snapshot.val())

            atualizarMensagens(snapshot.val())
            scrollToBottom()
        })
    }, [])

    function scrollToBottom(){
        setTimeout(()=>{
            MessagesBoxRef.current.scrollTop = MessagesBoxRef.current.scrollHeight + MessagesBoxRef.current.clientHeight

        }, 1)
    }

    async function selecionarConversa(chatId){
        setChats({...chats, current: chatId})
        scrollToBottom()
        InputRef.current.focus()
    }

    async function atualizarMensagens(messagesData){
        if(!messagesData) return

        let messagesList = Object.entries(messagesData.list) || []

        let messages = messagesList.map(item=>{
            let messageKey = item[0]
            let data = item[1]
            let author = data.author

            return {
                type: author == user.uid ? "right" : "left",
                content: data.text,
                hora: new Date(data.timestamp)
            }
        })
        
        let newList = {...chats.list}
        newList[chats.current] = messages

        setChats({...chats, list: newList})

    }

    useEffect(()=>{
        if(chats.current == 0) return
        console.log("Abriu o chat")

        getMessages(chats.current)
        .then((snapshot)=>{
            if(!snapshot.exists) return

            atualizarMensagens(snapshot.val())
            scrollToBottom()

        })

    }, [chats.current, ])

    async function sendMessage(e){
        if(newMessageInput == "") return
        await sendMessageData(chats.current, newMessageInput, user.uid, new Date().getTime())

        let snapshot = await getMessages(chats.current)

        if(!snapshot.exists) return

        atualizarMensagens(snapshot.val())
        setMessage("")
        scrollToBottom()
    }

    function showMenuNovoContato(){
        setShowMenuContatos(!showMenuContatos)
    }


    function mostrarTelaAddContatos(){
        setShowTelaAdicionarContato(!showTelaAdicionarContato)
    }

    return (
        <AuthComponent user={user} setUser={setUser}>
            <div className="">
                <Head>
                    <link rel="icon" href="/favicon.svg" />
                    <title>Chat</title>
                </Head>
                <div className="h-[100vh] flex flex-col">
                    <Header title="Chat App" isLoading={isLoading} setLoading={setLoading}/>

                        <div className="grid grid-cols-[500px_auto] gap-2 h-full border-t-2 border-slate-200">
                            <div className="h-full p-2">

                                <div className="grid grid-cols-[auto_40px] w-full bg-slate-200 rounded-md  items-center content-between overflow-hidden">
                                    <input
                                        onInput={(e)=>{setInputFiltrar(e.target.value)}}
                                        value={inputFiltrarContatos}
                                        className="h-full text-xl outline-none w-full indent-4"    
                                    />

                                    <button className="w-10 h-10 text-2xl hover:bg-slate-300 flex justify-center items-center cursor-pointer rounded-md">
                                        <BiSearchAlt2></BiSearchAlt2>
                                    </button>
                                </div>

                                {contacts.length == 0 && <NewContactButton />}

                                {contacts.map((item)=>{
                                    let chatId = item[0]
                                    let itemData = item[1]

                                    if(inputFiltrarContatos == "" || String(itemData.name).indexOf(inputFiltrarContatos) != -1)

                                    return <Contact 
                                        name={itemData.name}
                                        description={itemData.description}
                                        hour={`${itemData.lastMessageDate.getHours()}:${itemData.lastMessageDate.getMinutes()}`}
                                        imgUrl={itemData.imgUrl}
                                        handleClick={()=>{selecionarConversa(itemData.chatId)}}
                                        key={chatId}
                                    />
                                })}
                            </div>
                            
                            <div className={styles.right_box}>
                                <div className={styles.chat_box}>
                                    <div className={styles.messages + " scrollBar"} ref={MessagesBoxRef}>
                                        {!chats.current && <h3>Selecione uma conversa</h3>}
                                        {chats.current && chats.list[chats.current]?.map((message, id)=>{
                                            if(message.type == "right"){
                                                return <RightMessage key={id} date={message.hora}>{message.content}</RightMessage>
                                            } else if(message.type == "left"){
                                                return <LeftMessage key={id} date={message.hora} imgUrl={contacts.filter(item=>item[1].chatId == chats.current)[0][1].imgUrl}>{message.content}</LeftMessage>
                                            }
                                        })}
                                    </div>
                                    {chats.current && <div className={styles.input_box}>
                                        <div className={styles.input_bar}>
                                            <GoSmiley/>
                                            <input value={newMessageInput} onInput={(e)=>{setMessage(e.target.value)}} onKeyDown={(e)=>{if(e.key == "Enter") sendMessage(e)}} ref={InputRef}/>
                                            <AiOutlinePaperClip/>
                                        </div>
                                        <button onClick={(e)=>{sendMessage(e)}}><HiPaperAirplane /></button>
                                    </div>}
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </AuthComponent>
    )
}