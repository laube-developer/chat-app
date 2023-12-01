import initializeFirebase from "./firebase";
import { getDatabase, ref, set } from "firebase/database";

const app = initializeFirebase().app

function writeUserData(userId, name, email, imageUrl){
    const db = getDatabase(app)
    set(ref(db, "users/" + userId), {
        username: name,
        email: email,
        profilePicture: imageUrl
    })
}

export {
    writeUserData
}