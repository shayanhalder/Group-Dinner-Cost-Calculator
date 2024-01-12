import AccordionStyles from './Accordion.module.css';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface AccordionProps {
    buttonTitle: string,
    members: string[],
    children: ReactNode
}

export default function Accordion( {buttonTitle, members, children } : AccordionProps ) {
    const [toggled, setToggled] = useState(false);
    const ref = useRef<HTMLDivElement>(null); 
    const membersRef = useRef(members);

    useEffect(() => {
        if (ref.current && !toggled) {
            ref.current.style.height = "0px";
            ref.current.style.overflow = "hidden";
            setTimeout(() => {
                if (ref.current)
                    ref.current.style.border = "none";
            }, 100)
        } else if (ref.current && toggled) {
            ref.current.style.overflow = "visible";
            ref.current.style.height = `${ref.current.scrollHeight + 20}px`;
            ref.current.style.border = "2px solid var(--gray-border)";
        }
    }, [toggled])

    useEffect(() => {
        if (ref.current && membersRef.current.length < members.length) {
            ref.current.style.height = `${ref.current.scrollHeight + 20}px`;
            ref.current.style.overflow = "visible";
            ref.current.style.border = "1px solid black";
            membersRef.current = members
        } else if (ref.current && membersRef.current.length > members.length) {
            ref.current.style.height = `${ref.current.scrollHeight - 30}px`;
            ref.current.style.overflow = "visible";
            ref.current.style.border = "2px solid var(--gray-border)";
            membersRef.current = members
        }
    }, [members])

    return (
        <>
            <button className={AccordionStyles.toggle} onClick={() => setToggled(!toggled)}> {buttonTitle} </button>
            <div className={AccordionStyles.container} ref={ref}>
                {children}
            </div>
        </>
    )

}