export async function postData<T = any, R = any>(rota: string, body: T): Promise<R> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030"
    const token = localStorage.getItem("token")
  
    const response = await fetch(`${baseUrl}/${rota}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data?.error || "Erro ao enviar dados")
    }
  
    return data
  }
  