import Sidebar from '@/components/sidebar/sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
