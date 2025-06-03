import './App.css'
import {Route, Routes} from "react-router-dom";
import PaymentPage from "./pages/PaymentPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {AdminPage} from "@/pages/AdminPage.tsx";
import {EventsPage} from "@/pages/EventsPage.tsx";
import {PromoCodesPage} from "@/pages/PromoCodesPage.tsx";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {ReauireAuth} from "@/layouts/RequireAuth.tsx";
import {DepartmentsPage} from "@/pages/DepartmentsPage.tsx";
import {SuccessPaymentPage} from "@/components/SuccessPaymentPage.tsx";
import {FailPaymentPage} from "@/components/FailPaymentPage.tsx";


function App() {
  return (
      <PrimeReactProvider>
          <Routes>
              <Route path="/" element={<PaymentPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={
                  <ReauireAuth>
                    <AdminPage />
                  </ReauireAuth>
              } />
              <Route path="/events" element={
                  <ReauireAuth>
                    <EventsPage />
                  </ReauireAuth>
                  } />
              <Route path="/promo-codes" element={
                  <ReauireAuth>
                    <PromoCodesPage />
                  </ReauireAuth>
              } />
              <Route path="/departments" element={
                  <ReauireAuth>
                      <DepartmentsPage />
                  </ReauireAuth>
              } />

              <Route path={"/success"} element={<SuccessPaymentPage />} />
              <Route path={"/fail"} element={<FailPaymentPage />} />
          </Routes>
      </PrimeReactProvider>
  )
}

export default App
