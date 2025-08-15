
import LightButton from "./LightBackButton"
import Image from "next/image"

export default function AuthBar({lightBg, preventAutoRedirect, setLoading}){
    //const user = {uid: "sdfsdf", img_url: "https://avatars.githubusercontent.com/u/59060532?v=4"}
    const user = {}

    return (
        <menu className="flex gap-2 w-max">
            {user?.uid && (<>
                <Image 
                    width={20}
                    height={20}
                    src={user.img_url}
                    alt="Rafael Laube"
                    className="w-12 h-12  h-content rounded-full border-2 border-blue-500"
                />

                <LightButton
                    href="/chat"
                    base={true}
                    bg_linear
                    simple_shadow_hover
                >
                    Minhas mensagens
                </LightButton>

                <LightButton
                    href="/api/signout"
                    base={true}
                    border_simple
                    simple_shadow_hover
                >
                    Sair
                </LightButton>
            </>)}

            {!(user?.uid) && (<>
                <LightButton
                    href="/signin"
                    base={true}
                    border_simple
                    simple_shadow_hover
                >
                    Entrar
                </LightButton>
            </>)}
        </menu>
    )
}