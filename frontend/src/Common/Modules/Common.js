

export function Logout(token, setToken, setRefresh, navigate)
{
    //localStorage.clear();
    setToken(null);
    setRefresh(null);
    navigate("/login");
}
export function Logout_(token, setToken, setRefresh, navigate, axios)
{
    localStorage.clear();
    setToken(null);
    setRefresh(null);
    axios.post(`http://localhost:8080/logout`, {headers: {"authorization": token}});
    navigate("/login");
}

export function Login(setToken, setRefresh, response)
{
    console.log(response.headers['authorization'])
    if(response.headers['authorization'] !== undefined)
    {
        localStorage.setItem("jwt", response.headers['authorization']);
        setToken(localStorage.getItem("jwt"));
        if(response.headers['refresh'] !== undefined)
        {
            localStorage.setItem("refresh", response.headers['refresh']);
            setRefresh(localStorage.getItem("refresh"));
        }
    }
}

export function Axios_get(axios, url, config, success, fail, final)//config - {headers: {"Content-Type": "application/json; charset=utf-8","authorization": token}}
{
    /*axios.get(url, config).then((res)=>{
        if(res.headers['authentication'] !== undefined)
        {
            localStorage.setItem("jwt", res.headers['authentication']);
            setToken(localStorage.getItem("jwt"));
            if(res.headers['refresh'] !== undefined)
            {
                localStorage.setItem("refresh", res.headers['refresh']);
                setRefresh(localStorage.getItem("refresh"));
            }
        }
        success(res)
    })
        .catch((error)=> {
        if (error.response.status === 401 || error.response.status === 403)
        {
            localStorage.clear();
            setToken(null);
            setRefresh(null);
            axios.post(`http://${ip}/logout`, {headers: {"authorization": token}});
            //navigate
        }
        else
        {
            fail(error)
        }

    }).finally(final);*/
}

export function Axios_post(axios,url,data,config,success,fail,final)
{
    axios.post(url).then((res)=>{

    }).catch((error)=>{

    }).finally(final);
}

export function Axios_delete(axios,url,data,config,success,fail,final)
{
    axios.delete(url).then((res)=>{

    }).catch((error)=>{

    }).finally(final);
}

export function Axios_put(axios,url,data,config,success,fail,final)
{
    axios.put(url).then((res)=>{

    }).catch((error)=>{

    }).finally(final);
}

export function Axios_patch(axios,url,data,config,success,fail,final)
{
    axios.patch(url).then((res)=>{

    }).catch((error)=>{

    }).finally(final);
}
