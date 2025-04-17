import {useEffect } from "react";
interface ICustomHook<T extends HTMLElement>{
    ref: React.RefObject<T | null>;
    callBack: ()  => void;
} 
export const useClickOutside = <T extends HTMLElement>({ref, callBack}:ICustomHook<T>) => {
    const handleClick = (e:MouseEvent) => {
        if(ref.current && !ref.current.contains(e.target as Node)){
            callBack()
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    })    
}