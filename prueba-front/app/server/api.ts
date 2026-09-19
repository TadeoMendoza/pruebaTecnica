const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  data?: unknown;
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { data, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...customConfig,
  };

  // console.log("🚀 ~ apiClient ~ data:", data)
  if (data) {
    config.body = JSON.stringify(data);
  }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    // console.log("🚀 ~ apiClient ~ config:", config)

    if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error = new Error(errorData.message || 'Error en la petición');
    (error as any).status = response.status; 
    (error as any).response = { data: errorData, status: response.status };
    throw error;
    }

  return response.json();
}