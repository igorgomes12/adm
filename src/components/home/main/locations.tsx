import { TableClientBuy } from '@/components/tables-client/table-client-buy'
import GradualSpacing from '@/components/ui/gradual-spacing'
import { AccountingComponent } from '@/pages/channel/accounting/accounting'
import { EstablishmentComponent } from '@/pages/channel/establishment/establishment'
import { SystemComponent } from '@/pages/channel/system/system'
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
      ) : (
        <div className="flex flex-col h-full bg-gray-400 w-full items-center justify-center">
          <GradualSpacing
            className="font-display text-center text-xl flex-col font-bold -tracking-widest  text-black dark:text-white md:text-3xl md:leading-[5rem]"
            text="Portal Administrativo"
          />
          <p>Lider Admin</p>
          <img
            src="https://liderautomacao.s3.amazonaws.com/site/public/logo.png"
            alt="Lider Automação Logo"
            className="w-32 md:w-40"
          />
        </div>
      )}
    </div>
  )
}
