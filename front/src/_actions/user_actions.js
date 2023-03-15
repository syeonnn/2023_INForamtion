import axios from "axios";
import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from "./types";

export function loginUser(dataToSubmit) {
    console.log("user_actions 실행: loginUser");
    const headers = {
        headers: {
            "Content-Type":"application/json"
        }
    }

    const request = axios.post("/api/users/login", dataToSubmit, headers)
                    .then(response => {
                        console.log(response.data);

                        return response.data;
                    })
                    .catch(err => console.error(err));

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    console.log("user_actions 실행: registerUser");
    const headers = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const request = axios.post("/api/users/register", dataToSubmit, headers)
                    .then(response => {
                        console.log(response.data);

                        return response.data;
                    })
                    .catch(err => console.error(err));

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    console.log("user_action 실행: auth");

    const request = axios.get("/api/users/auth")
                    .then(response => {
                        console.log(response.data);

                        return response.data
                    });

    return {
        type: AUTH_USER,
        payload: request
    }
}