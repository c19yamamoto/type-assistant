import "./App.css";
import { Route, Routes } from "react-router-dom";
import { TypeAssistantContainer } from "./component/TypeAssistant/container";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TypeAssistantContainer />} />
      </Routes>
    </div>
  );
}

export default App;
