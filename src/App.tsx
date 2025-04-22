import './App.css'
import {Route, Routes} from "react-router-dom";
import PaymentPage from "./pages/PaymentPage.tsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<PaymentPage />} />
      </Routes>
  )
}

export default App
