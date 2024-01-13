import FoodTableStyles from "./FoodTable.module.css";
import ButtonStyles from "../Button/Button.module.css";
import { useState, useEffect } from "react";

interface FoodTableProps {
  headers: string[];
  members: string[];
}

export default function FoodTable({ headers, members }: FoodTableProps) {
  const [foodItems, setFoodItems] = useState<string[][]>([headers]);
  const [removeMode, setRemoveMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  // updates total cost and cost per person if members added/removed or if user edits any data about the food item
  useEffect(() => {
    let foodItemsCopy = [...foodItems];
    for (let rowIndex = 1; rowIndex < foodItems.length; rowIndex++) {
      // recalculate the costs based on new data
      const totalCost = parseInt(foodItems[rowIndex][1]) * parseInt(foodItems[rowIndex][2]); // price * quantity
      const costPerPerson = (totalCost / members.length).toFixed(2).toString();
      foodItemsCopy[rowIndex][3] = totalCost.toString();
      foodItemsCopy[rowIndex][4] = costPerPerson;
    }

    setFoodItems(foodItemsCopy);
  }, [members, foodItems]);

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
        const totalCost = parseInt(newRowData[1]) * parseInt(newRowData[2]); // price * quantity
        const costPerPerson = Math.round((totalCost / members.length) * 100) / 100;

        newRowData.push(totalCost.toString());
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
    const newData = prompt(`Enter new ${foodItems[0][columnIndex]}`);
    let foodItemsCopy = [...foodItems];
    if (newData) foodItemsCopy[rowIndex][columnIndex] = newData;

    setFoodItems(foodItemsCopy);
  }

  return (
    <div className={FoodTableStyles.parent}>
      <table className={FoodTableStyles.table}>
        {foodItems.map((currentRow, currentRowIndex) => {
          const TEXT_COLOR = editMode && currentRowIndex != 0 ? "orange" : "black";
          return (
            <tr key={currentRowIndex}>
              {currentRow.map((data, currentColumnIndex) => {
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
                    <th
                      style={{ color: TEXT_COLOR }}
                      onClick={(e) => editItem(currentRowIndex, currentColumnIndex)}
                    >
                      {data}
                    </th>
                  ) : (
                    <td
                      style={{ color: TEXT_COLOR }}
                      onClick={(e) => editItem(currentRowIndex, currentColumnIndex)}
                    >
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
