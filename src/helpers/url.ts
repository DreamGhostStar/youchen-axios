import { AxiosRequestConfig } from "../types/index";
import { isArray, isDate, isObject } from "./utils";

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

export const buildUrl = (config: AxiosRequestConfig) => {
    let { url, params } = config;
    // 去掉hash值
    const deleteIndex = url.indexOf('#');
    if (deleteIndex !== -1) {
        url = url.slice(0, deleteIndex);
    }

    // 判空处理
    if (!params) {
        return url;
    }
    // 遍历params中的每一项key时处理后的结果值数组
    const parts = [];
    for (let key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            let value = params[key];
            let values: any[];

            // 将params中的value值全部对应换成数组进行遍历
            if (isArray(value)) {
                key += '[]';
                values = value;
            } else {
                values = [value];
            }

            for (let val of values) {
                // 进行val类型的判断
                if (val === null || val === undefined) {
                    continue;
                } else if (isObject(val)) {
                    // TODO: 可能有误
                    val = JSON.stringify(val);
                } else if (isDate(val)) {
                    val =  val.toISOString();
                }

                // 向结果值数组中添加处理后的 数据
                parts.push(`${encode(key)}=${encode(val)}`);
            }
        }
    }

    if (parts.length) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&')
    }

    return url;
}