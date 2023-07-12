import './App.css';
import Homepage from './Components/Pages/Homepage';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
