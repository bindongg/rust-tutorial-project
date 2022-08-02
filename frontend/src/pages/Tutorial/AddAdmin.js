import { useEffect } from "react";
import axios from "axios";


function AddAdmin() {
    
    useEffect( () => {
        axios.post(`http://localhost:8080/test/admin`, {
            "userId": "admin",
            "userPassword": "1234",
            "userEmail": "mail"
        })
            .then(function (response) { 
                alert("admin 1234 회원가입 성공");
            });   
        }, []);
}

export default AddAdmin;