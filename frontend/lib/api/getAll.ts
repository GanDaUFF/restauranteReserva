export async function getAll<R = any>(rota: string): Promise<R> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030"
    const token = localStorage.getItem("token")
  
    const response = await fetch(`${baseUrl}/${rota}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data?.error || "Erro ao buscar dados")
    }
  
    return data
  }
  