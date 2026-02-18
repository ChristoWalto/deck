import { Component, useState } from "react";
import "./sidebar.css";
import "./modal.css";

export const Scoreboard = ({score, streak, total}) =>{
    const [showRules, setShowRules] = useState(false);
    const toggleRules = () => {
        var curr = showRules;
        setShowRules(!curr);
    }

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
                <button onClick={toggleRules}>
                    How to Play
                </button>
                {showRules && (
                    <div className='modalOverlay' onClick={toggleRules}>
                        <div className="modalContent">
                            <div className="modalHeader">
                                <h3>How To Play!</h3>
                                <button className="close" onClick={toggleRules}>Close</button>
                            </div>
                            <div className="modalBody">
                            <p>Hover over a card and click to guess wether the next card drawn from the shuffled deck will be higher or lower than the current card.</p>
                            <p>If your guess is incorrect you will no longer be able to guess on that stack</p>

                            <p>The game ends when you either correctly guess every card in the deck or run out of stacks to guess from.</p>
                            </div>
                        </div>
                        
                    </div>
                )}
            </div>
        </>
    )
}