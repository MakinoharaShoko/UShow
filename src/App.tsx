import './App.css'
import {Main} from "./components/Main";
import {pageData} from "./data/data";

function App() {
  return (
    <div className="App">
      <Main pageData={pageData}/>
    </div>
  )
}

export default App
