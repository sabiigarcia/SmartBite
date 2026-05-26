"use client"

import { useState } from "react"
import { Screen } from "@/app/page"
import { Camera, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CameraScreenProps {
  navigateTo: (screen: Screen) => void
}

export default function CameraScreen({ navigateTo }: CameraScreenProps) {
  const [photoTaken, setPhotoTaken] = useState(false)
  const [flashActive, setFlashActive] = useState(false)

  const handleFlash = () => {
    setFlashActive(true)
    setTimeout(() => setFlashActive(false), 600)
  }

  const handleTakePhoto = () => {
    setPhotoTaken(true)
  }

  const handleContinue = () => {
    navigateTo("analyzing")
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col relative">
      {/* Close button */}
      <button 
        onClick={() => navigateTo("fridge")}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Flash overlay */}
      {flashActive && (
        <div className="absolute inset-0 bg-white z-10 animate-pulse pointer-events-none" style={{ opacity: 0.85 }} />
      )}

      {/* Simulated camera view */}
      <div className="flex-1 relative">
        {!photoTaken ? (
          <>
            {/* Camera preview simulation */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
              <img
                src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=600&fit=crop"
                alt="Vista de nevera"
                className="w-full h-full object-cover opacity-90"
                crossOrigin="anonymous"
              />
            </div>
            
            {/* Overlay instructions */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-6 py-4 text-center mx-8">
                <h2 className="text-white text-xl font-bold mb-2">Enfoca tu nevera</h2>
                <p className="text-white/80 text-sm">
                  Asegúrate de que se vean bien los alimentos
                </p>
              </div>
            </div>

            {/* Camera frame guide */}
            <div className="absolute inset-8 border-2 border-white/30 rounded-3xl pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
            </div>
          </>
        ) : (
          <>
            {/* Captured photo */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=600&fit=crop"
                alt="Foto capturada"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            
            {/* Success overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="bg-green-500/90 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-white font-semibold">{"¡Foto capturada!"}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom controls */}
      <div className="bg-black/80 backdrop-blur-sm px-6 py-6 safe-area-pb">
        {!photoTaken ? (
          <div className="flex items-center justify-center gap-8">
            {/* Flash button */}
            <button
              onClick={handleFlash}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
                flashActive ? "bg-white" : "bg-white/20"
              }`}
            >
              <Zap className={`w-6 h-6 transition-colors duration-200 ${flashActive ? "text-yellow-400" : "text-white"}`} />
            </button>
            
            {/* Capture button */}
            <button 
              onClick={handleTakePhoto}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-green-500 shadow-lg hover:scale-105 transition-transform"
            >
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                <Camera className="w-7 h-7 text-white" />
              </div>
            </button>
            
            {/* Spacer for symmetry */}
            <div className="w-12 h-12" />
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              onClick={() => setPhotoTaken(false)}
              variant="outline"
              className="flex-1 h-12 rounded-xl border-white/30 text-white bg-white/10 hover:bg-white/20"
            >
              Repetir
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Analizar
            </Button>
          </div>
        )}
      </div>

      {/* Step indicator */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
        <span className="text-white text-sm font-medium">
          {photoTaken ? "2. Foto lista" : "1. Abre la cámara"}
        </span>
      </div>
    </div>
  )
}
