import { IButton } from "./types";
import  './Button.scss'
import React from "react";

const Button = ({onClick, disabled, className, children}:IButton) => {
    console.log('button render')
    return (
        <button 
            onClick={onClick}
            className={className}
            disabled={disabled}>
            {children}
        </button>
    );
};

export default React.memo(Button);