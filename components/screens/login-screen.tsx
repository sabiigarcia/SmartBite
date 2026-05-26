"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, Leaf, Smartphone } from "lucide-react"

interface LoginScreenProps {
  onLogin: (email: string, adminFlag?: boolean) => void
  onGoToRegister: () => void
  onBack?: () => void
  onForgotPassword?: () => void
  resetPassword?: string | null
}

export default function LoginScreen({ onLogin, onGoToRegister, onBack, onForgotPassword, resetPassword }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const ADMIN_EMAIL = "admin@smartbite.com"
  const ADMIN_PASSWORD = "admin123"

  const handleLogin = () => {
    if (!email || !password) return
    setErrorMsg("")

    // Admin account — strict password check
    if (email === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) {
        setErrorMsg("Contraseña incorrecta.")
        return
      }
      onLogin(email, true)
      return
    }

    // If user previously reset their password, validate against the new one
    if (resetPassword !== null && resetPassword !== undefined) {
      if (password !== resetPassword) {
        setErrorMsg("Contraseña incorrecta. Usa la contraseña que restableciste.")
        return
      }
      onLogin(email)
      return
    }

    // Any other user: accept any password
    onLogin(email)
  }

  return (
    <div className="h-full bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Decorative vegetables */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-60">
        <div className="w-full h-full bg-green-600 rounded-full blur-xl" />
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-40">
        <div className="w-full h-full bg-red-400 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-4 px-6">
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className="self-start mb-4 flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        )}
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4">
            <div className="relative">
              <Smartphone className="w-10 h-10 text-green-600" />
              <Leaf className="w-5 h-5 text-green-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-700">SmartBite</h1>
          <p className="text-muted-foreground text-sm mt-1">Come inteligente, aprovecha lo que tienes.</p>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-center text-foreground mb-1">Iniciar sesión</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Accede para guardar tus alimentos y obtener recetas personalizadas.
          </p>

          {/* Email Input */}
          <div className="relative mb-4">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-12 rounded-xl border-border bg-muted/30"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 pr-12 h-12 rounded-xl border-border bg-muted/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Recordarme
              </label>
            </div>
            <button 
              onClick={onForgotPassword}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              ¿Olvidaste tu contrasena?
            </button>
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="text-sm text-red-500 text-center mb-3">{errorMsg}</p>
          )}

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Iniciar sesión
          </Button>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <button 
              onClick={onGoToRegister}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              Registrate
            </button>
          </p>
        </div>
      </div>

      {/* Bottom vegetables decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <div className="absolute bottom-0 left-4 w-16 h-16 bg-yellow-400 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-8 w-12 h-12 bg-green-500 rounded-full blur-xl" />
        <div className="absolute bottom-2 left-1/3 w-14 h-14 bg-red-400 rounded-full blur-xl" />
      </div>
    </div>
  )
}
