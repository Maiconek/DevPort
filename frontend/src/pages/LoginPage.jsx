import React from "react";

const LoginPage = () => {
    return (
        <div>
            <form>
                <input type="text" name="username" placeholder="Enter username"></input>
                <input type="password" name="password" placeholder="Enter password"></input>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage