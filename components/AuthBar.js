import styles from "../styles/AuthBar.module.css"

export default function AuthBar({context}){
    return (<div className={styles.main}>
        {context.uid == 0?<LoginButton />:<LogoutButton />}
        {context.uid != 0?<UserIcon img_src={context.authUser.photoURL}/>:<></>}
    </div>)
}

function LoginButton(){
    return (<button className={styles.fill_btn}>
        login
    </button>)
}

function LogoutButton(){
    return (<button className={styles.outline_btn}>
        logout
    </button>)
}

function UserIcon({img_src}){
    return(<div className={styles.user_img}>
        <img src={img_src}></img>
    </div>)
}