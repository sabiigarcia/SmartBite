"use client"

import { useState, useEffect } from "react"
import { Leaf, Smartphone, Check } from "lucide-react"

interface GmailLoginScreenProps {
  onComplete: (name: string, email: string) => void
  onCancel: () => void
}

export default function GmailLoginScreen({ onComplete, onCancel }: GmailLoginScreenProps) {
  const [stage, setStage] = useState<"connecting" | "selecting" | "authenticating" | "complete">("connecting")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate Gmail login flow
    const timer1 = setTimeout(() => {
      setStage("selecting")
      setProgress(33)
    }, 1200)

    const timer2 = setTimeout(() => {
      setStage("authenticating")
      setProgress(66)
    }, 2800)

    const timer3 = setTimeout(() => {
      setStage("complete")
      setProgress(100)
    }, 4200)

    const timer4 = setTimeout(() => {
      onComplete("Sabrina", "sabitry@gmail.com")
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  const getStatusText = () => {
    switch (stage) {
      case "connecting":
        return "Conectando con Google..."
      case "selecting":
        return "Seleccionando cuenta..."
      case "authenticating":
        return "Verificando credenciales..."
      case "complete":
        return "Sesion iniciada correctamente"
    }
  }

  const getSubText = () => {
    switch (stage) {
      case "connecting":
        return "Estableciendo conexion segura"
      case "selecting":
        return "sabitry@gmail.com"
      case "authenticating":
        return "Autenticando con Google"
      case "complete":
        return "Bienvenida, Sabrina"
    }
  }

  return (
    <div className="h-full bg-white relative overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancelar
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Google Logo */}
        <div className="mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
            stage === "complete" ? "bg-green-100" : "bg-gray-100"
          }`}>
            {stage === "complete" ? (
              <Check className="w-12 h-12 text-green-600" />
            ) : (
              <svg className="w-14 h-14" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Status */}
        <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
          stage === "complete" ? "text-green-600" : "text-foreground"
        }`}>
          {getStatusText()}
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          {getSubText()}
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-3">
            {stage === "complete" ? "Completado" : "Iniciando sesion..."}
          </p>
        </div>

        {/* Simulated account selection */}
        {stage === "selecting" && (
          <div className="mt-8 w-full max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gray-50 rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <p className="font-medium text-foreground">Sabrina</p>
                  <p className="text-sm text-muted-foreground">sabitry@gmail.com</p>
                </div>
                <Check className="w-5 h-5 text-blue-500 ml-auto" />
              </div>
            </div>
          </div>
        )}

        {/* Simulation note */}
        <div className="mt-12 bg-blue-50 rounded-xl p-4 max-w-xs">
          <p className="text-xs text-blue-600 text-center">
            Simulacion de inicio de sesion con Google. No se realiza autenticacion real.
          </p>
        </div>
      </div>

      {/* SmartBite branding */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-sm font-medium">SmartBite</span>
        </div>
      </div>
    </div>
  )
}
