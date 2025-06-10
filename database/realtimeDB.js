import initializeFirebase from "./firebase";
import {child, endAt, equalTo, get, getDatabase, limitToFirst, orderByChild, orderByValue, orderByKey, query, ref, set, startAt, push, update } from "firebase/database";
import {and, where} from "firebase/firestore"
const app = initializeFirebase().app

const db = getDatabase(app)

function writeUserData(userId, name, email, imageUrl){
    set(ref(db, "users/" + userId), {
        username: name,
        email: email,
        profilePicture: imageUrl,
        chats: []
    })
}

function getUserData({email, uid}){
    if(!(email || uid)) return false
    
    const userRef = ref(db, `users`)

    if(email && !uid){
        return get(query(userRef, orderByChild(`email`), equalTo(email), limitToFirst(10)))
    }

    if(uid && !email){
        return get(query(userRef, orderByKey(), equalTo(uid)))
    }

    
}

function getUsersData({usersUidArray, callBack, errorFunction}){
    const usersRef = ref(db, "users")

    let usersList = Array(usersUidArray).map(id=>{
        return get(query(usersRef, orderByKey(), equalTo(usersUidArray(id))))
    })
}

async function createChat(firstUid, newContactUid){
    //verificar se já não existe uma conversa cadastrada
    const snapshot1 = await get(query(ref(db, `chats`), orderByChild("members"), equalTo(firstUid)))
    
    if(!snapshot1.exists) return false
    
    console.log(snapshot1.val())

    if(snapshot1.val() != null) {
        console.log("Contato já adicionado")
        return
    }


    //adicionar a nova conversa em /chats e em /users em cada contato
    let chatsRef = ref(db, "chats")

    let newChat = {}
    newChat.members = {}
    newChat.members[firstUid] = true
    newChat.members[newContactUid] = true

    let snapshot2 = await push(chatsRef, newChat)

    if(!snapshot2.key) return

    let chatKey = snapshot2.key

    //salvar a conversa em "/users/<firstUid>/chats"

    let firstUserChatsRef = ref(db, `users/${firstUid}/chats/${chatKey}`)
    let snapshot3 = await set(firstUserChatsRef, true)
    
    //salvar a conversa em "/users/<secondUid>/chats"
    let secondUserChatsRef = ref(db, `users/${newContactUid}/chats/${chatKey}`)
    let snapshot4 = await set(secondUserChatsRef, true)
}

function getChat(chatId){
    if(!chatId) return
    const db = getDatabase(app)

    return get(query(ref(db, `chats/${chatId}`)))
}

function getMessages(chatId){
    const messagesListRef = ref(db, `messages/${chatId}`)

    return get(query(messagesListRef))
}

async function sendMessageData(chatId, text, author, timestamp){
    if(!chatId || !text || !author || !timestamp ) return
    const chatRef = ref(db, `messages/${chatId}/list`)
    const lastMessageRef = ref(db, `messages/${chatId}/lastMessage`)

    const newMessage = {
        author,
        text,
        timestamp
    }
    
    push(chatRef, newMessage)

    update(ref(db, `messages/${chatId}/lastMessage`), newMessage)
}

export {
    writeUserData,
    getUserData,
    getUsersData,
    createChat,
    getChat,
    getMessages,
    sendMessageData
}