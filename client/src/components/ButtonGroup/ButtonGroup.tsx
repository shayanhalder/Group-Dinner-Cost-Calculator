import Button from "../Button/Button.tsx";
import ButtonGroupStyles from "./ButtonGroup.module.css";

export default function ButtonGroup() {
    return (
        <div className={ButtonGroupStyles.container}> 
            <Button buttonType="add"> Add  </Button>
            <Button buttonType="remove"> Remove </Button>
        </div>
    )
}