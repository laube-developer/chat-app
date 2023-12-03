import initializeFirebase from "./firebase";
import { child, equalTo, get, getDatabase, limitToFirst, orderByChild, query, ref, set, startAt } from "firebase/database";

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

function getUserData(email, callBack, errorFunction){
    const userRef = ref(db, `users`)

    get(query(userRef, orderByChild(`email`), equalTo(email), limitToFirst(10)))
    .then((snapshot) => {
        if(snapshot.hasChild){
            let uid = Object.keys(snapshot.toJSON())[0]

            let user = {
                ...snapshot.val()[uid], 
                uid: uid,
            }
            callBack(user)

        } else {
            errorFunction("Usuário não encontrado")
        }
    })
    .catch((err)=>{
        errorFunction(err)
    })
}

function createChat(uid1, uid2,){
    let lastIdRef = ref(db, `chats/lastId`)

    get(query(lastIdRef))
    .then((snapshot)=>{
        if(snapshot.exists){
            let lastId = snapshot.val()

            //Create chat in "chats/list/<newId>"
            const members = {}
            members[uid1] = true
            members[uid2] = true

            set(ref(db, `chats/list/${lastId + 1}`), {members: members})

            //Create chat in "users/<uid1>/chats/<newId>"
            set(ref(db, `users/${uid1}/chats/${lastId + 1}`), true)

            //Create chat in "users/<uid2>/chats/<newId>"
            set(ref(db, `users/${uid2}/chats/${lastId + 1}`), true)

            //update last id
            set(ref(db, `chats/lastId`), lastId + 1)

            return
        }

        errorFunction("Dado não encontrado")
    })
    .catch((err)=>{
        console.log(err)
    })
}

function getChats(uid, callback){
    const db = getDatabase(app)

    get(query(ref(db, `users/${uid}/chats`)))
    .then((snapshot)=>{
        if(snapshot.exists){
            let chatslist = snapshot.val()

            callback(chatslist)
        }
    })
}

export {
    writeUserData,
    getUserData,
    createChat,
    getChats
}