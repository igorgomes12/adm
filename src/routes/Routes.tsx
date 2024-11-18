import { SignIn } from "@/components/sing-in/sing-in"
import { AccountingComponent } from "@/pages/channel/accounting/accounting"
import { Account } from "@/pages/channel/accounts/account"
import { ClientComponent } from "@/pages/channel/client/client"
import { FormClientComponent } from "@/pages/channel/client/form-client"
import { EstablishmentComponent } from "@/pages/channel/establishment/establishment"
import { PaymentComponent } from "@/pages/channel/forms-payment/payment"
import { ModuleComponent } from "@/pages/channel/programming/module/module"
import { FormRepresentative } from "@/pages/channel/representative/form-representative"
import { RepresentativeComponent } from "@/pages/channel/representative/representative"
import { CalledComponent } from "@/pages/channel/support/called/called"
import { FormCalledComponent } from "@/pages/channel/support/called/form-called"
import { SystemComponent } from "@/pages/channel/system/system"
import { UsersComponent } from "@/pages/channel/user/users"
import { MainDashboard } from "@/pages/dashboard/main-dashboard"
import { Layout } from "@/pages/layout"
import { TelaPrincipal } from "@/pages/tela-principal/tela-principal"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/tela-principal" element={<TelaPrincipal />} />
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/sistemas" element={<SystemComponent />} />
          <Route path="/contabilidades" element={<AccountingComponent />} />
          <Route path="/clientes-de-venda" element={<ClientComponent />} />
          <Route
            path="/cadastro-cliente/:id?"
            element={<FormClientComponent />}
          />
          <Route path="/canais" element={<RepresentativeComponent />} />
          <Route path="/formas-de-pagamento" element={<PaymentComponent />} />
          <Route path="/modulo" element={<ModuleComponent />} />
          <Route
            path="/cadastro-chamado/:id?"
            element={<FormCalledComponent />}
          />
          <Route
            path="/cadastro-representante/:id?"
            element={<FormRepresentative />}
          />
          <Route
            path="/tipo-estabelecimento"
            element={<EstablishmentComponent />}
          />
          <Route path="/usuarios" element={<UsersComponent />} />
          <Route path="/chamados" element={<CalledComponent />} />
          <Route path="/contas" element={<Account />} />

          <Route path="*" element={<Navigate to="/tela-principal" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
