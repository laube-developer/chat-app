import styles from "../styles/Messages.module.css"

import Image from "next/image"

function DateLine({date}){
    const dataString = date.toLocaleDateString()

    return (<div className="self-center w-max flex justify-center bg-slate-200 rounded-sm p-1 text-xs">
        {dataString == new Date().toLocaleDateString() ? "Hoje" : dataString}
    </div>)
}

function LeftMessage({children, date, imgUrl}){
    let hora = String(date.getHours()).padStart(2, "0")
    let minuto = String(date.getMinutes()).padStart(2, "0")

    return (<div className="flex flex-row gap-2">
        <div className="flex flex-col">
            <Image width={60} height={60} alt={"user"} src={imgUrl} className="w-8 h-8 rounded-full"/>
            <p className="text-xs">{hora}:{minuto}</p>
        </div>
        <div className="min-w-[120px] bg-slate-200 p-2 rounded-tr-lg rounded-br-lg rounded-bl-lg">
            <p className="whitespace-pre-line">{children}</p>
        </div>
    </div>)
}

function RightMessage({children, date}){
    let hora = String(date.getHours()).padStart(2, "0")
    let minuto = String(date.getMinutes()).padStart(2, "0")

    return (<div className="flex flex-row gap-2 justify-end">
        <div className="flex flex-col">
            <div className="min-w-[120px] bg-blue-500 p-2 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg">
                <p className="whitespace-pre-line text-right">{children}</p>
            </div>
            <span className="text-xs self-end">{hora}:{minuto}</span>
        </div>
    </div>)
}

export {LeftMessage, RightMessage, DateLine}