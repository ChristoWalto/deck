import { useState } from "react";
import $ from "jquery";

export default function Menu() {
    function startGame(){
        $("#boardDiv")[0].setAttribute("style", "display: inline");
        $("#gameDiv")[0].setAttribute("style", "display: flex");
        $("#scoreboardDiv")[0].setAttribute("style", "display: flex");
        // $("#levelDiv")[0].setAttribute("style", "display: flex");
        $("#startButton")[0].setAttribute("hidden", true);
    }
    return(
        <>
        <div id="menuDiv">
        <h1>Beat the Deck!</h1>
        <button onClick={startGame} id="startButton">Start</button>
        </div>
        </>
    )

}