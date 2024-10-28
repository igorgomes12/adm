// AppRoutes.js
import { SignIn } from '@/components/sing-in/sing-in'
import { AccountingComponent } from '@/pages/channel/accounting/accounting'
import { ClientComponent } from '@/pages/channel/client/client'
import { FormClientComponent } from '@/pages/channel/client/form-client'
import { EstablishmentComponent } from '@/pages/channel/establishment/establishment'
import { PaymentComponent } from '@/pages/channel/forms-payment/payment'
import { FormRepresentative } from '@/pages/channel/representative/form-representative'
import { RepresentativeComponent } from '@/pages/channel/representative/representative'
import { SystemComponent } from '@/pages/channel/system/system'
import { UsersComponent } from '@/pages/channel/user/users'
import { MainDashboard } from '@/pages/dashboard/main-dashboard'
import { Layout } from '@/pages/layout'
import { TelaPrincipal } from '@/pages/tela-principal/tela-principal'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

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
          <Route path="/cadastro-cliente" element={<FormClientComponent />} />
          <Route path="/canais" element={<RepresentativeComponent />} />
          <Route path="/formas-de-pagamento" element={<PaymentComponent />} />
          <Route
            path="/cadastro-representante"
            element={<FormRepresentative />}
          />
          <Route
            path="/tipo-estabelecimento"
            element={<EstablishmentComponent />}
          />
          <Route path="/usuarios" element={<UsersComponent />} />
          <Route path="*" element={<Navigate to="/tela-principal" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
