"use client"

import { useEffect, useState } from "react"
import { Screen } from "@/app/page"

interface AnalyzingScreenProps {
  navigateTo: (screen: Screen) => void
}

export default function AnalyzingScreen({ navigateTo }: AnalyzingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => navigateTo("results"), 500)
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
        <span className="text-white text-sm font-medium">3. Analizando...</span>
      </div>

      {/* Animated circular loader */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-36 h-36 relative">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.83} 283`}
              className="transition-all duration-100"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              {/* Food scanning icon */}
              <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeLinecap="round"/>
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Scanning animation dots */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Text */}
      <h2 className="text-xl font-bold text-white text-center mb-2">
        Detectando alimentos en tu nevera...
      </h2>
      <p className="text-white/80 text-center text-sm max-w-xs">
        Esto puede tardar unos segundos
      </p>

      {/* Progress percentage */}
      <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-white font-semibold">{progress}%</span>
      </div>

      {/* Animated bouncing dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Simulation note */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <p className="text-xs text-white/60 text-center">
          Simulacion - No hay reconocimiento real por IA
        </p>
      </div>
    </div>
  )
}
