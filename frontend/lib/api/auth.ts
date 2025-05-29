// lib/api/auth.ts
export async function login(email: string, senha: string) {

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    })
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao fazer login')
    }
  
    return data // normalmente contém token, usuário, etc.
  }
  