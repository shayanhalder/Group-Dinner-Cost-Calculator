import './App.css'
import Accordion from './components/accordion/MembersAccordion.tsx'

function App() {

  return (
    <>
      <h1 className="title"> Group Dinner Price Calculator</h1>
      <div className="accordionContainer"> 
        <Accordion />

      </div>
      
    </>
  )
}

export default App
