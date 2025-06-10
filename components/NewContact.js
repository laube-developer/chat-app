import styles from "../styles/NewContact.module.css"

import { useEffect, useState } from "react";

import { FaPlusCircle  } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoSearch  } from "react-icons/io5";
import { IoMdArrowBack  } from "react-icons/io" 
import Contact from "./Contact";
import { createChat, getUserData } from "../database/realtimeDB";

import Cookies from "js-cookie";
import PageOver from "./pageOver";

function NewContactButton(){
    const [input, setInput] = useState("")
    const [user, setUser] = useState({})
    const [searchedContact, setContact] = useState()
    const [isViewContactPannel, setViewContactPannel] = useState(false)

    useEffect(()=>{
        setUser(JSON.parse(Cookies.get("user") || "{}"))
    }, [])

    async function pesquisarUsuario(){
        if(input == user.email) {
            alert("Digite um email diferente do seu.")
            return
        }
        
        const snapshot = await getUserData({email: input})

        if(!snapshot.exists) return

        let searchedContactUid = Object.entries(snapshot.val())[0][0]
        let searchedContact = Object.entries(snapshot.val())[0][1]
        searchedContact.uid = searchedContactUid

        setContact(searchedContact)
        showHideContactPainel()
    }

    function showHideContactPainel() {
        setViewContactPannel(!isViewContactPannel)
    }

    function salvarAdicionarContato(){
        showHideContactPainel()
        createChat(user.uid, searchedContact.uid)
    }

    return <div className={styles.fullbox}>
        <div className={styles.title}>
            <h2 style={{textIndent: "1rem"}}>Adicionar contato</h2>
            <p>Pesquise pelo email ou pelo nome </p>
        </div>
        {searchedContact?.uid && <div className={styles.container}>
            <Contact
                description={searchedContact.email}
                imgUrl={searchedContact.profilePicture}
                handleClick={showHideContactPainel}
            />
        </div>}
        {isViewContactPannel && 
            <PageOver handleClose={showHideContactPainel}>
                <h3>Deseja adicionar esse contato?</h3>
                <Contact hover={false} name={searchedContact.email} imgUrl={searchedContact.profilePicture}/>
                <button onClick={salvarAdicionarContato}><IoIosAdd />  Adicionar</button>
            </PageOver>}
    </div>
}


export {
    NewContactButton
}