import { useLocation,Navigate } from "react-router-dom"

export const setToken = (token)=>{

    localStorage.setItem('edToken', token)
}

export const setUser = (username) =>{
    localStorage.setItem('user',username)
}

export const fetchUser = () => {
    return localStorage.getItem('user')
}

export const fetchToken = (token)=>{

    return localStorage.getItem('edToken')
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return <Navigate to='/' state ={{from : location}}/>;
    }

    return children;
}
