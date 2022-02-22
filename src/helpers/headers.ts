import { isObject } from "./utils";

// 进行xhr请求前预处理headers
export const processHeaders = (headers: any, data: any) => {
    const mimeKey = 'Content-Type'
    standardHeaders(headers, mimeKey);

    // 如果传输了data，但是没有Content-Type属性，需自动为其加上Content-Type属性为
    if (isObject(data)) {
        if (!headers[mimeKey]) {
            headers[mimeKey] = 'application/json;charset=utf-8';
        }
    }

    return headers;
}

// 标准化headers的key名
export const standardHeaders = (headers: any, standardName: string) => {
    if (!headers) {
        return;
    }

    Object.keys(headers).forEach(headerKey => {
        if (headerKey.toUpperCase() === standardName.toUpperCase()) {
            headers[standardName] = headers[headerKey];
            delete headers[headerKey];
            return;
        }
    })
}

export const parseHeaders = (headerString: string): Object => {
    const res = Object.create(null)
    const headerArr = headerString.split('\r\n');
    for (const headerItem of headerArr) {
        if (!headerItem) {
            continue;
        }
        const [key, value] = headerItem.split(': ');
        res[key] = value;
    }

    return res;
}