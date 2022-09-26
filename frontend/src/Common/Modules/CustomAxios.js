import axios from "axios";

export const customAxios = axios.create({
    baseURL: "http://54.180.10.223:8080",
})

customAxios.interceptors.request.use(
    function (config)
    {
        config.headers.ContentType = "application/json; charset=utf-8";
        config.headers.authorization = localStorage.getItem("jwt");
        return config;
    }
)

customAxios.interceptors.response.use(
    function (response)
    {
        if(response.headers['authorization'] !== undefined)
        {
            localStorage.setItem("jwt", response.headers['authorization']);
            if(response.headers['refresh'] !== undefined)
            {
                localStorage.setItem("refresh", response.headers['refresh']);
            }
        }
        return response;
    },
    function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            axios.post(`http://54.180.10.223:8080/logout`, null, {
                headers:
                    {
                        "Content-Type": "application/json; charset=utf-8",
                        "authorization": localStorage.getItem("jwt")}
            }).then();
            localStorage.clear();
        }
        return Promise.reject(error);
    }
);
