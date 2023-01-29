import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import BillTable from "./Components/BillTable/BillTable";

function App() {
  return (
    <div className="App">
      <HeaderNav />
      <Routes>
        <Route path="/singup" element={<Signup />} />
        <Route path="/singin" element={<Signin />} />
        <Route path="/billings" element={<BillTable />} />
      </Routes>
    </div>
  );
}

export default App;
