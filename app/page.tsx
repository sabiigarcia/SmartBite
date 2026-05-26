"use client"

import { useState, useEffect } from "react"
import WelcomeScreen from "@/components/screens/welcome-screen"
import LoginScreen from "@/components/screens/login-screen"
import AppleLoginScreen from "@/components/screens/apple-login-screen"
import GmailLoginScreen from "@/components/screens/gmail-login-screen"
import RegisterScreen from "@/components/screens/register-screen"
import HomeScreen from "@/components/screens/home-screen"
import FridgeScreen from "@/components/screens/fridge-screen"
import AddFoodScreen from "@/components/screens/add-food-screen"
import CameraScreen from "@/components/screens/camera-screen"
import AnalyzingScreen from "@/components/screens/analyzing-screen"
import ResultsScreen from "@/components/screens/results-screen"
import GeneratingDietScreen from "@/components/screens/generating-diet-screen"
import DietReadyScreen, { PublishedDiet } from "@/components/screens/diet-ready-screen"
import RecipesScreen from "@/components/screens/recipes-screen"
import RecipeDetailScreen, { Recipe } from "@/components/screens/recipe-detail-screen"
import ShoppingListScreen from "@/components/screens/shopping-list-screen"
import NotificationsScreen from "@/components/screens/notifications-screen"
import ProfileScreen from "@/components/screens/profile-screen"
import SettingsScreen from "@/components/screens/settings-screen"
import FavoritesScreen from "@/components/screens/favorites-screen"
import SavedScreen from "@/components/screens/saved-screen"
import AdminPanelScreen from "@/components/screens/admin-panel-screen"
import ForgotPasswordScreen from "@/components/screens/forgot-password-screen"
import SideNavigation from "@/components/bottom-navigation"

export type Screen =
  | "welcome"
  | "login"
  | "gmail-login"
  | "apple-login"
  | "register"
  | "home"
  | "fridge"
  | "add-food"
  | "camera"
  | "analyzing"
  | "results"
  | "generating-diet"
  | "diet-ready"
  | "recipes"
  | "recipe-detail"
  | "shopping-list"
  | "notifications"
  | "profile"
  | "settings"
  | "favorites"
  | "saved"
  | "admin-panel"
  | "forgot-password"

const initialNotifications = [
  { id: 1, type: "expiring" as const, title: "Alimentos por caducar", description: "El yogur natural caduca en 2 dias.", time: "Hace 1 hora", read: false, target: "fridge" as Screen },
  { id: 2, type: "recipe" as const, title: "Nueva receta recomendada", description: "Ensalada mediterranea.", time: "Hace 3 horas", read: false, target: "recipes" as Screen },
  { id: 3, type: "diet" as const, title: "Tu dieta semanal esta lista", description: "Nuevo menu basado en tu nevera.", time: "Hace 5 horas", read: false, target: "recipes" as Screen },
  { id: 4, type: "update" as const, title: "Actualiza tu nevera", description: "Hace una semana que no actualizas.", time: "Ayer", read: true, target: "camera" as Screen },
  { id: 5, type: "expiring" as const, title: "Pollo proximo a caducar", description: "La pechuga caduca manana.", time: "Ayer", read: true, target: "fridge" as Screen },
]

export type Notification = typeof initialNotifications[number]

export interface UserSettings {
  pushNotifications: boolean
  emailNotifications: boolean
  darkMode: boolean
  language: string
}

const initialSettings: UserSettings = {
  pushNotifications: true,
  emailNotifications: false,
  darkMode: false,
  language: "Espanol"
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  birthDate: string
  profilePhoto: string | null
}

const initialProfile: UserProfile = {
  name: "Usuario",
  email: "usuario@smartbite.com",
  phone: "+34 612 345 678",
  location: "Madrid, Espana",
  birthDate: "15/03/1990",
  profilePhoto: null
}

export interface Comment {
  id: number
  user: string
  avatar: string
  text: string
  time: string
  reported?: boolean
  reportReason?: string
}

const initialComments: Record<number, Comment[]> = {
  1: [
    { id: 1, user: "Maria Garcia", avatar: "M", text: "Me encanto esta receta!", time: "Hace 2 horas" },
    { id: 2, user: "Carlos Lopez", avatar: "C", text: "Muy facil de hacer.", time: "Hace 1 dia" },
  ],
  2: [{ id: 1, user: "Ana Martinez", avatar: "A", text: "El pollo quedo muy jugoso.", time: "Hace 3 horas" }],
  3: [{ id: 1, user: "Pedro Sanchez", avatar: "P", text: "La tortilla perfecta!", time: "Hace 5 horas", reported: true, reportReason: "Contenido inapropiado" }],
}

export interface AdminUser {
  id: number
  name: string
  email: string
  blocked: boolean
  reported: boolean
  reportReason?: string
}

const initialAdminUsers: AdminUser[] = [
  { id: 1, name: "Sabrina Trygc", email: "sabitrygc1003@gmail.com", blocked: false, reported: false },
  { id: 2, name: "Maria Garcia", email: "maria@example.com", blocked: false, reported: false },
  { id: 3, name: "Carlos Lopez", email: "carlos@example.com", blocked: false, reported: true, reportReason: "Contenido inapropiado" },
  { id: 4, name: "Ana Martinez", email: "ana@example.com", blocked: true, reported: true, reportReason: "Spam" },
  { id: 5, name: "Pedro Sanchez", email: "pedro@example.com", blocked: false, reported: false },
]

// Manual foods log (foods users typed manually when not detected)
export interface ManualFood {
  id: number
  name: string
  addedBy: string
  date: string
}

const initialManualFoods: ManualFood[] = [
  { id: 1, name: "Kimchi", addedBy: "maria@example.com", date: "18/05/2026" },
  { id: 2, name: "Tahini", addedBy: "carlos@example.com", date: "17/05/2026" },
  { id: 3, name: "Miso", addedBy: "sabitrygc1003@gmail.com", date: "16/05/2026" },
]

const NO_NAV_SCREENS: Screen[] = [
  "welcome", "login", "gmail-login", "apple-login", "register",
  "camera", "analyzing", "results", "generating-diet", "diet-ready",
  "add-food", "notifications", "profile", "settings",
  "recipe-detail", "favorites", "saved", "admin-panel", "forgot-password"
]

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export default function SmartBiteApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [notifications, setNotifications] = useState(initialNotifications)
  const [userSettings, setUserSettings] = useState<UserSettings>(initialSettings)
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [previousScreen, setPreviousScreen] = useState<Screen>("home")
  const [recipeComments, setRecipeComments] = useState<Record<number, Comment[]>>(initialComments)
  const [isAdmin, setIsAdmin] = useState(false)
  const [likedRecipes, setLikedRecipes] = useState<number[]>(() => loadFromStorage("sb_liked", []))
  const [savedRecipes, setSavedRecipes] = useState<number[]>(() => loadFromStorage("sb_saved", []))
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers)
  const [manualFoods, setManualFoods] = useState<ManualFood[]>(initialManualFoods)
  const [resetPassword, setResetPassword] = useState<string | null>(null)
  const [publishedDiets, setPublishedDiets] = useState<PublishedDiet[]>([])

  const handlePublishDiet = (diet: PublishedDiet) => {
    setPublishedDiets(prev => [diet, ...prev])
  }

  const handleDeleteDiet = (id: number) => {
    setPublishedDiets(prev => prev.filter(d => d.id !== id))
  }

  useEffect(() => { saveToStorage("sb_liked", likedRecipes) }, [likedRecipes])
  useEffect(() => { saveToStorage("sb_saved", savedRecipes) }, [savedRecipes])

  const getCommentsForRecipe = (recipeId: number): Comment[] => recipeComments[recipeId] || []

  const addCommentToRecipe = (recipeId: number, comment: Comment) => {
    setRecipeComments(prev => ({ ...prev, [recipeId]: [comment, ...(prev[recipeId] || [])] }))
  }

  const deleteComment = (recipeId: number, commentId: number) => {
    setRecipeComments(prev => ({ ...prev, [recipeId]: (prev[recipeId] || []).filter(c => c.id !== commentId) }))
  }

  const reportComment = (recipeId: number, commentId: number) => {
    setRecipeComments(prev => ({
      ...prev,
      [recipeId]: (prev[recipeId] || []).map(c =>
        c.id === commentId ? { ...c, reported: true, text: "[Comentario ocultado por moderación]" } : c
      )
    }))
  }

  const handleSelectRecipe = (recipe: Recipe, fromScreen: Screen) => {
    setSelectedRecipe(recipe)
    setPreviousScreen(fromScreen)
    setCurrentScreen("recipe-detail")
  }

  const toggleLikedRecipe = (recipeId: number) => {
    setLikedRecipes(prev => prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId])
  }

  const toggleSavedRecipe = (recipeId: number) => {
    setSavedRecipes(prev => prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId])
  }

  const deleteAdminUser = (userId: number) => setAdminUsers(prev => prev.filter(u => u.id !== userId))

  const blockAdminUser = (userId: number) => {
    setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, blocked: !u.blocked } : u))
  }

  const reportAdminUser = (userId: number, reason: string) => {
    setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, reported: true, reportReason: reason } : u))
  }

  const dismissUserReport = (userId: number) => {
    setAdminUsers(prev => prev.map(u => u.id === userId ? { ...u, reported: false, reportReason: undefined } : u))
  }

  const reportAdminComment = (recipeId: number, commentId: number, reason: string) => {
    setRecipeComments(prev => ({
      ...prev,
      [recipeId]: (prev[recipeId] || []).map(c =>
        c.id === commentId ? { ...c, reported: true, reportReason: reason } : c
      )
    }))
  }

  const dismissCommentReport = (recipeId: number, commentId: number) => {
    setRecipeComments(prev => ({
      ...prev,
      [recipeId]: (prev[recipeId] || []).map(c =>
        c.id === commentId ? { ...c, reported: false, reportReason: undefined } : c
      )
    }))
  }

  const addManualFood = (name: string, email: string) => {
    setManualFoods(prev => [{ id: Date.now(), name, addedBy: email, date: new Date().toLocaleDateString("es-ES") }, ...prev])
  }

  const updateSettings = (s: Partial<UserSettings>) => setUserSettings(prev => ({ ...prev, ...s }))

  const updateProfile = (p: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...p }))
    if (p.name) setUserName(p.name)
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllNotificationsAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  const handleLogin = (email: string, adminFlag?: boolean) => {
    const name = email.split("@")[0] || "Usuario"
    const formatted = adminFlag ? "Administrador" : (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    setUserName(formatted)
    setUserProfile(prev => ({ ...prev, name: formatted, email }))
    setIsAdmin(adminFlag ?? false)
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleRegister = (name: string, lastName: string, email: string) => {
    const fn = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const ln = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
    setUserName(fn)
    setUserProfile(prev => ({ ...prev, name: fn + " " + ln, email }))
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleAppleLogin = (name: string) => { setUserName(name); setIsLoggedIn(true); setCurrentScreen("home") }

  const handleGmailLogin = (name: string, email: string) => {
    setUserName(name)
    setUserProfile(prev => ({ ...prev, name, email }))
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleLogout = () => { setIsLoggedIn(false); setUserName(""); setIsAdmin(false); setCurrentScreen("welcome") }

  const navigateTo = (screen: Screen) => setCurrentScreen(screen)

  const showNavigation = isLoggedIn && !NO_NAV_SCREENS.includes(currentScreen)

  // Stats for admin dashboard
  const totalPosts = Object.values(recipeComments).reduce((acc, arr) => acc + arr.length, 0)
  const adminStats = {
    totalUsers: adminUsers.length,
    totalPosts,
    manualFoods: manualFoods.length,
  }

  return (
    <div className="min-h-screen bg-background flex">
      {showNavigation && (
        <SideNavigation currentScreen={currentScreen} navigateTo={navigateTo} />
      )}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {currentScreen === "welcome" && (
            <WelcomeScreen
              onEmailLogin={() => setCurrentScreen("login")}
              onGmailLogin={() => setCurrentScreen("gmail-login")}
              onAppleLogin={() => setCurrentScreen("apple-login")}
            />
          )}
          {currentScreen === "login" && (
            <LoginScreen
              onLogin={(email, adminFlag) => handleLogin(email, adminFlag)}
              onGoToRegister={() => setCurrentScreen("register")}
              onBack={() => setCurrentScreen("welcome")}
              onForgotPassword={() => setCurrentScreen("forgot-password")}
              resetPassword={resetPassword}
            />
          )}
          {currentScreen === "gmail-login" && (
            <GmailLoginScreen onComplete={handleGmailLogin} onCancel={() => setCurrentScreen("welcome")} />
          )}
          {currentScreen === "apple-login" && (
            <AppleLoginScreen onComplete={handleAppleLogin} onCancel={() => setCurrentScreen("welcome")} />
          )}
          {currentScreen === "register" && (
            <RegisterScreen onRegister={handleRegister} onBackToLogin={() => setCurrentScreen("login")} />
          )}
          {currentScreen === "home" && (
            <HomeScreen
              navigateTo={navigateTo}
              userName={userName}
              onLogout={handleLogout}
              unreadNotifications={unreadCount}
              onSelectRecipe={(recipe) => handleSelectRecipe(recipe, "home")}
              profilePhoto={userProfile.profilePhoto}
              isAdmin={isAdmin}
              users={adminUsers}
              onDeleteUser={deleteAdminUser}
              onBlockUser={blockAdminUser}
              adminStats={isAdmin ? adminStats : undefined}
            />
          )}
          {currentScreen === "fridge" && <FridgeScreen navigateTo={navigateTo} />}
          {currentScreen === "add-food" && <AddFoodScreen navigateTo={navigateTo} />}
          {currentScreen === "camera" && <CameraScreen navigateTo={navigateTo} />}
          {currentScreen === "analyzing" && <AnalyzingScreen navigateTo={navigateTo} />}
          {currentScreen === "results" && <ResultsScreen navigateTo={navigateTo} />}
          {currentScreen === "generating-diet" && <GeneratingDietScreen navigateTo={navigateTo} />}
          {currentScreen === "diet-ready" && <DietReadyScreen navigateTo={navigateTo} onPublishDiet={handlePublishDiet} />}
          {currentScreen === "recipes" && (
            <RecipesScreen
              navigateTo={navigateTo}
              onSelectRecipe={(recipe) => handleSelectRecipe(recipe, "recipes")}
            />
          )}
          {currentScreen === "recipe-detail" && (
            <RecipeDetailScreen
              navigateTo={navigateTo}
              recipe={selectedRecipe}
              onBack={() => setCurrentScreen(previousScreen)}
              comments={selectedRecipe ? getCommentsForRecipe(selectedRecipe.id) : []}
              onAddComment={(comment) => selectedRecipe && addCommentToRecipe(selectedRecipe.id, comment)}
              onDeleteComment={(commentId) => selectedRecipe && deleteComment(selectedRecipe.id, commentId)}
              onReportComment={(commentId) => selectedRecipe && reportComment(selectedRecipe.id, commentId)}
              isAdmin={isAdmin}
              likedRecipes={likedRecipes}
              savedRecipes={savedRecipes}
              onToggleLike={toggleLikedRecipe}
              onToggleSave={toggleSavedRecipe}
            />
          )}
          {currentScreen === "shopping-list" && <ShoppingListScreen navigateTo={navigateTo} />}
          {currentScreen === "notifications" && (
            <NotificationsScreen
              navigateTo={navigateTo}
              notifications={notifications}
              onMarkAsRead={markNotificationAsRead}
              onMarkAllAsRead={markAllNotificationsAsRead}
            />
          )}
          {currentScreen === "profile" && (
            <ProfileScreen navigateTo={navigateTo} profile={userProfile} onUpdateProfile={updateProfile} publishedDiets={publishedDiets} onDeleteDiet={handleDeleteDiet} />
          )}
          {currentScreen === "settings" && (
            <SettingsScreen
              navigateTo={navigateTo}
              settings={userSettings}
              onUpdateSettings={updateSettings}
              isAdmin={isAdmin}
            />
          )}
          {currentScreen === "favorites" && (
            <FavoritesScreen
              navigateTo={navigateTo}
              likedRecipes={likedRecipes}
              onToggleLike={toggleLikedRecipe}
              onSelectRecipe={(recipe) => handleSelectRecipe(recipe, "favorites")}
              savedRecipes={savedRecipes}
              onToggleSave={toggleSavedRecipe}
            />
          )}
          {currentScreen === "saved" && (
            <SavedScreen
              navigateTo={navigateTo}
              savedRecipes={savedRecipes}
              onToggleSave={toggleSavedRecipe}
              onSelectRecipe={(recipe) => handleSelectRecipe(recipe, "saved")}
            />
          )}
          {currentScreen === "admin-panel" && (
            <AdminPanelScreen
              navigateTo={navigateTo}
              users={adminUsers}
              comments={recipeComments}
              manualFoods={manualFoods}
              onDeleteUser={deleteAdminUser}
              onBlockUser={blockAdminUser}
              onDeleteComment={deleteComment}
              onReportUser={reportAdminUser}
              onDismissUserReport={dismissUserReport}
              onReportComment={reportAdminComment}
              onDismissCommentReport={dismissCommentReport}
              adminStats={adminStats}
            />
          )}
          {currentScreen === "forgot-password" && (
            <ForgotPasswordScreen navigateTo={navigateTo} onBackToLogin={() => setCurrentScreen("login")} onPasswordReset={(pwd) => setResetPassword(pwd)} />
          )}
        </div>
      </div>
    </div>
  )
}
