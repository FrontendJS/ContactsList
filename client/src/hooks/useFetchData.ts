import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { HttpParams, FetchDataParams, UseMutationParams } from '../types/http';

const fetchRequest = async <T>({
  endpoint,
  method = 'GET',
  params = {},
  baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
}: FetchDataParams): Promise<T> => {
  let url = new URL(endpoint, baseURL);

  if (method === 'GET' && params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    if (searchParams.toString()) {
      url.search = searchParams.toString();
    }
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    ...(method !== 'GET' && method !== 'DELETE' && { body: JSON.stringify(params) }),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText} - ${errorData.message}`
    );
  }
  return response.json();
};

export const useGetData = <T>(
  endpoint: string,
  params: HttpParams = {},
  baseURL?: string,
  refetchInterval?: number
) =>
  useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: () => {
      return fetchRequest<T>({ endpoint, method: 'GET', params, baseURL });
    },
    refetchInterval,
  });

export const useMutateData = <T>(): UseMutationResult<T, Error, UseMutationParams> => {
  return useMutation<T, Error, UseMutationParams>({
    mutationFn: ({ endpoint, method, params, baseURL }: UseMutationParams) =>
      fetchRequest<T>({ endpoint, method, params, baseURL }),
  });
};
