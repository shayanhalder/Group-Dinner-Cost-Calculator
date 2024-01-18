import ButtonStyles from "../Button/Button.module.css";
import MemberListStyles from "./MemberList.module.css";
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
      <table className={MemberListStyles.tableContainer}>
        <tr>
          <th> Name </th>
          <th> Group Cost </th>
          <th> Individual Cost </th>
          <th> Total </th>
        </tr>

        {Object.keys(groupMembers).map((memberName: string) => {
          return (
            <tr key={memberName}>
              <td> {memberName} </td>
              <td> {groupMembers[memberName].groupCost} </td>
              <td> {groupMembers[memberName].individualCost} </td>
              <td> {groupMembers[memberName].groupCost + groupMembers[memberName].individualCost} </td>

              {removeMode == true ? (
                <td
                  onClick={removeMember}
                  data-membername={memberName}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  X
                </td>
              ) : null}
            </tr>
          );
        })}
      </table>
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
