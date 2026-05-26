"use client"

import { Screen } from "@/app/page"
import { Home, Refrigerator, Plus, BookOpen, ShoppingCart, Leaf } from "lucide-react"

interface BottomNavigationProps {
  currentScreen: Screen
  navigateTo: (screen: Screen) => void
}

const navItems = [
  { id: "home" as Screen, label: "Inicio", icon: Home },
  { id: "fridge" as Screen, label: "Mi nevera", icon: Refrigerator },
  { id: "camera" as Screen, label: "Analizar nevera", icon: Plus, isMain: true },
  { id: "recipes" as Screen, label: "Recetas", icon: BookOpen },
  { id: "shopping-list" as Screen, label: "Lista de compra", icon: ShoppingCart },
]

export default function BottomNavigation({ currentScreen, navigateTo }: BottomNavigationProps) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-border">
        <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-green-700">SmartBite</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id

          if (item.isMain) {
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 my-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span>{item.label}</span>
              </button>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-green-50 text-green-700 font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive ? "bg-green-100" : "bg-muted"
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? "text-green-600" : ""}`} />
              </div>
              <span className="text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Come inteligente,<br />aprovecha lo que tienes.</p>
      </div>
    </aside>
  )
}
