"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Screen, UserSettings } from "@/app/page"
import { ArrowLeft, Bell, Moon, Globe, Lock, HelpCircle, FileText, Star, ChevronRight, Check, Shield } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface SettingsScreenProps {
  navigateTo: (screen: Screen) => void
  settings: UserSettings
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void
  isAdmin?: boolean
}

export default function SettingsScreen({ navigateTo, settings, onUpdateSettings, isAdmin }: SettingsScreenProps) {
  const [showSavedMessage, setShowSavedMessage] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = (key: keyof UserSettings) => {
    if (typeof settings[key] === "boolean") {
      onUpdateSettings({ [key]: !settings[key] })
      showSavedFeedback()
    }
  }

  const showSavedFeedback = () => {
    setShowSavedMessage(true)
    setTimeout(() => setShowSavedMessage(false), 2000)
  }

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateTo("home")}
            className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Ajustes</h1>
        </div>
      </div>

      {/* Saved Feedback Toast */}
      <div 
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          showSavedMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Cambios guardados</span>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        
        {/* Notifications Section */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            Notificaciones
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Notificaciones push</p>
                <p className="text-xs text-muted-foreground">Recibe alertas de caducidad y recetas</p>
              </div>
              <Switch 
                checked={settings.pushNotifications} 
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>
            
            <div className="h-px bg-border" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Notificaciones por email</p>
                <p className="text-xs text-muted-foreground">Resumen semanal de tu nevera</p>
              </div>
              <Switch 
                checked={settings.emailNotifications} 
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-green-600" />
            Apariencia
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground text-sm">Modo oscuro</p>
                <p className="text-xs text-muted-foreground">Reduce la fatiga visual</p>
              </div>
              {mounted && (
                <Switch 
                  checked={theme === "dark"} 
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light")
                    showSavedFeedback()
                  }}
                />
              )}
            </div>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">Idioma</p>
                  <p className="text-xs text-muted-foreground">{settings.language}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            Seguridad y privacidad
          </h3>
          
          <div className="space-y-3">
            <button className="flex items-center justify-between w-full py-2">
              <p className="font-medium text-foreground text-sm">Cambiar contrasena</p>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center justify-between w-full py-2">
              <p className="font-medium text-foreground text-sm">Politica de privacidad</p>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center justify-between w-full py-2">
              <p className="font-medium text-foreground text-sm">Eliminar cuenta</p>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Admin Section - Only visible for admins */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-4 shadow-sm">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-white" />
              Administracion
            </h3>
            
            <button 
              onClick={() => navigateTo("admin-panel")}
              className="flex items-center justify-between w-full py-2"
            >
              <p className="font-medium text-white text-sm">Panel de Control</p>
              <ChevronRight className="w-5 h-5 text-white/80" />
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-green-600" />
            Ayuda
          </h3>
          
          <div className="space-y-3">
            <button className="flex items-center justify-between w-full py-2">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground text-sm">Centro de ayuda</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="h-px bg-border" />
            
            <button className="flex items-center justify-between w-full py-2">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-muted-foreground" />
                <p className="font-medium text-foreground text-sm">Valorar la app</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-bold text-green-600">SmartBite</span>
          </div>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">2024 SmartBite. Todos los derechos reservados.</p>
        </div>

        {/* Simulation Note */}
        <p className="text-xs text-center text-muted-foreground px-4 pb-4">
          Tus preferencias se guardan automaticamente durante la sesion.
        </p>
      </div>
    </div>
  )
}
