import './Login.css';
import React, { useState} from 'react';
import axios from 'axios';
import Home from './Home';


const Login = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [backendResponse, setbackendResponse] = useState();
    


    const formHandler = async (event) => {
        event.preventDefault();
        const body = {
            name: name,
            email: email,
            password: password,
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await axios.post("/login", body, config);
        setbackendResponse(response.data.response);
        if (response.data.authenticated) {
            props.setAuthenticated(response.data.authenticated);
        }
    }
    if(props.authenticated){
        return(
            <Home />
        )
    } else {
    
    return (
        <div>
            <h1>Login</h1>
            <form id="login" className="form" onSubmit={formHandler}>
                
                <label>User Name:</label><br />
                <input type="text" name="userName" onChange={(e) => { setName(e.target.value) }}></input><br /><br />

                <label>Email:</label><br />
                <input type="text" name="userEmail" onChange={(e) => { setEmail(e.target.value) }}></input><br /><br />

                <label>Password:</label><br></br>
                <input type="password" name="userPassword" onChange={(e) => { setPassword(e.target.value) }}></input><br /><br />

                <button id="loginbtn" type="submit">Login</button>
            </form>
            <h2 className="response">{backendResponse}</h2>
            <h2 className="response">{props.message}</h2>
        </div>
        );
    }   
}


export default Login;