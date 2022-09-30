import React, { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {customAxios} from "../../Common/Modules/CustomAxios";

function AuthConfirm() {
    const {authId} = useParams();
    const navigate = useNavigate();

    useEffect( () => {
             customAxios.patch(`/authConfirm/${authId}`).then((response) => 
             {
                if (response.data.code === 200)
                {
                    alert("인증이 완료되었습니다.")
                }
                else
                {
                    alert("인증에 실패했습니다.")
                }
             })
             .finally(() =>
             {
                navigate(`/home`);
             })
    }, []);

    return (
        <>
        </>
    );
}

export default AuthConfirm;
