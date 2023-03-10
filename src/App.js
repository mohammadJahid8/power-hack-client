import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";
import HeaderNav from "./Components/HeaderNav/HeaderNav";
import BillTable from "./Components/BillTable/BillTable";
import ProtectedRoute from "./Utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <div class="blurdiv"></div>

      <div class="blurdiv2"></div>

      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/singup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/billings"
          element={
            <ProtectedRoute>
              <BillTable />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
