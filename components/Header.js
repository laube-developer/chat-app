import { useRouter } from "next/router";

//components
import AuthBar from "./AuthBar";
import Image from "next/image";

export default function Header({title}){
    const rotas = useRouter()

    return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-row justify-between py-4 h-20 z-0">
        <div className="flex flex-row gap-2 items-center text-blue-500 text-xl font-bold select-none cursor-pointer" onClick={()=>{rotas.push("/")}}>
            <Image className="w-10 h-10" src="/favicon.svg" alt="Rafael Laube - Chat App" width={5} height={5}/>
            <h1>{title}</h1>
        </div>
        <AuthBar/>
    </div>
    )
}