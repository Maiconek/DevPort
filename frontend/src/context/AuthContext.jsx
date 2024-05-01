import { createContext, useState, useEffect } from "react";
import {jwtDecode}  from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(null)
    let [authToken, setAuthToken] = useState(null)
    
    let loginUser = async (e) => {
        e.preventDefault()
        console.log('Form submitted')
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value}) 
        })
        let data = await response.json()
        console.log('data: ', data)
        console.log('response', response)
        if(response.status === 200) {
            setAuthToken(data)
            setUser(jwtDecode(data.access))
        } else {
            alert('Something went wrong')
        }
    }

    let contextData = {
        user:user,
        loginUser: loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext