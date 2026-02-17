import { Component, useState } from "react";
import "./sidebar.css";

export const Scoreboard = ({score, streak, total}) =>{
    return(
        <>
            <div id="scoreboardDiv">
                Score:
                <label value="Score">
                    <input id="scoreInput" disabled={true} value={score}></input>
                </label>
                Streak Multiplier:
                <label value="multiplier">
                    <input id="multInput" disabled={true} value={streak}></input>
                </label>

                Total:
                <label value="total">
                    <input id="totalInput" disabled={true} value={total}></input>
                </label>
            </div>
        </>
    )
}