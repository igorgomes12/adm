import { TableClientBuy } from '@/components/modules/tables-client/table-client-buy'
import Ripple from '@/components/ui/ripple'
import { AccountingComponent } from '@/pages/channel/accounting/accounting'
import { EstablishmentComponent } from '@/pages/channel/establishment/establishment'
import { SystemComponent } from '@/pages/channel/system/system'
import { UsersComponent } from '@/pages/channel/user/users'
import type { FC } from 'react'

interface LocationsProps {
  activeComponent: string | null
}
export const LocationsAcess: FC<LocationsProps> = ({ activeComponent }) => {
  return (
    <div className="flex-1 p-4">
      {activeComponent === 'Clientes de Venda' ? (
        <TableClientBuy />
      ) : activeComponent === 'Sistemas' ? (
        <SystemComponent />
      ) : activeComponent === 'Contabilidades' ? (
        <AccountingComponent />
      ) : activeComponent === 'Tipo Estabelecimento' ? (
        <EstablishmentComponent />
      ) : activeComponent === 'Usuários' ? (
        <UsersComponent />
      ) : (
        <div className="flex flex-col bg-white h-full bg-foreground w-full items-center justify-center">
          <div className="hidden md:flex bg-white  flex-col h-screen w-full items-center justify-center relative">
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
