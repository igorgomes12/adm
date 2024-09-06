import { SignIn } from "@/components/sing-in/sing-in"
import { TelaPrincipal } from "@/pages/tela-principal/tela-principal"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/tela-principal" element={<TelaPrincipal />} />
  </Routes>
  </BrowserRouter>
)
}
