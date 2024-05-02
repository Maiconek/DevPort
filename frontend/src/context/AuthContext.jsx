import { createContext, useState, useEffect } from "react";
import {jwtDecode}  from "jwt-decode";
import {useNavigate} from "react-router-dom"

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    
    let [user, setUser] = useState(localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null)
    let [authToken, setAuthToken] = useState(localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    
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
            localStorage.setItem('authToken', JSON.stringify(data))
            navigate('')
        } else {
            alert('Something went wrong')
        }
    }

    let logoutUser = () => {
        setUser(null)
        setAuthToken(null)
        localStorage.removeItem('authToken')
        navigate('/')
    }

    let updateToken = async () => {
        console.log('Update token')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({'refresh': authToken.refresh}) 
        })
        let data = await response.json()
        // console.log('data: ', data)
        // console.log('response', response)

        if (response.status === 200) {
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
        } else {
            logoutUser()
        }
    }

    let contextData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authToken) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authToken, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext