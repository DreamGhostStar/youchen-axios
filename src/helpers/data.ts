import { isObject } from "./utils";

export const transformRequestData = (data: any) => {
    if (isObject(data)) {
        return JSON.stringify(data)
    }

    return data;
}