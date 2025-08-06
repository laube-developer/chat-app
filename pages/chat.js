import Head from "next/head"

//Components
import Header from "../components/Header"
import Contact from "../components/Contact"
import { DateLine, LeftMessage, RightMessage } from "../components/Messages"

//icons
import {BiSearchAlt2} from "react-icons/bi"
import {GoSmiley} from "react-icons/go"
import {AiOutlinePaperClip} from "react-icons/ai"
import {HiPaperAirplane} from "react-icons/hi"

//firebase authentication
import Image from "next/image"
import { useState } from "react"

//realtime db



export default function Chat(){

    //function
    function insertDateSeparators(messages, timeZone = 'America/Sao_Paulo') {
    const getLocalDateString = (timestamp) =>
        new Intl.DateTimeFormat('en-CA', { // formato YYYY-MM-DD
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        }).format(new Date(timestamp));

    return messages.map((msg, index, arr) => {
        const currentDate = getLocalDateString(msg.timestamp);
        const prevDate = index > 0 ? getLocalDateString(arr[index - 1].timestamp) : null;

        if (index === 0 || currentDate !== prevDate) {
        return [
            { dateSeparator: true, timestamp: msg.timestamp },
            msg
        ];
        }

        return msg;
    }).flat();
    }

    function mergeMessagesSameMinute(messages, timeZone = 'America/Sao_Paulo') {
    const getMinuteKey = (timestamp) =>
        new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
        }).format(new Date(timestamp)).replace(',', '');

    const merged = [];

    messages.forEach((msg) => {
        const key = getMinuteKey(msg.timestamp);
        const last = merged[merged.length - 1];

        if (
        last &&
        getMinuteKey(last.timestamp) === key &&
        last.author_uid === msg.author_uid
        ) {
        last.text += `\n${msg.text}`;
        } else {
        merged.push({ ...msg });
        }
    });

    return merged;
    }

    const [messages, setMessages] = useState([
        {"author_uid": "789456", "text": "Olá, como vai?", "timestamp": 1749521700000},
        {"author_uid": "123456", "text": "Estou bem, e vc?", "timestamp": 1749546900000},
        {"author_uid": "123456", "text": "Estou bem, e vc?", "timestamp": 1749546960000},
        {"author_uid": "123456", "text": "E aí, deu certo?", "timestamp": 1749546960000}
    ])

    const [messageInput, setInput] = useState("")

    const user = {
        uid: "123456"
    }

    function enviarMensagem(event){
        const newMessages = [...messages, {
            "author_uid": user.uid,
            "text": messageInput,
            "timestamp": new Date().getTime()
        }]

        setMessages(newMessages)
        setInput("")
    }

    return (
        <div className="relative overflow-y-hidden h-[100vh] bg-slate-200">
            
            <Head>
                <link rel="icon" href="/favicon.svg" />
                <title>Chat</title>
            </Head>
            

            <div className="flex flex-col h-full">
            <Image
                src="/favicon.svg"
                width={1920}
                height={1920}
                alt="Background"
                className="absolute w-full z-0 -translate-x-[25vw] -translate-y-[90vh]"
            />
                <Header title="Chat App"/>


                    <div className="grid grid-cols-[400px_auto] h-full">
                        <div className="h-full px-2 pb-2 flex flex-col gap-2">

                            <div className="w-full h-10 relative group">

                                {/* Barra de pesquisa */}
                                <div className="w-full bg-white rounded-full shadow-lg shadow-black/20 h-10 flex flex-row group z-20">
                                    

                                    <button className="w-10 h-10 text-2xl flex row cursor-pointer items-center justify-center text-slate-500">
                                        <BiSearchAlt2></BiSearchAlt2>
                                    </button>

                                    <input
                                        onInput={()=>{}}
                                        className="h-full text-md outline-none w-full indent-2 z-20"    
                                    />
                                </div>
                            </div>


                            <div className="w-full h-full bg-white rounded-xl shadow-lg shadow-black/20 overflow-x-hidden overflow-y-scroll z-0">
                                    <Contact
                                        name={"Rafael"}
                                        description={"Rafael Laube"}
                                        hour={`${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}`}
                                        imgUrl={"https://avatars.githubusercontent.com/u/59060532?v=4"}
                                        // handleClick={()=>{selecionarConversa(itemData.chatId)}}
                                        key={"id_01234"}
                                    />
                                {/* {contacts.map((item)=>{
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
                                })} */}
                            </div>
                        </div>
                        
                        <div className="pb-2 z-0">
                            <div className="w-full h-full bg-white rounded-lg shadow-lg shadow-black/20 grid grid-rows-[auto_max-content]">
                                <div className="overflow-y-scroll p-4 flex flex-col gap-2">
                                    {insertDateSeparators(mergeMessagesSameMinute(messages)).map((item, id) => {
                                        if (item["author_uid"] == user["uid"]) return (
                                            <RightMessage
                                                date={new Date(item["timestamp"])}
                                                key={id}
                                            >
                                                {item.text}
                                            </RightMessage>
                                        )

                                        if (item["dateSeparator"]) return (
                                            <DateLine
                                                date={new Date(item["timestamp"])}
                                                key={id}
                                            />
                                        )

                                        return (
                                            <LeftMessage
                                                date={new Date()}
                                                imgUrl={"https://avatars.githubusercontent.com/u/59060532?v=4"}
                                                key={id}
                                            >
                                                {item.text}
                                            </LeftMessage>
                                        )
                                    })}


                                </div>
                                <div className="h-max flex flex-row p-2 gap-2 z-0">
                                    <div className="relative w-full bg-slate-200 rounded-full h-10 flex flex-row items-center justify-between gap-2 group overflow-hidden">
                                        
                                        <div className="w-full h-full rounded-full -z-10 left-0 absolute blur-sm group-focus-within:bg-blue-500 duration-300">
                                        </div>

                                        <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-300 rounded-full cursor-pointer">
                                            <GoSmiley/>
                                        </button>

                                        <input
                                            className="w-full h-full z-30 outline-none"
                                            value={messageInput}
                                            onInput={(e)=>setInput(e.target.value)}
                                        />

                                        <button
                                            className="w-10 h-10 flex items-center justify-center hover:bg-slate-300 rounded-full cursor-pointer">
                                            <AiOutlinePaperClip/>
                                        </button>
                                    </div>
                                    
                                    <button
                                        onClick={enviarMensagem}
                                        className="relative w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center rounded-full group z-20 cursor-pointer"
                                    >
                                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400 to-green-600 opacity-75 rounded-full group-hover:opacity-100 group-hover:blur-md duration-500 ease-out z-0">
                                        </span>
                                        <HiPaperAirplane className="rotate-45"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        </div>

    )
}