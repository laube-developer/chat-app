import styles from "../styles/Contact.module.css"

import Image from "next/image"

export default function Contact({name, description, hour, imgUrl, handleClick, notHover}){
    return (<div className="w-full flex flex-row p-2 gap-2 px-4 hover:bg-slate-200 cursor-pointer" onClick={handleClick}>
        <Image src={imgUrl} alt="user image" width={40} height={40} className="h-12 w-12 rounded-full"/>
        <div className="w-full flex flex-row justify-between items-center">
            <div>
                <h3 className="text-lg">{name}</h3>
                <h5 className="text-xs">{description}</h5>
            </div>
                <p className="text-xs font-bold">{hour}</p>
        </div>

    </div>) 
}