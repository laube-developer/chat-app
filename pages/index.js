import Head from "next/head";
import Header from "../components/Header";

//fonts
import { Inter } from "next/font/google"
import Image from "next/image";
import Link from "next/link";
import LightButton from "../components/LightBackButton";
import { useEffect, useState } from "react";

import { IoSendSharp } from "react-icons/io5";
import { FaRegSmileWink } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";

const inter200 = Inter({
    subsets: ["latin"],
    weight: ["200", "600"]
})

export default function Index(){
    const [message, setMessage] = useState("")
    const [count, setCount] = useState(0)

    useEffect(() => {
        const initial = "Seu novo mensageiro está aqui"
        
        const timeout1 = setTimeout(() => {
            let newMessage = initial.slice(0, count)
            setMessage(newMessage)
            setCount(count + 1)
        }, 50)

        if (count == initial.length +2){
            clearTimeout(timeout1)
            setTimeout(()=>{
                setCount(0)
            }, 4000)
        }
    }, [message, count])

    return <div className="flex flex-col">
        <Image
            src="/favicon.svg"
            width={1920}
            height={1920}
            alt="Background"
            className="absolute w-full -z-2 -translate-x-[25vw] -translate-y-[110vh] blur-md opacity-75"
        />

        <Head>
            <link rel="icon" href="/favicon.svg" />
            <title>Chat app | Descubra</title>
        </Head>
        
        <Header title="Chat App"/>

        <section className="flex flex-row max-w-[1100px] mx-auto gap-4 items-center">
            <Image width={640} height={556} src="/img/index1.png" alt={"Chat app mockup"}/>
            <div className={inter200.className + " flex flex-col gap-8 relative"}>
                <h1 className="text-6xl font-bold text-transparent">Seu novo mensageiro está aqui</h1>
                <h1 className="absolute text-6xl font-bold text-blue-600">{message}</h1>
                <ul className="text-xl">
                    <li>Conversas em tempo real</li>
                    <li>Acesse onde e quando quiser</li>
                    <li>Conversas ilimitadas para qualquer lugar do planeta</li>
                </ul>

                <div className="flex gap-2 w-full">
                    <LightButton
                        href="/signin"
                        bg_linear
                        linear_shadow_hover
                        className="gap-2"
                    >
                        <FaRegSmileWink />
                        Quero criar a minha conta
                        <FiPaperclip />
                    </LightButton>

                    <Link href="/signin" className="relative w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 group cursor-pointer flex items-center justify-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400 to-green-600 opacity-75 rounded-full z-[-1] group-hover:opacity-100 group-hover:blur-md duration-500 ease-out">
                        </div>

                        <IoSendSharp className="-rotate-z-45 text-white -translate-y-0.5 translate-x-0.5"/>
                    </Link>
                </div>
            </div>
        </section>

        <section className="flex flex-row max-w-[1100px] mx-auto gap-4 items-center">
            <div className={inter200.className + " flex flex-col gap-4"}>
                <h1 className="text-6xl font-bold text-blue-600">Conversas em tempo real</h1>
                <ul className="text-xl">
                    <li>Compartilhe suas ideias com seus amigos ou familiares em tempo real para qualquer lugar do globo</li>
                </ul>

            </div>
            <Image width={350} height={540} sizes="10rem 10rem" src="/img/globe.png" alt={"Chat app mockup"}/>
        </section>

        <section className="max-w-[1100px] mx-auto mt-10">
            <h1 className={inter200.className + " text-6xl font-bold text-blue-600"}>Sobre o projeto</h1>
            
            <div className="flex flex-col pt-10  gap-4">
                <div className="grid grid-cols-3 gap-4">
                    
                    <div className="flex flex-col bg-slate-200 rounded-t-xl items-start gap-4 min-h-[600px] overflow-hidden">
                        <div className="relative flex w-full">
                            <Image width={200} height={200} src="/img/project.jpg" alt="project" className="w-full"/>
                        </div>
                            
                        <h3 className="text-3xl mx-4 text-blue-500 font-semibold z-10">Projeto</h3>

                        <div className="text-xl text-justify mx-4">
                            <p>Este é um projeto desenvolvido com  Next.js e Firebase e tem por objetivo aplicar conhecimentos de desenvolvimento de software, bem como registrar portifólio pessoal.</p>
                        </div>
                    </div>

                    <div className="flex flex-col bg-slate-200 rounded-t-xl items-start gap-4 min-h-[500px] overflow-hidden">
                        <div className="relative flex w-full">
                            <Image width={200} height={200} src="/img/repository.jpg" alt="project" className="w-full"/>
                        </div>
                            
                        <h3 className="text-3xl mx-4 text-blue-500 font-semibold z-10">Repositório</h3>

                        <div className="text-xl text-justify mx-4">
                            <p>O repositório pode ser encontrado no link a seguir. <br/>O código pode ser estudado, para quem  busca conhecer um pouco mais sobre os frameworks utilizados.</p>
                        </div>

                        <div className="flex flex-row w-full gap-2 justify-center">
                            <LightButton
                                href="https://github.com/laube-developer"
                                bg_linear
                                linear_shadow_hover
                                className="text-sm"
                            >github.com/laube-developer</LightButton>

                        </div>
                    </div>

                    <div className="flex flex-col bg-slate-200 rounded-t-xl items-start gap-4 min-h-[500px] overflow-hidden">
                        <div className="relative flex w-full">
                            <Image width={200} height={200} src="/img/autor.jpeg" alt="Rafael Laube" className="w-full"/>
                        </div>
                            
                        <h3 className="text-3xl mx-4 text-blue-500 font-semibold z-10">Autor</h3>

                        <div className="text-xl text-justify mx-4">
                            <p>Estudante de Engenharia de Software na Universidade de Brasília</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </div>
}