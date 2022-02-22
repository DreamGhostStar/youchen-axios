import { transformRequestData } from "./helpers/data";
import { processHeaders } from "./helpers/headers";
import { buildUrl } from "./helpers/url";
import { AxiosRequestConfig } from "./types/index";
import xhr from "./xhr";

function axios(config: AxiosRequestConfig) {
    // 前置处理
    config.url = buildUrl(config)
    // 需先处理headers，处理headers中的逻辑有对data的判断
    config.headers = processHeaders(config.headers || {}, config.data);
    config.data = transformRequestData(config.data)

    // 发送请求
    xhr(config)
}

export default axios