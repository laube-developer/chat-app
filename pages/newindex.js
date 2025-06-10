import Image from "next/image";

export default function index(){
    return (
        <div>
            <header className="flex flex-row max-w-[1000px] mx-auto py-2">
                <div className="flex flex-row gap-4">
                    <Image src="/favicon.svg" alt="Rafael Laube - Chat App" width={30} height={30}/>
                    <h1 className="text-blue-500 font-bold text-xl">Chat App</h1>
                </div>
                <div className="w-max">
                    <button className="px-4 py-2">Entrar</button>
                </div>
            </header>
        </div>
    )
}