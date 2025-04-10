import { IButton } from "./types";
import  './Button.scss'

const Button = ({onClick, disabled, className, children}:IButton) => {
    return (
        <button 
            onClick={onClick}
            className={className}
            disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;