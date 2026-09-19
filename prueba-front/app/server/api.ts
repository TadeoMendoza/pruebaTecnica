const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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

  console.log("🚀 ~ apiClient ~ data:", data)
  if (data) {
    config.body = JSON.stringify(data);
  }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    console.log("🚀 ~ apiClient ~ config:", config)

    if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("❌ Detalle del error 400 devuelto por la API:", errorData);
    throw new Error(errorData?.message || `Error HTTP: ${response.status}`);
    }

  return response.json();
}