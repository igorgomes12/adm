import BlurIn from '@/components/magicui/blur-in'
import { menuNavigation } from '@/utils/interface/first-page'
import { DashboardIcon, ExitIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { TableClientBuy } from '../tables-client/table-client-buy'
import { SystemComponent } from '@/pages/channel/system/system'
import { AccountingComponent } from '@/pages/channel/accounting/accounting'
export default function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const [isSidebarOpen, _] = useState<boolean>(true)

  const handleToggleSubmenu = (id: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleSubmenuClick = (componentId: string) => {
    setActiveComponent(componentId)
  }

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <div className="flex">
      <div
        id="sidebar-menu"
        className={`flex flex-col h-screen bg-foreground/70 overflow-auto text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-32'
        } relative`}
      >
        <div className="flex cursor-pointer  items-center mb-4 border-b-white border-b-2 justify-center py-2">
          <DashboardIcon className="w-6 h-6 mr-2" />
          {isSidebarOpen && <span className="text-lg font-bold">Menu</span>}
        </div>
        {menuNavigation.map(menu => (
          <div key={menu.id} className="mb-4">
            <div
              onClick={() => handleToggleSubmenu(menu.id)}
              className={`cursor-pointer flex items-center p-2 gap-2  ${
                isSidebarOpen ? 'text-lg' : 'text-xs'
              } rounded ${
                openSubmenus[menu.id]
                  ? 'bg-orange-500 text-black'
                  : 'hover:bg-orange-300'
              }`}
              title={menu.label}
            >
              {menu.icon}

              {menu.label}
            </div>
            {openSubmenus[menu.id] &&
              menu.subcategories?.map((subcategory, idx) => (
                <div key={idx} className="ml-4 mt-2">
                  <div className="text-sm text-orange-500 uppercase font-bold">
                    {subcategory.title}
                  </div>
                  {subcategory.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center p-4 rounded-s-2xl cursor-pointer ${
                        activeComponent === item.label
                          ? 'bg-orange-400 text-black'
                          : 'hover:bg-orange-300'
                      }`}
                      onClick={() => handleSubmenuClick(item.label)}
                      title={item.label}
                    >
                      {item.icon}
                      {isSidebarOpen && (
                        <span className="ml-2">{item.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ))}
        <div className="mt-auto flex items-center p-2 hover:bg-gray-300 rounded cursor-pointer">
          <ExitIcon className="w-6 h-6" />
          {isSidebarOpen && <span className="ml-2">Sign out</span>}
        </div>
      </div>
      <div className="flex-1 p-4">
        {activeComponent === 'Clientes de Venda' ? (
          <TableClientBuy />
        ) : activeComponent === 'Sistemas' ? (
          <SystemComponent />
        ) : activeComponent === 'Contabilidades' ? (
          <AccountingComponent />
        ) : (
          <div className="flex flex-col h-full bg-gray-400 w-full items-center justify-center">
            <BlurIn word="Seja bem-vindo!" className="text-md"></BlurIn>
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
