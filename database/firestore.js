import { getFirestore, collection, getDocs, query } from "firebase/firestore"
import initializeFirebase from "./firebase"

const initializeFirestore = ()=>{
    const app = initializeFirebase().app

    //Firestore Database
    const firestoreDb = getFirestore(app)

    return {
        firestoreDb
    }
}

const saveUser = async ({user})=>{
    console.log(await getUser({uid: user.uid}))
}

const getUser = async ({uid})=>{
    const db = initializeFirestore().firestoreDb

    const querySnapshot = await getDocs(collection(db, "users"))

    let user = {}

    querySnapshot.forEach((doc)=>{
        let data = doc.data()

        if(data.uid == uid){
            user = data
        }
    })

    return user
}

const getContacts = async ({user})=>{
    
    if(!user) return false

    let db = initializeFirestore().firestoreDb

    const userEmail = user.email

    const querySnapshot = await getDocs(collection(db, "contatos"))

    let dados = []

    querySnapshot.forEach(async (doc)=>{
        let id = doc.id
        let data = doc.data()

        let contact = {}

        if(data.author == userEmail){
            let contactPhotoURL = await getUser({uid: data.uid})

            dados = data.contactsList.map(async (contact)=>{
                return {...contact, photoURL: contactPhotoURL}
            })
        }
    })

    return dados
}

export {
    getContacts,
    getUser,
    saveUser
}