import { menuNavigation } from '@/utils/interface/first-page'
import { DashboardIcon, ExitIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { LocationsAcess } from '../home/main/locations'
import { MainDashboard } from '@/pages/dashboard/main-dashboard'

export default function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [showDashboard, setShowDashboard] = useState<boolean>(false)
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
    setShowDashboard(false)
  }
  const handleMenuClick = () => {
    setShowDashboard(true) // Mostra o Dashboard quando o Menu é clicado
    setActiveComponent(null) // Limpa o componente ativo
  }

  const renderSubcategories = (subcategories: any[], depth = 0) => {
    return subcategories.map((subcategory, idx) => (
      <div key={idx} className={`ml-${4 * (depth + 1)} mt-2`}>
        <div className="text-sm text-black uppercase font-bold">
          {subcategory.title}
        </div>
        {subcategory.items.map((item: any, itemIdx: number) => (
          <div key={itemIdx}>
            <div
              className={`flex items-center p-4 rounded-s-2xl cursor-pointer ${
                activeComponent === item.label
                  ? 'bg-colorProject-blue-light text-black'
                  : 'hover:bg-colorProject-blue-light'
              }`}
              onClick={() => {
                if (item.subcategories) {
                  handleToggleSubmenu(item.label)
                } else {
                  handleSubmenuClick(item.label)
                }
              }}
              title={item.label}
            >
              {item.icon}
              {isSidebarOpen && <span className="ml-2">{item.label}</span>}
            </div>
            {openSubmenus[item.label] &&
              item.subcategories &&
              renderSubcategories(item.subcategories, depth + 1)}
          </div>
        ))}
      </div>
    ))
  }

  return (
    <div className="flex">
      <div
        id="sidebar-menu"
        className={`flex flex-col h-screen bg-foreground/70 overflow-auto text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-32'
        } relative`}
      >
        <div
          className="flex cursor-pointer items-center mb-4 border-b-white border-b-2 justify-center py-2"
          onClick={handleMenuClick}
        >
          <DashboardIcon className="w-6 h-6 mr-2" />
          <span className="text-lg font-bold">Menu</span>
        </div>
        {menuNavigation.map(menu => (
          <div key={menu.id} className="mb-4">
            <div
              onClick={() => handleToggleSubmenu(menu.id)}
              className={`cursor-pointer flex items-center p-2 gap-2 ${
                isSidebarOpen ? 'text-lg' : 'text-xs'
              } rounded ${
                openSubmenus[menu.id]
                  ? 'bg-colorProject-blue-light text-black'
                  : 'hover:bg-colorProject-blue-light'
              }`}
              title={menu.label}
            >
              {menu.icon}
              {isSidebarOpen && menu.label}
            </div>
            {openSubmenus[menu.id] &&
              menu.subcategories &&
              renderSubcategories(menu.subcategories)}
          </div>
        ))}
        <div className="mt-auto flex items-center p-2 hover:bg-gray-300 rounded cursor-pointer">
          <ExitIcon className="w-6 h-6" />
          {isSidebarOpen && <span className="ml-2">Sign out</span>}
        </div>
      </div>
      {showDashboard ? (
        <MainDashboard />
      ) : (
        <LocationsAcess activeComponent={activeComponent} />
      )}
    </div>
  )
}
