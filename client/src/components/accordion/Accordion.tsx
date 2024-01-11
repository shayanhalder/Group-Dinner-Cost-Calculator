import AccordionStyles from './Accordion.module.css';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface AccordionProps {
    buttonTitle: string,
    children: ReactNode
}

export default function Accordion( {buttonTitle, children } : AccordionProps ) {
    const [toggled, setToggled] = useState(false);
    const ref = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        if (ref.current && !toggled) {
            ref.current.style.maxHeight = "0px";
            setTimeout(() => {
                if (ref.current)
                    ref.current.style.border = "none";
            }, 160)
        } else if (ref.current && toggled) {
            ref.current.style.maxHeight = "200px";
            ref.current.style.border = "1px solid black";
        }
    }, [toggled])

    return (
        <>
            <button className={AccordionStyles.toggle} onClick={() => setToggled(!toggled)}> {buttonTitle} </button>
            <div className={AccordionStyles.container} ref={ref}>
                {children}
            </div>
        </>
    )

}