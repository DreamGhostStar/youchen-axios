import { AxiosRequestConfig, AxiosResponseConfig } from "./types/index";

export default function xhr(config: AxiosRequestConfig): Promise<AxiosResponseConfig> {
    return new Promise((resolve, reject) => {
        const { url, method = 'get', data, headers, responseType } = config;

        // 发送xhr请求
        const request = new XMLHttpRequest();
        request.open(method.toUpperCase(), url, true)

        // 设置返回的responseType
        if (responseType) {
            request.responseType = responseType;
        }

        // 进行headers设置
        for (const headerKey in headers) {
            if (Object.prototype.hasOwnProperty.call(headers, headerKey)) {
                request.setRequestHeader(headerKey, headers[headerKey]);
            }
        }

        // 发送数据
        request.send(data)

        // 获取返回的数据
        request.onreadystatechange = function () {
            if (request.readyState !== 4) {
              return
            }

            // 判断readyState == 4（交互完成）status服务器返回的状态（200是ok）
            if (request.readyState == 4 && request.status == 200) {
                const responseHeaders = request.getAllResponseHeaders();
                // 只有text下取responseText，其余皆取response
                const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
                const response: AxiosResponseConfig = {
                    config,
                    // TODO: 转换成对象
                    headers: responseHeaders,
                    status: request.status,
                    statusText: request.statusText,
                    data: responseData,
                    request
                };
                resolve(response);
            } else {
                // TODO: 需错误处理，需查看是否有必要
                console.log("异步交互失败");
            }
        }
    })
}