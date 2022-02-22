export type Method = 'get' | 'GET'
    | 'post' | 'POST'
    | 'head' | 'HEAD'
    | 'delete' | 'DELETE'
    | 'put' | 'PUT'
    | 'options' | 'OPTIONS'
    | 'patch' | 'PATCH';

// axios请求参数结构
export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
}

// axios返回参数结构
export interface AxiosResponseConfig {
    config: AxiosRequestConfig;
    data: any;
    headers: any;
    status: number;
    statusText: string;
    // xhr请求时的request对象
    request: any;
}

export interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponseConfig;
    isAxiosError: boolean;
}