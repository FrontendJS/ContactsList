export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type HttpParams = Record<string, unknown>;

export type FetchDataParams = {
  endpoint: string;
  method?: HttpMethod;
  params?: HttpParams | FormData;
  baseURL?: string;
};

export type FetchMutateParams = Omit<FetchDataParams, 'method' | 'params'> & {
  method: HttpMethod;
  params: HttpParams;
};

export type UseMutationParams = {
  endpoint: string;
  method: HttpMethod;
  params?: HttpParams;
  baseURL?: string;
};

export type UseUploadParams = {
  endpoint: string;
  file: File;
  baseURL?: string;
};
