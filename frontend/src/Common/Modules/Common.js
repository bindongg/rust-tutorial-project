export function logout(token, setToken, navigate)
{
    localStorage.clear();
    setToken(null);
    navigate("/login");
}
