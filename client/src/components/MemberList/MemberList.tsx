import ButtonStyles from "../Button/Button.module.css";
import { useState, useRef } from "react";
import { memberCost } from "../../App";

interface MemberListProps {
  groupMembers: memberCost;
  setGroupMembers: React.Dispatch<React.SetStateAction<memberCost>>;
}

export default function MemberList({ groupMembers, setGroupMembers }: MemberListProps) {
  const [removeMode, setRemoveMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function addMember() {
    let newMember = prompt("Name of new member: ");
    let groupMembersCopy = { ...groupMembers };

    if (newMember == null || newMember == "") return;
    groupMembersCopy[newMember] = {
      groupCost: 0,
      individualCost: 0,
    };

    setGroupMembers(groupMembersCopy);
  }

  function removeMember(e: any) {
    const memberName = e.target.dataset.membername;
    let groupMembersCopy = { ...groupMembers };
    delete groupMembersCopy[memberName];

    setGroupMembers(groupMembersCopy);
  }

  return (
    <>
      <p> Group Members: {Object.keys(groupMembers).length} </p>
      <ol>
        {Object.keys(groupMembers).map((memberName: string) => {
          return (
            <li key={Math.random()}>
              {" "}
              {memberName}{" "}
              {removeMode == true ? (
                <span
                  key={Math.random()}
                  onClick={removeMember}
                  data-membername={memberName}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  X
                </span>
              ) : null}
            </li>
          );
        })}
        {/* {groupMembers.map((member: string) => {
          return (
            <li key={Math.random()}>
              {" "}
              {member}{" "}
              {removeMode == true ? (
                <span
                  key={Math.random()}
                  onClick={removeMember}
                  data-membername={member}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  X
                </span>
              ) : null}
            </li>
          );
        })} */}
      </ol>
      <div ref={containerRef} className={ButtonStyles.container}>
        <button className={ButtonStyles.addButton} onClick={() => addMember()}>
          {" "}
          Add{" "}
        </button>
        <button className={ButtonStyles.removeButton} onClick={() => setRemoveMode(!removeMode)}>
          {" "}
          Remove{" "}
        </button>
      </div>
    </>
  );
}
