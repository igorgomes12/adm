import { canaisItems } from '@/utils/interface/first-page'
import { FC } from 'react'

type TSidebar = {
  isMenuOpen: boolean
  selected: string
  setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export const SidebarNavigation: FC<TSidebar> = ({ isMenuOpen, selected, setActiveItem }) => {
  return (
    <div>
      {(isMenuOpen || selected === 'Canais') && (
        <div className="flex flex-col bg-gray-100 p-4 md:flex-row md:space-x-4">
          <ul className="flex flex-col md:flex-row md:space-x-4">
            {canaisItems.map((item, index) => (
              <li
                key={index}
                onClick={() => setActiveItem(item.label)}
                className="flex flex-col items-center mb-2 md:mb-0 cursor-pointer"
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <span className="text-sm ">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
