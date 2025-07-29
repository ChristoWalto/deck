import { useState } from "react";
import $ from "jquery";

export default function Menu() {
    function startGame(){
        $("#boardDiv")[0].setAttribute("style", "display: inline");
        $("#scoreboardDiv")[0].setAttribute("style", "display: flex");
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