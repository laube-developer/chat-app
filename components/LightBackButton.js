import Link from "next/link";

export default function LightButton({children, href, linear_shadow_hover, simple_shadow_hover, border_linear, border_simple, bg_simple, bg_linear, className}){
    return (
        <Link
            href={href}
            className={`min-h-12 relative p-[2px] rounded-full ${!border_simple || bg_simple ? "bg-blue-500" : ""} ${border_linear || bg_linear ? "bg-linear-30 from-blue-500 to-purple-600" : ""} cursor-pointer ease-in-out group ${className}`}
        >
            {simple_shadow_hover && <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-75 rounded-full z-[-1] group-hover:opacity-100 group-hover:blur-md duration-500 ease-out">
            </div>}

            {linear_shadow_hover && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 rounded-full z-[-1] group-hover:opacity-100 group-hover:blur-md duration-500 ease-out">
            </div>}

            <div className={`${border_linear || border_simple ? "bg-white" : ""} rounded-full h-full flex`}>
                <span className={`gap-2 rounded-full flex items-center justify-between bg-clip-text ${border_linear || border_simple ? "text-transparent" : "text-white"}  w-full h-full px-8 py-2 font-bold ${border_simple ? "bg-blue-500" : "bg-white"} ${border_linear ? "bg-linear-30 from-blue-500 to-purple-600" : ""} `}>
                    {children}
                </span>
            </div>
        </Link>
    )
}