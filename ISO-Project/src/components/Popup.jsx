import React from "react";
import "./Popup.css";

export const Popup = ({text, button}) => {
    return (
    <div className="blurry">
        <div className="popup">
            <div className="title">
                <h2>Aviso</h2>
            </div>
            <p className="info">{text}</p>
            {button}
        </div>
    </div>
    );
};
