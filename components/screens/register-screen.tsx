"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail, Lock, User, Leaf, Smartphone, ArrowLeft } from "lucide-react"

interface RegisterScreenProps {
  onRegister: (name: string, lastName: string, email: string) => void
  onBackToLogin: () => void
}

export default function RegisterScreen({ onRegister, onBackToLogin }: RegisterScreenProps) {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  // Regex: min 6 chars, at least one uppercase, one lowercase, one digit
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/

  const isFormValid = name && lastName && email && password && PASSWORD_REGEX.test(password)

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (value && !PASSWORD_REGEX.test(value)) {
      setPasswordError("Mínimo 6 caracteres, una mayúscula, una minúscula y un número.")
    } else {
      setPasswordError("")
    }
  }

  const handleRegister = () => {
    if (isFormValid) {
      onRegister(name, lastName, email)
    }
  }

  return (
    <div className="h-full bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-60">
        <div className="w-full h-full bg-green-600 rounded-full blur-xl" />
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-40">
        <div className="w-full h-full bg-red-400 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-8 px-6">
        {/* Back button */}
        <button
          onClick={onBackToLogin}
          className="absolute left-6 top-8 p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-green-700" />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-3">
            <div className="relative">
              <Smartphone className="w-8 h-8 text-green-600" />
              <Leaf className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-700">SmartBite</h1>
        </div>

        {/* Register Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-center text-foreground mb-1">Crear cuenta</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Completa tus datos para empezar a cocinar de forma inteligente.
          </p>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ej. Maria"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12 h-12 rounded-xl border-border bg-muted/30"
              />
            </div>
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Apellidos
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ej. Garcia Lopez"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="pl-12 h-12 rounded-xl border-border bg-muted/30"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Correo electronico
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Ej. maria@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 rounded-xl border-border bg-muted/30"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Contrasena
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 caracteres, mayúscula, minúscula y número"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
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
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Register Button */}
          <Button
            onClick={handleRegister}
            disabled={!isFormValid}
            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Crear cuenta
          </Button>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
            Al registrarte, aceptas nuestros{" "}
            <button className="text-green-600 hover:underline">Terminos de uso</button>
            {" "}y{" "}
            <button className="text-green-600 hover:underline">Politica de privacidad</button>
          </p>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <button 
              onClick={onBackToLogin}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              Inicia sesion
            </button>
          </p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
        <div className="absolute bottom-0 left-4 w-14 h-14 bg-yellow-400 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-8 w-10 h-10 bg-green-500 rounded-full blur-xl" />
        <div className="absolute bottom-2 left-1/3 w-12 h-12 bg-red-400 rounded-full blur-xl" />
      </div>
    </div>
  )
}
