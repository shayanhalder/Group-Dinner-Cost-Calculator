import ButtonStyles from "../Button/Button.module.css";
// import MemberListStyles from "./MemberList.module.css";

import { useState } from "react";

interface MemberListProps {
    groupMembers: string[],
    setGroupMembers: React.Dispatch<React.SetStateAction<string[]>>
}

export default function MemberList( { groupMembers, setGroupMembers } : MemberListProps ) {
    const [removeMode, setRemoveMode] = useState(false);
    
    function addMember() {
        let newMember = prompt("Name of new member: ");

        if (newMember == null || newMember == "")
            return

        setGroupMembers([...groupMembers, newMember])
    }

    function removeMember(e:any) {
        const memberName = e.target.dataset.membername;
        setGroupMembers([...groupMembers].filter(member => member !== memberName))
    }


    return (
        <>
            <div className={ButtonStyles.container}>
                <button className={ButtonStyles.addButton} onClick={() => addMember()} > Add </button>
                <button className={ButtonStyles.removeButton} onClick={() => setRemoveMode(!removeMode)}> Remove </button>
            </div>
            <p> Group Members: </p>
            <ol>
                {groupMembers.map(member => {
                    return (
                        <>
                            <li key={Math.random()}> {member}  {" "}
                                {removeMode == true ? <span key={Math.random()} onClick={removeMember} data-membername={member} style={{color: 'red', cursor: 'pointer'}}>X</span> : null }
                            </li> 
                        </>
                    )
                    })

                } 
            </ol>
        </>
    )

}