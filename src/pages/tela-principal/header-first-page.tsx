import { Logout } from '@/components/logout/logout'
import { useState } from 'react'
import { FaPowerOff } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export const HeaderFirstPage = () => {
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

  return (
    <div className="relative flex w-full bg-colorProject-blue-light h-14 items-center px-4 justify-between">
      <a href="/">
        <img
          src="https://liderautomacao.s3.amazonaws.com/site/public/logo.png"
          alt="Lider Automação Logo"
          className="w-32 md:w-40"
        />
      </a>
      <div>
        <button onClick={handlePowerOffClick}>
          <FaPowerOff className="text-white text-2xl" />
        </button>
      </div>

      {showLogoutCard && (
        <Logout onCancel={handleCancelLogout} onConfirm={handleConfirmLogout} />
      )}
    </div>
  )
}
