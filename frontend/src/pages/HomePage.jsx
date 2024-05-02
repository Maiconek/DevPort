import React, {useState, useEffect, useContext} from "react";
import AuthContext from "../context/AuthContext";



const HomePage = () => {
    let [projects, setProjects] = useState([])
    let {authToken, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getProjects()
    })

    let getProjects = async () => {
        fetch('http://127.0.0.1:8000/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + String(authToken.access)
            }
        })
        .then((response) => {
            if(response.status === 200) {
                return response.json()
            } else if(response.status === 401) {
                logoutUser()
            }
        })
        .then((data) => setProjects(data))
    }

    return (
        <div>
            <p>You are logged in</p>
            <p>Your projects</p>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        {project.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage