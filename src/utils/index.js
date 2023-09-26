import axios from "axios"


const API_URL = "http://localhost:8800";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
    try {
        const result = await API(url, {
            method : method || 'GET',
            data: data,
            headers: {
                "content-type":"application/json",
                Authorization: token ? `Bearer ${token}`: "",
            },
        });
        return result?.data;
    } 
    catch(error){
        const err = error.response.data;
        console.log(err);
        return { status: err.success, message: err.message}
    }
}

export const getUserInfo = async (token,id) => {
    try {
        const uri = id == undefined ? "/users/get-user": "/users/get-user/"+id;
        const res = await apiRequest({
            url:uri,
            token:token,
            method: "POST",
        });

        if(res?.messsage === "Authentication failed"){
            localStorage.removeItem("user");
            window.alert("User session expired, Login again. ");
            window.location.replace("/login");
        }
        return res?.user;
    }
    catch(error){
        console.log(error);
    }
};