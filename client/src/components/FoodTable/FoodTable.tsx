import FoodTableStyles from "./FoodTable.module.css";
import ButtonStyles from "../Button/Button.module.css";
import { useState } from "react";

interface FoodTableProps {
  headers: string[];
  members: string[];
}

export default function FoodTable({ headers, members }: FoodTableProps) {
  const [foodItems, setFoodItems] = useState<string[][]>([headers]);
  const [removeMode, setRemoveMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  // re-calculate total cost and cost per person on each re-render since number of members could have changed or data could have been edited
  let foodItemsCopy = [...foodItems];
  for (let rowIndex = 1; rowIndex < foodItems.length; rowIndex++) {
    // recalculate the costs based on new data
    const totalCost = parseInt(foodItems[rowIndex][1]) * parseInt(foodItems[rowIndex][2]); // price * quantity
    foodItemsCopy[rowIndex][3] = totalCost.toString();

    // don't calculate price per person if the "$ / person" header isn't passed. if not passed the headers.length is 4
    if (headers.length == 4) {
      continue;
    }

    const costPerPerson = (totalCost / members.length).toFixed(2).toString();
    foodItemsCopy[rowIndex][4] = costPerPerson;
  }

  // function that returns true if the food item costs were updated as a result of a changed state, otherwise returns true
  function newFoodItemCosts(a: string[][], b: string[][]): boolean {
    for (let rowIndex = 0; rowIndex < a.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < a[rowIndex].length; columnIndex++) {
        if (a[rowIndex][columnIndex] != b[rowIndex][columnIndex]) return true;
      }
    }
    return false;
  }

  // update food state and re-render component only if nothing changed from the last render
  if (newFoodItemCosts(foodItemsCopy, foodItems)) setFoodItems(foodItemsCopy);

  function addItem(): void {
    let newRowData = [];
    for (const [index, header] of foodItems[0].entries()) {
      const newHeaderData = prompt(`Enter ${header}`);
      if (newHeaderData == null)
        // nothing entered
        return;

      newRowData.push(newHeaderData);

      if (index == 2) {
        // after quantity is entered, the rest of the values are calculated
        const totalCost: number = parseInt(newRowData[1]) * parseInt(newRowData[2]); // price * quantity
        newRowData.push(totalCost.toString());

        if (headers.length == 4) {
          setFoodItems([...foodItems, newRowData]);
          return;
        }
        const costPerPerson = Math.round((totalCost / members.length) * 100) / 100;
        newRowData.push(costPerPerson.toString());

        setFoodItems([...foodItems, newRowData]);
        return;
      }
    }
    setFoodItems([...foodItems, newRowData]);
  }

  function removeItem(rowIndex: number): void {
    let foodItemsCopy = [...foodItems];
    foodItemsCopy.splice(rowIndex, 1); // removes entire row from the table using the rowIndex
    setFoodItems(foodItemsCopy);
  }

  function editItem(rowIndex: number, columnIndex: number) {
    if (!editMode) return;

    const newData = prompt(`Enter new ${foodItems[0][columnIndex]}`);
    let foodItemsCopy = [...foodItems];
    if (newData) foodItemsCopy[rowIndex][columnIndex] = newData;

    setFoodItems(foodItemsCopy);
  }

  return (
    <div className={FoodTableStyles.parent}>
      <table className={FoodTableStyles.table}>
        {foodItems.map((currentRow, currentRowIndex) => {
          return (
            <tr key={currentRowIndex}>
              {currentRow.map((data, currentColumnIndex) => {
                const TEXT_COLOR =
                  editMode && currentRowIndex != 0 && currentColumnIndex <= 2 ? "orange" : "black";

                const onClickAction =
                  editMode && currentRowIndex != 0 && currentColumnIndex <= 2
                    ? () => editItem(currentRowIndex, currentColumnIndex)
                    : () => null;
                // if currently in remove mode, then display a red X button to delete food items
                const removeButton =
                  removeMode && currentRowIndex != 0 && currentColumnIndex == currentRow.length - 1 ? (
                    <span
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => removeItem(currentRowIndex)}
                    >
                      {" "}
                      X{" "}
                    </span>
                  ) : null;

                // if first row then use <th> (table header tag) otherwise use <td> (table data tag)
                const currentData =
                  currentRowIndex == 0 ? (
                    <th style={{ color: TEXT_COLOR }} onClick={onClickAction}>
                      {data}
                    </th>
                  ) : (
                    <td style={{ color: TEXT_COLOR }} onClick={onClickAction}>
                      {data}
                    </td>
                  );
                return (
                  <>
                    {currentData}
                    {removeButton != null ? <td key={Math.random()}> {removeButton} </td> : null}
                  </>
                );
              })}
            </tr>
          );
        })}
      </table>

      <div className={ButtonStyles.container}>
        <button className={ButtonStyles.addButton} onClick={() => addItem()}>
          {" "}
          Add{" "}
        </button>
        <button className={ButtonStyles.removeButton} onClick={() => setRemoveMode(!removeMode)}>
          {" "}
          Remove{" "}
        </button>
        <button className={ButtonStyles.editButton} onClick={() => setEditMode(!editMode)}>
          {" "}
          Edit{" "}
        </button>
      </div>
    </div>
  );
}
