import { Session } from "@supabase/supabase-js"
import { supabase } from "../../supabase/connect"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export default function Index(){

  async function handleSignup(formData: FormData) {
    'use server'

    const email = String(formData.get("email"))
    const password = String(formData.get("password")) 

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    const session = data.session

    //Problema nessa linha
    (await cookies()).set("user", JSON.stringify(result.data.user))
    (await cookies()).set("session_token", session.access_token)

    NextResponse.redirect("/chat")
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center bg-slate-200 text-black">
      <form 
        action={handleSignup}
        className="rounded-lg px-10 py-11 bg-white w-[500px] flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold">Crie seu cadastro</h1>
        
        <label>
          <span>Email</span>
          <input
            name="email"
            required
            className="w-full p-2 border-2 border-slate-500 rounded-lg"  
          />
        </label>

        <label>
          <span>Senha</span>
          <input
            name="password"
            type="password"
            required
            className="w-full p-2 border-2 border-slate-500 rounded-lg"  
          />
        </label>

        <button
          className="w-full bg-blue-500 text-white font-bold p-2 rounded-lg hover:bg-blue-400 cursor-pointer"
        >Cadastrar</button>
      </form>
    </div>
  )
}