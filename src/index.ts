import { transformRequestData } from "./helpers/data";
import { buildUrl } from "./helpers/url";
import { AxiosRequestConfig } from "./types/index";
import xhr from "./xhr";

function axios(config: AxiosRequestConfig) {
    // 前置处理
    config.url = buildUrl(config)
    config.data = transformRequestData(config.data)

    xhr(config)
}

export default axios