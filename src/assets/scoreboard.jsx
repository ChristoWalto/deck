import { Component, useState } from "react";
import $ from "jquery";
import "./sidebar.css";
var score = 0;
var streak = 0;
var total = 0;
export const incrementScore = () => {
    score = 100;
    streak += 1;
    total += score * streak;

    $('#scoreInput').val(score);
    $('#multInput').val(streak);
    $('#totalInput').val(total);
}

export const resetScore = () =>{
    streak = 0;
    $('#multInput').val(streak);
}

export const restartScore = () =>{
    score = 0;
    streak = 0;
    total = 0;
    $('#scoreInput').val(score);
    $('#multInput').val(streak);
    $('#totalInput').val(total);
}

export const Scoreboard = () =>{
    return(
        <>
            <div id="scoreboardDiv">
                Score:
                <label value="Score">
                    <input id="scoreInput" disabled={true} defaultValue={score}></input>
                </label>
                Streak Multiplier:
                <label value="multiplier">
                    <input id="multInput" disabled={true} defaultValue={streak}></input>
                </label>

                Total:
                <label value="total">
                    <input id="totalInput" disabled={true} defaultValue={total}></input>
                </label>
                {/* <label className="switch">
                    <span>Testing</span>
                    <input type="checkbox" name="guessBox" id="guessBox"></input>
                    <span className="slider">
                    </span>
                </label> */}
            </div>
        </>
    )
}