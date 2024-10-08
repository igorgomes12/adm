import {
  MenuId,
  menuNavigation,
  submenuItems,
} from '@/utils/interface/first-page'
import { useState } from 'react'
import { TableClientBuy } from '../tables-client/table-client-buy'
import BlurIn from '@/components/magicui/blur-in'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DashboardIcon,
  ExitIcon,
} from '@radix-ui/react-icons'

export default function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<{
    [key in MenuId]?: boolean
  }>({})
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  const handleToggleSubmenu = (id: MenuId) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSubmenuClick = (componentId: string) => {
    setActiveComponent(componentId)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex">
      <div
        className={`flex flex-col h-screen bg-gray-500 text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } relative`}
      >
        <button
          className="absolute top-4 -right-4 bg-gray-700 p-2 rounded-xl transform transition-transform"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <ArrowLeftIcon className="w-4 h-4 font-bold" />
          ) : (
            <ArrowRightIcon className="w-4 h-4 font-bold" />
          )}
        </button>
        <div className="flex items-center mb-4 border-b-white border-b-2 justify-center py-2">
          <DashboardIcon className="w-6 h-6 mr-2" />
          {isSidebarOpen && <span className="text-lg font-bold">Menu</span>}
        </div>
        {menuNavigation.map(menu => (
          <div key={menu.id} className="mb-4">
            <div
              onClick={() => handleToggleSubmenu(menu.id as MenuId)}
              className="cursor-pointer flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <span className="ml-2">{menu.label}</span>
            </div>
            {openSubmenus[menu.id as MenuId] &&
              submenuItems[menu.id as MenuId] && (
                <div className="ml-4 mt-2">
                  {submenuItems[menu.id as MenuId].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                      onClick={() => handleSubmenuClick(item.label)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
        <div className="mt-auto flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
          <ExitIcon className="w-4 h-4" />
          {isSidebarOpen && <span className="ml-2">Sign out</span>}
        </div>
      </div>
      <div className="flex-1 p-4">
        {activeComponent === 'Clientes de Venda' ? (
          <TableClientBuy />
        ) : (
          <div className="flex flex-col h-screen bg-gray-400 w-full items-center justify-center">
            {/* <BlurIn word="Seja bem-vindo!" className="text-md"></BlurIn> */}
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
