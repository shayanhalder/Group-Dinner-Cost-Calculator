import './App.css'
import Accordion from './components/accordion/Accordion.tsx'
// import Button from "./components/Button/Button.tsx"
import ButtonGroup from './components/ButtonGroup/ButtonGroup.tsx'

function App() {

  return (
    <>
      <h1 className="title"> Group Dinner Price Calculator</h1>
      <div className="accordionContainer"> 
        <Accordion buttonTitle={"Group Members"}> 
          <ButtonGroup />
        
          <p> This is test text</p>
          <ol>
            <li> Shayan </li>
            <li> Bob </li>
          </ol>
        </Accordion>

      </div>
      
    </>
  )
}

export default App
