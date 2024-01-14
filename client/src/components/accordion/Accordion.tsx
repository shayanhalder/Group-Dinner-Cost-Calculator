import AccordionStyles from "./Accordion.module.css";
import { useState, useRef, useEffect, ReactNode } from "react";

interface AccordionProps {
  buttonTitle?: string;
  members: string[];
  children: ReactNode;
  customToggler?: ReactNode;
}

export default function Accordion({ buttonTitle, members, children, customToggler = null }: AccordionProps) {
  const [toggled, setToggled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const membersRef = useRef(members);

  useEffect(() => {
    if (ref.current && !toggled) {
      ref.current.style.height = "0px";
      ref.current.style.overflow = "hidden";
      setTimeout(() => {
        if (ref.current) ref.current.style.border = "none";
      }, 100);
    } else if (ref.current && toggled) {
      ref.current.style.overflow = "visible";
      ref.current.style.height = `${ref.current.scrollHeight + 20}px`;
      ref.current.style.border = "2px solid var(--gray-border)";
    }
  }, [toggled]);

  useEffect(() => {
    if (ref.current && membersRef.current.length < members.length && toggled) {
      ref.current.style.height = `${ref.current.scrollHeight + 20}px`;
      ref.current.style.overflow = "visible";
      ref.current.style.border = "2px solid var(--gray-border)";
      membersRef.current = members;
    } else if (ref.current && membersRef.current.length > members.length && toggled) {
      ref.current.style.height = `${ref.current.scrollHeight - 30}px`;
      ref.current.style.overflow = "visible";
      ref.current.style.border = "2px solid var(--gray-border)";
      membersRef.current = members;
    }
  }, [members, children]);

  return (
    <div className={AccordionStyles.parent}>
      {/* Sets custom toggler to button by default unless customToggler prop is specified. */}
      {customToggler != null ? (
        <span onClick={() => setToggled(!toggled)}>{customToggler}</span>
      ) : (
        <button className={AccordionStyles.toggle} onClick={() => setToggled(!toggled)}>
          {" "}
          {buttonTitle}{" "}
        </button>
      )}

      {/* Displays the children in the "drop down" / "hidden" part of the accordion once it is activated */}
      <div className={AccordionStyles.container} ref={ref}>
        {children}
      </div>
    </div>
  );
}
