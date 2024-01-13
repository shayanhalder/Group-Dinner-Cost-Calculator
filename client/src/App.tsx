import "./App.css";
import Accordion from "./components/accordion/Accordion.tsx";
import MemberList from "./components/MemberList/MemberList.tsx";
import FoodTable from "./components/FoodTable/FoodTable.tsx";
import { useState } from "react";

function App() {
  const [members, setMembers] = useState<string[]>([]);

  return (
    <>
      <h1 className="title"> Group Dinner Price Calculator</h1>
      <div className="accordionContainer">
        <Accordion buttonTitle={"Group Members"} members={members}>
          <MemberList groupMembers={members} setGroupMembers={setMembers} />
        </Accordion>

        <Accordion buttonTitle={"Group Food Items"} members={members}>
          <FoodTable members={members} />
        </Accordion>
      </div>
    </>
  );
}

export default App;
