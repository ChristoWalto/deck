import { useState } from "react";
import './sidebar.css';
export function Level({levelVal, requiredScore}){
    // var levelVal = 1;
    // var requiredScore = levelVal * 1000;
    return(
        <>
            <div id="levelDiv" >
                <h3>Level: {levelVal}</h3>
                Required Score:
                <input disabled={true} value={requiredScore}></input>
            </div>
        </>
    )
}