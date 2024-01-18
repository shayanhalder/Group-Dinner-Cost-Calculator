import AccordionStyles from "./Accordion.module.css";
import { useState, useRef, useEffect, ReactNode } from "react";
import { memberCost } from "../../App";

interface AccordionProps {
  buttonTitle?: string;
  members: memberCost;
  children: ReactNode;
  customToggler?: ReactNode;
}

const MAX_ACCORDION_HEIGHT = 50; // vh units
const MAX_HEIGHT_UNITS = "vh";

export default function Accordion({ buttonTitle, members, children, customToggler = null }: AccordionProps) {
  const [toggled, setToggled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const membersRef = useRef(members);

  useEffect(() => {
    if (ref.current && !toggled) {
      ref.current.style.maxHeight = "0px";
      ref.current.style.overflow = "hidden";
      setTimeout(() => {
        if (ref.current) ref.current.style.border = "none";
      }, 100);
    } else if (ref.current && toggled) {
      ref.current.style.maxHeight = `${MAX_ACCORDION_HEIGHT}${MAX_HEIGHT_UNITS}`;
      ref.current.style.overflow = "scroll"; // once past max height, the excess content can be scrolled to
      ref.current.style.border = "2px solid var(--gray-border)";
    }
  }, [toggled]);

  useEffect(() => {
    if (ref.current && toggled) {
      ref.current.style.maxHeight = `${MAX_ACCORDION_HEIGHT}${MAX_HEIGHT_UNITS}`;
      ref.current.style.overflow = "scroll";
      ref.current.style.border = "2px solid var(--gray-border)";
      membersRef.current = members;
    }
  }, [members]);

  return (
    <div className={AccordionStyles.parent}>
      {/* Sets custom toggler to button by default unless customToggler prop is specified. */}
      {customToggler != null ? (
        <span style={{ width: "fit-content", cursor: "pointer" }} onClick={() => setToggled(!toggled)}>
          {customToggler}
        </span>
      ) : (
        <button className={AccordionStyles.toggle} onClick={() => setToggled(!toggled)}>
          {buttonTitle}
        </button>
      )}

      {/* Displays the children in the "drop down" / "hidden" part of the accordion once it is activated */}
      <div className={AccordionStyles.container} ref={ref}>
        {children}
      </div>
    </div>
  );
}
