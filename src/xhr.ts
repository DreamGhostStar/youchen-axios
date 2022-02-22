import { AxiosRequestConfig } from "./types/index";

export default function xhr(config: AxiosRequestConfig) {
    const { url, method = 'get', data, headers } = config;

    // 发送xhr请求
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true)

    // 进行headers设置
    for (const headerKey in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, headerKey)) {
            request.setRequestHeader(headerKey, headers[headerKey]);
        }
    }

    // 发送数据
    request.send(data)
}