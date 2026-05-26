"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

interface AppleLoginScreenProps {
  onComplete: (name: string) => void
  onCancel: () => void
}

export default function AppleLoginScreen({ onComplete, onCancel }: AppleLoginScreenProps) {
  const [stage, setStage] = useState<"connecting" | "authenticating" | "success">("connecting")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simular proceso de autenticacion con Apple
    const timer1 = setTimeout(() => {
      setStage("authenticating")
    }, 1500)

    const timer2 = setTimeout(() => {
      setStage("success")
    }, 3500)

    const timer3 = setTimeout(() => {
      onComplete("Sabrina")
    }, 5000)

    // Animacion de progreso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 80)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={onCancel}
          className="text-green-600 font-medium text-base"
        >
          Cancelar
        </button>
        <span className="text-sm text-muted-foreground">apple.com</span>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Apple Logo */}
        <div className="mb-8">
          <svg className="w-16 h-16 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 16.97 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
          </svg>
        </div>

        {/* Status */}
        <div className="text-center mb-8">
          {stage === "connecting" && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Conectando con Apple
              </h2>
              <p className="text-muted-foreground">
                Estableciendo conexion segura...
              </p>
            </>
          )}
          {stage === "authenticating" && (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Iniciando sesion con Apple
              </h2>
              <p className="text-muted-foreground">
                sabitry@gmail.com
              </p>
            </>
          )}
          {stage === "success" && (
            <>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Sesion iniciada
              </h2>
              <p className="text-muted-foreground">
                Redirigiendo a SmartBite...
              </p>
            </>
          )}
        </div>

        {/* Progress indicator */}
        {stage !== "success" && (
          <div className="w-full max-w-xs">
            {/* Circular loader */}
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#16a34a"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">{progress}%</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-green-600 h-1.5 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Security note */}
        <div className="mt-12 flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Conexion segura con Apple</span>
        </div>

        {/* Simulation note */}
        <p className="mt-6 text-xs text-muted-foreground/60 text-center max-w-xs">
          Esta es una simulacion del proceso de inicio de sesion con Apple ID para fines de prototipo.
        </p>
      </div>
    </div>
  )
}
