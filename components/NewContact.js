import styles from "../styles/NewContact.module.css"

import { useEffect, useState } from "react";

import { FaPlusCircle  } from "react-icons/fa";
import { IoSearch  } from "react-icons/io5";
import { IoMdArrowBack  } from "react-icons/io" 
import Contact from "./Contact";
import { createChat, getUserData } from "../database/realtimeDB";

import Cookies from "js-cookie";

function NewContactButton(){
    const [searchIsView, setView] = useState(false)
    const [input, setInput] = useState("")
    const [user, setUser] = useState({})
    const [searchedContact, setContact] = useState({})

    useEffect(()=>{
        setUser(JSON.parse(Cookies.get("user") || "{}"))
    }, {})

    function pesquisarUsuario(){
        if(input == user.email) {
            alert("Digite um email diferente do seu.")
            return
        }
        
        getUserData(input, (snapshotUser)=>{
            setContact(snapshotUser)
        }, (err)=>{console.log(err)})
    }

    function salvarAdicionarContato(){
        createChat(user.uid, searchedContact.uid)
    }

    return <div className={styles.fullbox}>
        <div className={styles.title}>
            <h2 style={{textIndent: "1rem"}}>Adicionar contato</h2>
        </div>
        {searchedContact?.uid && <div className={styles.container}>
            <Contact
                description={searchedContact.email}
                img_url={searchedContact.profilePicture}
                handleClick={salvarAdicionarContato}    
            />
        </div>}
        <div className={styles.container}>
            <div className={styles.addLine}>
                <input placeholder="Email" onInput={(e)=>{setInput(e.target.value)}} value={input}/>
                <button className={styles.addButton} onClick={pesquisarUsuario}><IoSearch /></button>
            </div>
        </div>
        <div className={styles.container}>
            <p>Pesquise pelo email ou pelo nome </p>
        </div>
    </div>
}


export {
    NewContactButton
}