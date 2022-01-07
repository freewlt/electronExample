import {get, post} from "@/renderer/utils/http";

export function login(data) {
    return post("/api-aus/oauth/user/token", data, {
        contentLoading: false,
        globalLoading: true,
        headers: {
            "Authorization": "Basic YWRtaW5fcGM6YWRtaW5fcGM="
        }
    });
}
export function loginOut(config = {globalLoading: true, selfHandleErr: true}) {
    return get("/api-aus/oauth/remove/token", {}, config);
}

export function getSlide(config = {
    globalLoading: true,
    headers: {
        "Authorization": ""
    }
}) {
    return get("/api-aus/captcha/get/slide", {}, config);
}

export function reqCheck(data, config = {
    selfHandleErr: true,
    headers: {
        "Authorization": ""
    }
}) {
    return post("/api-aus/captcha/check/slide", data, config);
}
