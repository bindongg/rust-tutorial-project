import React from "react";
import {FadeLoader} from "react-spinners";

function Loading(){
    return(
        <div className="contentWrap">
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <FadeLoader
                    color="#C63DEE"
                    height={15}
                    width={5}
                    radius={2}
                    margin={2}
                />
                <span>시간이 다소 소요될 수 있습니다</span>
            </div>
        </div>
    );
}

export default Loading;