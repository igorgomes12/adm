import Ripple from '@/components/ui/ripple'
import { AccountingComponent } from '@/pages/channel/accounting/accounting'
import { ClientComponent } from '@/pages/channel/client/client'
import { FormClientComponent } from '@/pages/channel/client/form-client'
import { EstablishmentComponent } from '@/pages/channel/establishment/establishment'
import { PaymentComponent } from '@/pages/channel/forms-payment/payment'
import { FormRepresentative } from '@/pages/channel/representative/form-representative'
import { RepresentativeComponent } from '@/pages/channel/representative/representative'
import { SystemComponent } from '@/pages/channel/system/system'
import { UsersComponent } from '@/pages/channel/user/users'
import type { FC } from 'react'

interface LocationsProps {
  activeComponent: string | null
  setActiveComponent: (component: string | null, id?: number) => void
}

export const LocationsAcess: FC<LocationsProps> = ({
  activeComponent,
  setActiveComponent,
}) => {
  return (
    <div className="flex-1">
      {activeComponent === 'Clientes de Venda' ? (
        <ClientComponent
          onOpenFormClient={() => setActiveComponent('Cadastro Cliente')}
        />
      ) : activeComponent === 'Cadastro Cliente' ? (
        <FormClientComponent />
      ) : activeComponent === 'Canais' ? (
        <RepresentativeComponent
          onOpenFormClient={id =>
            setActiveComponent('Cadastro Representante', id)
          }
        />
      ) : activeComponent === 'Sistemas' ? (
        <SystemComponent />
      ) : activeComponent === 'Formas de Pagamento' ? (
        <PaymentComponent />
      ) : activeComponent === 'Contabilidades' ? (
        <AccountingComponent />
      ) : activeComponent === 'Cadastro Representante' ? (
        <FormRepresentative
          onOpenFormClient={() => setActiveComponent('Canais')}
        />
      ) : activeComponent === 'Tipo Estabelecimento' ? (
        <EstablishmentComponent />
      ) : activeComponent === 'Usuários' ? (
        <UsersComponent />
      ) : (
        <div className="flex flex-col bg-white h-full bg-foreground w-full items-center justify-center">
          <div className="hidden md:flex bg-white flex-col h-screen w-full items-center justify-center relative">
            <Ripple
              className="text-white"
              mainCircleOpacity={2.24}
              mainCircleSize={210}
              numCircles={5}
            />
            <img
              src="https://liderautomacao.s3.amazonaws.com/site/public/logo_icon.png"
              alt="logo"
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: '50%',
                left: '50%',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
