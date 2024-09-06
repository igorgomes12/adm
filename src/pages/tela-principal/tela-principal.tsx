import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { TableClientBuy } from "./table-client-buy";
import { menuNavigation } from "@/utils/interface/first-page";
import { SidebarNavigation } from "./sidebar-navigation";


export const TelaPrincipal = () => {
  const [selected, setSelected] = useState(menuNavigation[0].label);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  return (
    <div>
      <div className="flex w-screen bg-gray-500 h-14 items-center px-4 justify-between">
        <a href="/">
          <img
            src="https://liderautomacao.s3.amazonaws.com/site/public/logo.png"
            alt="Lider Automação Logo"
            className="w-40"
          />
        </a>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars className="text-white text-2xl" />
          </button>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {menuNavigation.map((menu, index) => (
            <a
              key={index}
              href={menu.link}
              onClick={() => setSelected(menu.label)}
              className={`text-sm font-medium ${
                selected === menu.label
                  ? 'text-white border-b-2 animate-pulse border-white'
                  : 'text-black hover:text-black'
              } py-2`}
              aria-label={`Navigate to ${menu.label}`}
            >
              {menu.label}
            </a>
          ))}
        </nav>
      </div>

      <SidebarNavigation
        isMenuOpen={isMenuOpen}
        selected={selected}
        setActiveItem={setActiveItem}
      />

      {activeItem === 'Clientes de Venda' && <TableClientBuy />}
    </div>
  );
};


