export function logout_(token, setToken, setRefresh, navigate, axios)
{
    localStorage.clear();
    setToken(null);
    setRefresh(null);
    axios.post("http://localhost:8080/logout", {headers: {"authorization": token}});
    navigate("/login");
}

export function logout(token, setToken, setRefresh, navigate)
{
    localStorage.clear();
    setToken(null);
    setRefresh(null);
    //navigate("/login");
}

export function login(setToken,setRefresh,response)
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
