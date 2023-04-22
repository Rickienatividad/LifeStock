import "./style/App.css"
import { Login } from "./pages/Login";
import Field from "./pages/Field";
import { SupervisorView } from "./pages/Supervisor";
import "./style/field.css";
import { Protected } from "./Security/Protected";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/field"
            element={
              <Protected>
                <Field />
              </Protected>
            }
          />
          <Route path="/supervisor" element={<SupervisorView />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
