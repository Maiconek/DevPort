import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    console.log('Private route works')
    const authenticated = false
    return authenticated ? <><Outlet /></> : <Navigate to='/login' />
}

export default PrivateRoute