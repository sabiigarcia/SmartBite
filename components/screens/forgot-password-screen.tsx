"use client"

import { useState } from "react"
import { Screen } from "@/app/page"
import { ChevronLeft, Mail, Check, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ForgotPasswordScreenProps {
  navigateTo: (screen: Screen) => void
  onBackToLogin: () => void
  onPasswordReset?: (newPassword: string) => void
}

export default function ForgotPasswordScreen({ navigateTo, onBackToLogin, onPasswordReset }: ForgotPasswordScreenProps) {
  const [step, setStep] = useState<"email" | "sent" | "reset" | "success">("email")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const handleSendEmail = () => {
    if (email) {
      setStep("sent")
      // Simular envio de email
      setTimeout(() => setStep("reset"), 2000)
    }
  }

  const handleResetPassword = () => {
    setPasswordError("")
    if (newPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.")
      return
    }
    if (newPassword !== confirmPassword) return
    onPasswordReset?.(newPassword)
    setStep("success")
  }

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-border">
        <button 
          onClick={onBackToLogin}
          className="p-2 hover:bg-muted rounded-lg -ml-2"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Recuperar contrasena</h1>
      </div>

      <div className="px-6 py-8">
        {step === "email" && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Olvidaste tu contrasena?</h2>
              <p className="text-sm text-muted-foreground">
                Introduce tu correo electronico y te enviaremos instrucciones para restablecer tu contrasena.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Correo electronico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-xl"
                  />
                </div>
              </div>

              <Button
                onClick={handleSendEmail}
                disabled={!email}
                className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Enviar instrucciones
              </Button>
            </div>
          </div>
        )}

        {step === "sent" && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Enviando email...</h2>
            <p className="text-sm text-muted-foreground">
              Estamos enviando las instrucciones a {email}
            </p>
          </div>
        )}

        {step === "reset" && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Nueva contrasena</h2>
              <p className="text-sm text-muted-foreground">
                Introduce tu nueva contrasena. Asegurate de que sea segura.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nueva contrasena
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimo 8 caracteres"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Confirmar contrasena
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contrasena"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Las contrasenas no coinciden</p>
                )}
              </div>

              <Button
                onClick={handleResetPassword}
                disabled={!newPassword || newPassword !== confirmPassword || newPassword.length < 8}
                className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Restablecer contrasena
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Contrasena actualizada</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tu contrasena se ha restablecido correctamente. Ya puedes iniciar sesion.
            </p>
            <Button
              onClick={onBackToLogin}
              className="h-12 px-8 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Volver al inicio de sesion
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
