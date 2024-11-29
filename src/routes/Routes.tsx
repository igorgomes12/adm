import { SignIn } from "@/components/sing-in/sing-in";
import { AccountingComponent } from "@/pages/Channel/accounting/accounting";
import { Account } from "@/pages/Finance/accounts/account";
import { ClientComponent } from "@/pages/Channel/client/client";
import { FormClientComponent } from "@/pages/Channel/client/form-client";
import { EstablishmentComponent } from "@/pages/Channel/establishment/establishment";
import { PaymentComponent } from "@/pages/Admin/forms-payment/payment";
import { FormRepresentative } from "@/pages/Admin/representative/form-representative";
import { RepresentativeComponent } from "@/pages/Admin/representative/representative";
import { CalledComponent } from "@/pages/Supports/called/called";
import { FormCalledComponent } from "@/pages/Supports/called/form-called";
import { SystemComponent } from "@/pages/Programation/system/system";
import { UsersComponent } from "@/pages/Admin/user/users";
import { MainDashboard } from "@/pages/Dashboard/main-dashboard";
import { Layout } from "@/pages/layout";
import { TelaPrincipal } from "@/pages/Sign-In/tela-principal/tela-principal";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ModuleComponent } from "@/pages/Programation/module/module";
import { DescriptionCalled } from "@/pages/Admin/description-called/description-called";

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
          <Route
            path="/descricao-de-chamados"
            element={<DescriptionCalled />}
          />

          <Route path="*" element={<Navigate to="/tela-principal" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
