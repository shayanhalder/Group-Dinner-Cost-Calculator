import ButtonStyles from "./Button.module.css";
import { ReactNode } from "react";

interface ButtonProps {
    buttonType: string,
    action: React.Dispatch<React.SetStateAction<string[]>>,
    children: ReactNode
}

export default function Button( { buttonType, children } : ButtonProps) {
    let buttonClass;

    if (buttonType == "add") {
        buttonClass = ButtonStyles.addButton
    } else if (buttonType == "remove") {
        buttonClass = ButtonStyles.removeButton
    }

    return (
        <button className={buttonClass}>
            {children}
        </button>
    )

}