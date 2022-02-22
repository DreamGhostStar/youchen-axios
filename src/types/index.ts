export type Method = 'get' | 'GET'
    | 'post' | 'POST'
    | 'head' | 'HEAD'
    | 'delete' | 'DELETE'
    | 'put' | 'PUT'
    | 'options' | 'OPTIONS'
    | 'patch' | 'PATCH';

export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
}