"use client"

import { useState } from "react"
import { Screen } from "@/app/page"
import { AdminUser } from "@/app/page"
import { Recipe } from "@/components/screens/recipe-detail-screen"
import { Bell, Menu, Clock, ChefHat, Check, AlertTriangle, Lightbulb, Search, Trash2, User, Users, ShieldOff, Shield } from "lucide-react"
import SidebarMenu from "@/components/sidebar-menu"

interface AdminStats {
  totalUsers: number
  totalPosts: number
  manualFoods: number
}

interface HomeScreenProps {
  navigateTo: (screen: Screen) => void
  userName: string
  onLogout: () => void
  unreadNotifications: number
  onSelectRecipe: (recipe: Recipe) => void
  profilePhoto: string | null
  isAdmin?: boolean
  users?: AdminUser[]
  onDeleteUser?: (userId: number) => void
  onBlockUser?: (userId: number) => void
  adminStats?: AdminStats
}

const mealSuggestions = [
  { id: 1, name: "Pasta con verduras", time: "20 min", difficulty: "Fácil", hasAllIngredients: true, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop" },
  { id: 2, name: "Pollo al limón con arroz", time: "30 min", difficulty: "Medio", hasAllIngredients: false, missingCount: 1, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop" },
  { id: 3, name: "Tortilla de espinacas", time: "15 min", difficulty: "Fácil", hasAllIngredients: true, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop" },
]

const fridgePreview = [
  { name: "Pollo", icon: "🍗" },
  { name: "Tomate", icon: "🍅" },
  { name: "Lechuga", icon: "🥬" },
  { name: "Zanahoria", icon: "🥕" },
  { name: "Huevos", icon: "🥚" },
]

export default function HomeScreen({ navigateTo, userName, onLogout, unreadNotifications, onSelectRecipe, profilePhoto, isAdmin, users = [], onDeleteUser, onBlockUser, adminStats }: HomeScreenProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [userSearch, setUserSearch] = useState("")
  const [confirmAction, setConfirmAction] = useState<{ type: "delete" | "block"; user: AdminUser } | null>(null)

  // Default users shown when search is empty
  const defaultUsers: AdminUser[] = [
    { id: 99, name: "Sabrina Trygc", email: "sabitrygc1003@gmail.com", blocked: false },
    { id: 97, name: "Maria Garcia", email: "maria@example.com", blocked: false },
    { id: 98, name: "Carlos Lopez", email: "carlos@example.com", blocked: false },
  ]

  const shownUsers = userSearch.trim()
    ? users.filter(u =>
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase())
      )
    : defaultUsers.filter(d => users.some(u => u.email === d.email)).map(d => {
        const live = users.find(u => u.email === d.email)
        return live || d
      })

  const handleConfirm = () => {
    if (!confirmAction) return
    if (confirmAction.type === "delete") onDeleteUser?.(confirmAction.user.id)
    else onBlockUser?.(confirmAction.user.id)
    setConfirmAction(null)
  }

  return (
    <div className="h-full bg-background relative">
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigateTo={navigateTo}
        onLogout={onLogout}
        userName={userName}
        profilePhoto={profilePhoto}
      />

      {/* Header */}
      <div className="px-8 py-4 flex items-center justify-between border-b border-border">
        <button onClick={() => setIsSidebarOpen(true)} className="p-1 hover:bg-muted rounded-full">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Perfil" className="w-9 h-9 rounded-full object-cover border-2 border-green-500" />
          ) : (
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
              <Menu className="w-5 h-5 text-green-600" />
            </div>
          )}
        </button>
        <h1 className="text-lg font-semibold text-foreground">Inicio</h1>
        <button onClick={() => navigateTo("notifications")} className="p-2 hover:bg-muted rounded-lg relative">
          <Bell className="w-6 h-6 text-foreground" />
          {unreadNotifications > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
        </button>
      </div>

      <div className="px-8 py-6 space-y-6 pb-8 max-w-5xl mx-auto w-full">

        {/* Admin Dashboard Stats */}
        {isAdmin && adminStats && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Panel de Administrador</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-green-700" />
                </div>
                <span className="text-2xl font-bold text-green-700">{adminStats.totalUsers}</span>
                <span className="text-xs text-green-600 mt-1 font-medium">Usuarios</span>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <span className="text-2xl font-bold text-blue-700">{adminStats.totalPosts}</span>
                <span className="text-xs text-blue-600 mt-1 font-medium">Comentarios</span>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-4 flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <span className="text-2xl font-bold text-amber-700">{adminStats.manualFoods}</span>
                <span className="text-xs text-amber-600 mt-1 font-medium">Alimentos Manuales</span>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold">{`¡Hola, ${userName || "Usuario"}! 👋`}</h2>
            <p className="text-green-100 mt-1 text-sm">¿Qué te apetece cocinar hoy?</p>
            <p className="text-green-100/80 text-xs mt-2">Te mostramos recetas deliciosas con lo que tienes en tu nevera.</p>
          </div>
          <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8" />
          <div className="absolute right-4 bottom-2 w-16 h-16 opacity-80">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop" alt="Ensalada" className="w-full h-full object-cover rounded-full" crossOrigin="anonymous" />
          </div>
        </div>

        {/* Meal Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Sugerencias para ti</h3>
            <button onClick={() => navigateTo("recipes")} className="text-sm text-green-600 font-medium hover:text-green-700">Ver todas</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealSuggestions.map((meal) => (
              <div
                key={meal.id}
                onClick={() => onSelectRecipe({ id: meal.id, name: meal.name, time: meal.time, difficulty: meal.difficulty, ingredients: ["🥗", "🍅", "🥬", "🧅"], image: meal.image, liked: false })}
                className="bg-card rounded-xl shadow-sm border border-border overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative h-24">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm text-foreground line-clamp-2">{meal.name}</h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{meal.time}</span>
                    <span className="flex items-center gap-1"><ChefHat className="w-3 h-3" />{meal.difficulty}</span>
                  </div>
                  <div className="mt-2">
                    {meal.hasAllIngredients ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"><Check className="w-3 h-3" />Tienes todo</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full"><AlertTriangle className="w-3 h-3" />Te falta {meal.missingCount} ingrediente</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fridge Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Lo que tienes en la nevera</h3>
            <button onClick={() => navigateTo("fridge")} className="text-sm text-green-600 font-medium hover:text-green-700">Ver todo</button>
          </div>
          <div className="flex items-center gap-3">
            {fridgePreview.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center text-2xl">{item.icon}</div>
                <span className="text-xs text-muted-foreground mt-1">{item.name}</span>
              </div>
            ))}
            <div onClick={() => navigateTo("fridge")} className="flex flex-col items-center cursor-pointer">
              <div className="w-14 h-14 bg-green-50 border-2 border-dashed border-green-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">+8<br />más</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tip of the day */}
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">Consejo del día</h4>
              <p className="text-sm text-muted-foreground mt-1">{"Planifica tus comidas y evita desperdiciar alimentos. ¡Tu bolsillo y el planeta te lo agradecerán! 🌍"}</p>
            </div>
          </div>
        </div>

        {/* User Search */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Buscar usuarios</h3>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Buscar por nombre o email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="space-y-2">
            {shownUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No se encontraron usuarios</p>
            ) : (
              shownUsers.map((user) => (
                <div key={user.id} className={`bg-card rounded-xl border p-3 flex items-center justify-between ${user.blocked ? "border-red-200 bg-red-50/30" : "border-border"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${user.blocked ? "bg-red-100" : "bg-green-100"}`}>
                      <User className={`w-4 h-4 ${user.blocked ? "text-red-500" : "text-green-600"}`} />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {user.blocked && <span className="text-xs text-red-500 font-medium">Cuenta bloqueada</span>}
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => setConfirmAction({ type: "block", user })}
                        className={`p-2 rounded-lg transition-colors ${user.blocked ? "hover:bg-green-50 text-green-500 hover:text-green-700" : "hover:bg-amber-50 text-amber-400 hover:text-amber-600"}`}
                        title={user.blocked ? "Desbloquear" : "Bloquear"}
                      >
                        {user.blocked ? <Shield className="w-4 h-4" /> : <ShieldOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setConfirmAction({ type: "delete", user })}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {confirmAction && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmAction.type === "delete" ? "bg-red-100" : "bg-amber-100"}`}>
              {confirmAction.type === "delete" ? <Trash2 className="w-6 h-6 text-red-600" /> : <ShieldOff className="w-6 h-6 text-amber-600" />}
            </div>
            <h3 className="text-lg font-semibold text-center text-foreground mb-2">
              {confirmAction.type === "delete" ? "Eliminar usuario" : confirmAction.user.blocked ? "Desbloquear cuenta" : "Bloquear cuenta"}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-1 font-medium">{confirmAction.user.name}</p>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {confirmAction.type === "delete"
                ? "¿Estás seguro de que deseas eliminar este elemento? Esta acción es permanente."
                : confirmAction.user.blocked
                  ? "¿Deseas restaurar el acceso de este usuario?"
                  : "¿Estás seguro de que deseas bloquear esta cuenta? El usuario no podrá iniciar sesión."}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmAction(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancelar</button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${confirmAction.type === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-amber-500 hover:bg-amber-600"}`}
              >
                {confirmAction.type === "delete" ? "Eliminar" : confirmAction.user.blocked ? "Desbloquear" : "Bloquear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
