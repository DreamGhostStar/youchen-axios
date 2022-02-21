import { buildUrl } from "./helpers/url";
import { AxiosRequestConfig } from "./types/index";
import xhr from "./xhr";

function axios(config: AxiosRequestConfig) {
    // 前置处理
    config.url = buildUrl(config)

    xhr(config)
}

export default axios