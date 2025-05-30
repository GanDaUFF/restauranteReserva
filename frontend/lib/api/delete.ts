export async function deleteData<R = any>(rota: string): Promise<R> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030"
    const token = localStorage.getItem("token")
  
    const response = await fetch(`${baseUrl}/${rota}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data?.error || "Erro ao deletar")
    }
  
    return data
  }
  