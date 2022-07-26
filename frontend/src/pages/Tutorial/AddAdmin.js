import { useEffect } from "react";
import axios from "axios";


function AddAdmin() {
    
    useEffect( () => {
        axios.post(`http://localhost:8080/test/admin`, {
            "userId": "hdm",
            "userPassword": "1234",
            "userEmail": "bindong@naver.com"
        })
            .then(function (response) { 
                alert("hdm 1234 회원가입 성공");
            });   
        }, []);
}

export default AddAdmin;