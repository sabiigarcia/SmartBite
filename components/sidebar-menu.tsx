"use client"

import { Screen } from "@/app/page"
import { X, User, Settings, LogOut, HeartHandshake } from "lucide-react"
import { useEffect } from "react"

interface SidebarMenuProps {
  isOpen: boolean
  onClose: () => void
  navigateTo: (screen: Screen) => void
  onLogout: () => void
  userName: string
  profilePhoto: string | null
}

const menuItems = [
  { id: "profile", label: "Perfil", icon: User, screen: "profile" as Screen },
  { id: "settings", label: "Ajustes", icon: Settings, screen: "settings" as Screen },
  { id: "favorites", label: "Favoritos y Guardados", icon: HeartHandshake, screen: "favorites" as Screen },
]

export default function SidebarMenu({ isOpen, onClose, navigateTo, onLogout, userName, profilePhoto }: SidebarMenuProps) {
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const handleNavigation = (screen: Screen) => {
    navigateTo(screen)
    onClose()
  }

  const handleLogout = () => {
    onClose()
    onLogout()
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`absolute top-0 left-0 h-full w-[280px] bg-card z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 px-5 pt-12 pb-6">
          <button 
            onClick={onClose}
            className="absolute top-10 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-4">
            {profilePhoto ? (
              <img 
                src={profilePhoto} 
                alt="Perfil" 
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-green-600">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
            )}
            <div>
              <h3 className="text-white font-bold text-lg">{userName || "Usuario"}</h3>
              <p className="text-green-100 text-sm">Bienvenido</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.screen)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-foreground hover:bg-green-50 hover:text-green-600 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-green-600" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer Section - Separated visually */}
        <div className="mt-auto border-t border-border">
          {/* SmartBite Branding */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-green-600">SmartBite</span>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-border" />

          {/* Logout Button */}
          <div className="px-3 py-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <span className="font-medium">Cerrar sesion</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
