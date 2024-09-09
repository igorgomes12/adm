import {
  MenuId,
  menuNavigation,
  submenuItems,
} from '@/utils/interface/first-page'
import { useState } from 'react'
import { TableClientBuy } from '../tables-client/table-client-buy';

export default function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<{
    [key in MenuId]?: boolean
  }>({})
  const [activeComponent, setActiveComponent] = useState<string | null>(null);


  const handleToggleSubmenu = (id: MenuId) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSubmenuClick = (componentId: string) => {
    setActiveComponent(componentId);
  };

  return (
    <div className="grid grid-cols-12 px-2 py-1">
      <div className="flex flex-col col-span-12 md:col-span-2 border-r h-auto md:h-screen gap-2 items-start justify-start w-full">
      {menuNavigation.map(menu => (
          <div key={menu.id} className="border-b-2 py-2 w-full">
            <div
              onClick={() => handleToggleSubmenu(menu.id as MenuId)}
              className="cursor-pointer w-full"
            >
              {menu.label}
            </div>
            {openSubmenus[menu.id as MenuId] &&
              submenuItems[menu.id as MenuId] && (
                <div className="py-2 px-1 w-full gap-2 flex flex-col">
                  {submenuItems[menu.id as MenuId].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex border rounded-md bg-gray-50 hover:bg-gray-200 w-full items-center gap-2 px-2 py-2"
                      onClick={()=> handleSubmenuClick(item.label)}
                    >
                      {item.icon}
                      <span className="cursor-pointer">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="flex-1 col-span-12 md:col-span-10 p-2 flex items-start justify-start">
        {activeComponent === 'Clientes de Venda' ? (
          <TableClientBuy />
        ) : (
          <div className='flex flex-col h-screen bg-gray-400 w-full items-center justify-center'>
            <h1 className='font-bold text-4xl'>Seja Bem vindo!</h1>
            <p>Lider Admin</p>
            <img
              src="https://liderautomacao.s3.amazonaws.com/site/public/logo.png"
              alt="Lider Automação Logo"
              className="w-32 md:w-40"
            />
          </div>
        )}
      </div>
    </div>
  )
}
