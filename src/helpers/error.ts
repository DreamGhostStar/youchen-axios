import { AxiosRequestConfig, AxiosResponseConfig } from "../types/index";

export class AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string | null;
    request?: any;
    response?: AxiosResponseConfig;
    isAxiosError: boolean;

    constructor(
        message: string,
        config: AxiosRequestConfig,
        code?: string | null,
        request?: any,
        response?: AxiosResponseConfig
    ) {
        super(message);

        this.config = config;
        this.code = code;
        this.request = request;
        this.response = response;
        this.isAxiosError = true;
    }
}

export const createError = (
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponseConfig
) => {
    const err = new AxiosError(message, config, code, request, response);

    return err;
}