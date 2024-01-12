import FoodTableStyles from "./FoodTable.module.css";
import ButtonStyles from "../Button/Button.module.css";
import { useState } from "react";

export default function FoodTable( ) {
    const [foodItems, setFoodItems] = useState([["Name", "Price", "Quantity", "Total $", "$ / person"]]);
    const [removeMode, setRemoveMode] = useState(false);

    function addItem() {
        let newRowData = []
        for (let header of foodItems[0]) {
            const newHeaderData = prompt(`Enter ${header}`)
            if (newHeaderData == null)
                return            
            newRowData.push(newHeaderData)
            
        }
        setFoodItems([...foodItems, newRowData])
    }

    function removeItem(rowIndex: number) {
        let foodItemsCopy = [...foodItems]
        foodItemsCopy.splice(rowIndex, 1)
        setFoodItems(foodItemsCopy)
    }


    return (
        <div className={FoodTableStyles.parent}>
            <table className={FoodTableStyles.table}>
                {
                    foodItems.map((currentRow, currentRowIndex) => {
                            return (
                                <tr key={currentRowIndex}>
                                    { // if first row then use <th> (table header tag) otherwise use <td> (table data tag)
                                     //   index == 0 ? currentRow.map(data => <th> {data} </th>) : currentRow.map(data => <td> {data} </td>)
                                    }

                                    { // if first row then use <th> (table header tag) otherwise use <td> (table data tag)
                                        currentRow.map((data, currentColumnIndex) => {
                                            const removeButton = (removeMode && currentRowIndex != 0 && currentColumnIndex == currentRow.length - 1) ? (
                                                <span style={{color: 'red', cursor: 'pointer'}} onClick={() => removeItem(currentRowIndex)}> X </span> )
                                                     : null
                                            if (currentRowIndex == 0) {
                                                return (
                                                    <>
                                                        <th key={currentColumnIndex}> {data} </th>
                                                        {removeButton != null ? <th key={Math.random()}>  {removeButton} </th> : null}
                                                    </>
                                                )
                                            }
                                            
                                            return (
                                                <>
                                                    <td key={currentColumnIndex}> {data} </td>
                                                    {removeButton != null ? (<td key={Math.random()}>  {removeButton} </td>) : null}
                                                </>
                                            )
                                    })
                                    }
                                </tr>
                            )
                    })
                }
                
            </table>

            <div className={ButtonStyles.container}>
                <button className={ButtonStyles.addButton} onClick={() => addItem()} > Add </button>
                <button className={ButtonStyles.removeButton} onClick={() => setRemoveMode(!removeMode)}> Remove </button>
            </div>
        
        </div>
    )
}