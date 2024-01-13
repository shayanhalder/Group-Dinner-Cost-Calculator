import FoodTableStyles from "./FoodTable.module.css";
import ButtonStyles from "../Button/Button.module.css";
import { useState, useEffect } from "react";

export default function FoodTable({ members }: { members: string[] }) {
  const [foodItems, setFoodItems] = useState<string[][]>([
    ["Name", "Price", "Quantity", "Total $", "$ / person"],
  ]);
  const [removeMode, setRemoveMode] = useState<boolean>(false);

  // if group members added or removed after creation of the food item row, then the cost per person should update
  useEffect(() => {
    let foodItemsCopy = [...foodItems];
    for (let rowIndex = 1; rowIndex < foodItems.length; rowIndex++) {
      const totalCost = parseInt(foodItems[rowIndex][3]); // price * quantity
      foodItemsCopy[rowIndex][4] = (totalCost / members.length).toFixed(2).toString();
    }

    setFoodItems(foodItemsCopy);
  }, [members]);

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

  return (
    <div className={FoodTableStyles.parent}>
      <table className={FoodTableStyles.table}>
        {foodItems.map((currentRow, currentRowIndex) => {
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
                if (currentRowIndex == 0) {
                  return (
                    <>
                      <th key={currentColumnIndex}> {data} </th>
                      {removeButton != null ? <th key={Math.random()}> {removeButton} </th> : null}
                    </>
                  );
                }

                return (
                  <>
                    <td key={currentColumnIndex}> {data} </td>
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
      </div>
    </div>
  );
}
