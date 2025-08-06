import Head from "next/head";
import Header from '../components/Header';

//components
import { GoogleButton, EmailButton, LogoutGoogleButton } from "../components/buttons";
import { useEffect, useState } from "react";
import InputText from "../components/InputText";

//Firebase
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import initializeFirebase from "../database/firebase";
import Cookies from "js-cookie";
const provider = new GoogleAuthProvider()
const app = initializeFirebase().app
const auth = getAuth(app)

//Next.js
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Signin() {
    const [count, setCount] = useState(0)
    const [alturaRelativa, setAltura] = useState(0)

    const [email, setEmail] = useState("rafaellaube13@gmail.com")
    const [password, setPassword] = useState("123456")

    const rotas = useRouter()

    useEffect(() => {
        const authUser = JSON.parse(Cookies.get("user") || "{}")

        if (authUser?.uid) rotas.push("/chat")

    }, [rotas])

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 1)
            setAltura(Math.sin(2 * Math.PI / 60 * count) * 5)
        }, 2000 / 60)

        return () => { clearInterval(interval) }
    }, [count, alturaRelativa])

    async function signInEmail() {
        if (!app) return

        signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {

                Cookies.set("user", JSON.stringify(user))

                rotas.push("/chat")
            })
            .catch((err) => {
                alert(`Falha ao entrar! Tente novamente.\n\n${err.message}`)
                console.warn(err)
            })

    }

    async function signInGoogle() {
        if (!app) return

        signInWithPopup(auth, provider)
            .then(async ({ user }) => {
                sessionStorage.setItem("user", JSON.stringify(user))
                Cookies.set("user", JSON.stringify(user))

                rotas.push("/chat")

            })
            .catch((err) => {
                console.warn(err)
            })
    }

    return <>
            <div className="">
                <Head>
                    <link rel="icon" href="/favicon.svg" />
                    <title>Entrar</title>
                </Head>

                <div className="">
                    <Header title={"Chat app"} />
                    <div className="">
                        <div className="">
                            <h1><Image width={20} height={20} src="/favicon.svg" alt="Chat app - by Rafael Laube" />
                                Entrar no <span className="">Chat App</span>
                            </h1>
                            <InputText fieldName={"Email"} setState={setEmail} value={email} />
                            <InputText fieldName={"Senha"} password setState={setPassword} value={password} />
                            <div className="">
                                <button className="" onClick={signInEmail}>Entrar</button>
                            </div>
                            <GoogleButton handleClick={signInGoogle} />
                            <div style={{ textAlign: "center", fontSize: "1.2rem" }}>
                                <h5><span className=""><Link href="/resetPassword">Esqueci a senha</Link></span></h5>
                                <h5><span className=""><Link href="/cadastrar">Realizar cadastro</Link></span></h5>
                            </div>
                            <p>
                                Este é um site de conversas, crie sua conta no <span className="">
                                Chat App</span> e comece a compartilhar suas ideias instantaneamente.
                            </p>
                        </div>
                        <div className="">
                            <div className="" style={{ top: alturaRelativa + "px" }} onClick={() => { setAltura(0) }}>
                                <h1>
                                    Compartilhe suas <span className="">ideias</span>
                                    instantaneamente com o <span className="">Chat App</span>
                                </h1>
                            </div>
                            <div className="">
                                <Image width={500} height={500} src="/img/mockup_chat.png" alt="mockup_chat"
                                    className="" />
                                <Image width={500} height={500} src="/img/mockup_celular.png" alt="mockup_celular"
                                    className="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


}