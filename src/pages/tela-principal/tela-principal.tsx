import Sidebar from '../../components/sidebar/sidebar'
import { HeaderFirstPage } from './header-first-page'

export const TelaPrincipal = () => {
  return (
    <div className="flex flex-col w-full">
      <HeaderFirstPage />
      <Sidebar />
    </div>
  )
}
