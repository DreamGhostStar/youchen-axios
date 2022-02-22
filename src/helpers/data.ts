import { isObject } from "./utils";

export const transformRequestData = (data: any) => {
    if (isObject(data)) {
        return JSON.stringify(data)
    }

    return data;
}

export const transformResponseData = (data: any) => {
    if (typeof data !== 'object') {
        data = JSON.parse(data)
    }

    return data;
}