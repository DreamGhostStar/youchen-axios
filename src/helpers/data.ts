import { isObject } from "./utils";

export const transformRequestData = (data: any) => {
    if (isObject(data)) {
        return JSON.stringify(data)
    }

    return data;
}

export const transformResponseData = (data: any) => {
    if (typeof data !== 'object') {
        try {
            data = JSON.parse(data)
        } catch (error) {
            
        }
    }

    return data;
}