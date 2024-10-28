import { menuNavigation } from '@/common/interface/first-page'
import { Separator } from '@/components/ui/separator'
import { useCallback, useState } from 'react'
import { GoPin } from 'react-icons/go'
import { RxExit } from 'react-icons/rx'
import { useNavigate } from 'react-router'
import { Logout } from '../logout/logout'

interface Subcategory {
  title: string
  items: MenuItem[]
}

interface MenuItem {
  label: string
  icon: React.ReactNode
  subcategories?: Subcategory[]
}

function normalizeString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export default function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [isSidebarCompressed, setIsSidebarCompressed] = useState<boolean>(true)
  const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(false)
  const [showLogoutCard, setShowLogoutCard] = useState(false)
  const navigate = useNavigate()

  const handlePowerOffClick = () => {
    setShowLogoutCard(true)
  }

  const handleConfirmLogout = () => {
    setShowLogoutCard(false)
    navigate('/')
    window.location.reload()
  }

  const handleCancelLogout = () => {
    setShowLogoutCard(false)
  }

  const handleToggleSubmenu = useCallback((id: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }, [])

  const handleMenuClick = useCallback(() => {
    setIsSidebarCompressed(prev => !prev)
    navigate('/dashboard')
  }, [navigate])

  const handleMouseEnter = useCallback(() => {
    if (!isSidebarPinned) {
      setIsSidebarCompressed(false)
    }
  }, [isSidebarPinned])

  const handleMouseLeave = useCallback(() => {
    if (!isSidebarPinned) {
      setIsSidebarCompressed(true)
    }
  }, [isSidebarPinned])

  const handlePinSidebar = useCallback(() => {
    setIsSidebarPinned(prev => !prev)
    setIsSidebarCompressed(false)
  }, [])

  const renderSubcategories = useCallback(
    (subcategories: Subcategory[], depth = 0) => {
      return subcategories.map((subcategory, idx) => (
        <div key={idx} className={`ml-${4 * (depth + 1)} mt-2 w-full gap-2`}>
          <div className="text-lg text-zinc-400 py-4 px-8 uppercase font-bold">
            {isSidebarCompressed ? (
              <Separator
                orientation="horizontal"
                className="items-center flex justify-center -ml-1 "
              />
            ) : (
              <p>{subcategory.title}</p>
            )}
          </div>
          {subcategory.items.map((item: MenuItem, itemIdx: number) => (
            <div
              key={itemIdx}
              className={`flex text-xs ${
                isSidebarCompressed
                  ? 'items-center justify-center'
                  : 'items-start justify-start'
              } px-2 py-1.5 gap-4`}
            >
              <div
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  window.location.pathname.includes(normalizeString(item.label))
                    ? 'text-sky-500 bg-zinc-600 w-full'
                    : 'hover:bg-zinc-700 w-full'
                }`}
                onClick={() => {
                  if (item.subcategories) {
                    handleToggleSubmenu(item.label)
                  } else {
                    navigate(`/${normalizeString(item.label)}`)
                  }
                }}
                title={item.label}
              >
                <p className="text-2xl mr-2 items-center justify-center flex">
                  {item.icon}
                </p>
                {!isSidebarCompressed && (
                  <span className="text-sm">{item.label}</span>
                )}
              </div>
              {openSubmenus[item.label] &&
                item.subcategories &&
                renderSubcategories(item.subcategories, depth + 1)}
            </div>
          ))}
        </div>
      ))
    },
    [isSidebarCompressed, openSubmenus, navigate, handleToggleSubmenu],
  )

  return (
    <div className="flex">
      <div
        id="sidebar-menu"
        className={`${
          isSidebarCompressed ? 'w-28' : 'w-64'
        } flex flex-col h-screen bg-foreground/90 transition-all overflow-x-hidden text-white duration-300  ease-out relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`flex ${
            isSidebarCompressed ? 'justify-center' : 'justify-between'
          } items-center p-4`}
        >
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={handleMenuClick}
          >
            <img
              src="https://liderautomacao.s3.amazonaws.com/site/public/logo_icon.png"
              className="w-10 h-10"
              alt=""
            />
            {!isSidebarCompressed && (
              <span className="text-lg font-bold">Menu</span>
            )}
          </div>
          <div className="flex items-center h-5 space-x-2 justify-center ">
            {!isSidebarCompressed && (
              <>
                <button
                  onClick={handlePinSidebar}
                  className={`p-1 rounded-full  ${
                    isSidebarPinned
                      ? 'bg-sky-500'
                      : 'bg-zinc-700 hover:bg-zinc-600 animate-bounce'
                  }`}
                  title={
                    isSidebarPinned ? 'Desafixar sidebar' : 'Fixar sidebar'
                  }
                >
                  <GoPin className="w-4 h-4" />
                </button>
                <Separator orientation="vertical" />
                <div className="flex items-center justify-center rounded cursor-pointer">
                  <RxExit
                    onClick={handlePowerOffClick}
                    className="w-5 h-5 text-red-500 items-center font-bold justify-center flex"
                  />
                </div>
                {showLogoutCard && (
                  <Logout
                    onCancel={handleCancelLogout}
                    onConfirm={handleConfirmLogout}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {menuNavigation.map(menu => (
          <div key={menu.id} className="mb-2">
            <div
              onClick={() => handleToggleSubmenu(menu.id)}
              className="cursor-pointer flex items-center px-8 py-4 gap-2 text-lg rounded hover:bg-zinc-700"
              title={menu.label}
            >
              <div className="w-10 items-center justify-center flex">
                <p
                  className={`font-bold ${
                    isSidebarCompressed ? 'text-4xl' : 'text-2xl'
                  }`}
                >
                  {menu.icon}
                </p>
              </div>
              {!isSidebarCompressed && (
                <span className="text-xl">{menu.label}</span>
              )}
            </div>
            {openSubmenus[menu.id] &&
              menu.subcategories &&
              renderSubcategories(menu.subcategories)}
          </div>
        ))}
      </div>
    </div>
  )
}
