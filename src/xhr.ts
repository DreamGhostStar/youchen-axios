import { transformResponseData } from "./helpers/data";
import { createError } from "./helpers/error";
import { parseHeaders } from "./helpers/headers";
import { AxiosRequestConfig, AxiosResponseConfig } from "./types/index";

export default function xhr(config: AxiosRequestConfig): Promise<AxiosResponseConfig> {
    return new Promise((resolve, reject) => {
        const { url, method = 'get', data, headers, responseType, timeout } = config;

        // 发送xhr请求
        const request = new XMLHttpRequest();
        request.open(method.toUpperCase(), url, true)

        // 设置返回的responseType
        if (responseType) {
            request.responseType = responseType;
        }

        // 设置超时时间
        if (timeout) {
            request.timeout = timeout
        }

        // 进行headers设置
        for (const headerKey in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, headerKey)) {
                request.setRequestHeader(headerKey, headers[headerKey]);
            }
        }

        // 发送数据
        request.send(data)

        // 设置监听函数
        // 超时处理
        request.ontimeout = () => {
            reject(createError(
                `Timeout of ${config.timeout} ms exceeded`,
                config,
                'ECONNABORTED',
                request
            ))
        }

        // 错误处理
        request.onerror = () => {
            reject(createError('Network Error', config, null, request))
        }

        // 获取返回的数据
        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return
            }

            if (!request.status) {
                return;
            }
            const responseHeadersString = request.getAllResponseHeaders();
            const responseHeaders = parseHeaders(responseHeadersString)
            // 只有text下取responseText，其余皆取response
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            const response: AxiosResponseConfig = {
                config,
                headers: responseHeaders,
                status: request.status,
                statusText: request.statusText,
                data: transformResponseData(responseData),
                request
            };
            handleResponse(response);
        }

        // 统一处理response
        const handleResponse = (response: AxiosResponseConfig) => {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            } else {
                reject(createError(
                    `Request failed with status code ${response.status}`,
                    config,
                    null,
                    request,
                    response
                ));
            }
        }
    })
}