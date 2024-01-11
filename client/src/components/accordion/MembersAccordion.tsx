import MemberStyles from './MembersAccordion.module.css';
import { useState, useRef, useEffect } from 'react';

export default function Accordion() {
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
            <button className={MemberStyles.toggle} onClick={() => setToggled(!toggled)}> Group Members </button>
            <div className={MemberStyles.container} ref={ref}>
                <p>
                    Group members are: shayan, alan, dalton, bob, steve, john, johs
                </p>
            </div>
        </>
    )

}