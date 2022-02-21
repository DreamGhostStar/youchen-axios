export const isArray = (data: any)=> {
    return Array.isArray(data);
}

export const isObject = (data: any): data is Object => {
    return Object.prototype.toString.call(data) === '[object Object]';
}

export const isDate = (data: any): data is Date => {
    return Object.prototype.toString.call(data) === '[object Date]'
}