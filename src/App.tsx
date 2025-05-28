import './App.css'
import {Route, Routes} from "react-router-dom";
import PaymentPage from "./pages/PaymentPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {AdminPage} from "@/pages/AdminPage.tsx";
import {EventsPage} from "@/pages/EventsPage.tsx";
import {PromoCodesPage} from "@/pages/PromoCodesPage.tsx";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";


function App() {
  return (
      <PrimeReactProvider>
          <Routes>
              <Route path="/" element={<PaymentPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/promo-codes" element={<PromoCodesPage />} />
          </Routes>
      </PrimeReactProvider>
  )
}

export default App
