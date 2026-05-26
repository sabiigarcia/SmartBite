"use client"

import { useEffect, useState } from "react"
import { Screen } from "@/app/page"
import { Utensils } from "lucide-react"

interface GeneratingDietScreenProps {
  navigateTo: (screen: Screen) => void
}

export default function GeneratingDietScreen({ navigateTo }: GeneratingDietScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => navigateTo("diet-ready"), 500)
          return 100
        }
        return newProgress
      })
    }, 60)

    return () => clearInterval(interval)
  }, [navigateTo])

  return (
    <div className="h-full bg-green-600 flex flex-col items-center justify-center px-8">
      {/* Step indicator */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">5. Generando dieta...</span>
      </div>

      {/* Animated icon */}
      <div className="relative mb-8">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 w-32 h-32 border-4 border-white/30 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
        
        {/* Progress circle */}
        <div className="w-32 h-32 relative">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="6"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.83} 283`}
              className="transition-all duration-100"
            />
          </svg>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Utensils className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        Creando tu dieta personalizada...
      </h2>
      <p className="text-white/80 text-center text-sm max-w-xs">
        Basada en los alimentos disponibles
      </p>

      {/* Progress percentage */}
      <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-white font-semibold">{progress}%</span>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Simulation note */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <p className="text-xs text-white/60 text-center">
          Simulacion del proceso de generacion de dieta
        </p>
      </div>
    </div>
  )
}
