import { cookies } from 'next/headers'

export default async function handler(req, res) {
  const store = await cookies()
  store.delete('user') // Remove apenas do lado do servidor (não do browser)

  return new Response(JSON.stringify({ message: 'Removido localmente' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}