"use client"

import { useState, useEffect } from "react"
import { Screen } from "@/app/page"
import { Check, ChevronRight, Clock, Flame, Sun, Moon, Share2, X, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DietReadyScreenProps {
  navigateTo: (screen: Screen) => void
  onPublishDiet?: (diet: PublishedDiet) => void
}

export interface PublishedDiet {
  id: number
  title: string
  totalCalories: number
  meals: { name: string; type: string; calories: number; time: string; image: string }[]
  publishedAt: string
  likes: number
  isPublic: boolean
}

const dailyMenu = {
  desayuno: {
    name: "Yogur con frutas y nueces",
    time: "8:00",
    calories: 320,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop"
  },
  comida: {
    name: "Ensalada de pollo con verduras",
    time: "14:00",
    calories: 450,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop"
  },
  cena: {
    name: "Tortilla de verduras",
    time: "21:00",
    calories: 280,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop"
  }
}

export default function DietReadyScreen({ navigateTo, onPublishDiet }: DietReadyScreenProps) {
  const [showContent, setShowContent] = useState(false)
  const [showMeals, setShowMeals] = useState({ desayuno: false, comida: false, cena: false })
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [published, setPublished] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300)
    setTimeout(() => setShowMeals(prev => ({ ...prev, desayuno: true })), 600)
    setTimeout(() => setShowMeals(prev => ({ ...prev, comida: true })), 900)
    setTimeout(() => setShowMeals(prev => ({ ...prev, cena: true })), 1200)
  }, [])

  const totalCalories = dailyMenu.desayuno.calories + dailyMenu.comida.calories + dailyMenu.cena.calories

  const handlePublish = () => {
    const newDiet: PublishedDiet = {
      id: Date.now(),
      title: "Mi dieta del día",
      totalCalories,
      meals: [
        { name: dailyMenu.desayuno.name, type: "Desayuno", calories: dailyMenu.desayuno.calories, time: dailyMenu.desayuno.time, image: dailyMenu.desayuno.image },
        { name: dailyMenu.comida.name, type: "Comida", calories: dailyMenu.comida.calories, time: dailyMenu.comida.time, image: dailyMenu.comida.image },
        { name: dailyMenu.cena.name, type: "Cena", calories: dailyMenu.cena.calories, time: dailyMenu.cena.time, image: dailyMenu.cena.image },
      ],
      publishedAt: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
      likes: 0,
      isPublic,
    }
    onPublishDiet?.(newDiet)
    setPublished(true)
    setShowPublishModal(false)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 3000)
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          ¡Dieta publicada en tu perfil!
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="absolute inset-0 z-40 bg-black/50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-foreground">Publicar dieta</h3>
              <button
                onClick={() => setShowPublishModal(false)}
                className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Preview card */}
            <div className="bg-green-50 rounded-2xl p-4 mb-5 border border-green-100">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-foreground text-sm">Mi dieta del día</p>
                <span className="text-xs font-bold text-green-600">{totalCalories} kcal</span>
              </div>
              <div className="flex gap-2">
                {[dailyMenu.desayuno, dailyMenu.comida, dailyMenu.cena].map((meal, i) => (
                  <img key={i} src={meal.image} alt={meal.name} className="w-14 h-14 rounded-xl object-cover" crossOrigin="anonymous" />
                ))}
              </div>
            </div>

            {/* Visibility toggle */}
            <p className="text-sm font-medium text-foreground mb-3">Visibilidad</p>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setIsPublic(true)}
                className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${isPublic ? "border-green-500 bg-green-50" : "border-border bg-white"}`}
              >
                <Globe className={`w-4 h-4 ${isPublic ? "text-green-600" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className={`text-sm font-medium ${isPublic ? "text-green-700" : "text-foreground"}`}>Público</p>
                  <p className="text-xs text-muted-foreground">Todos pueden verla</p>
                </div>
              </button>
              <button
                onClick={() => setIsPublic(false)}
                className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${!isPublic ? "border-green-500 bg-green-50" : "border-border bg-white"}`}
              >
                <Lock className={`w-4 h-4 ${!isPublic ? "text-green-600" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className={`text-sm font-medium ${!isPublic ? "text-green-700" : "text-foreground"}`}>Privado</p>
                  <p className="text-xs text-muted-foreground">Solo tú</p>
                </div>
              </button>
            </div>

            <Button
              onClick={handlePublish}
              className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold gap-2"
            >
              <Share2 className="w-4 h-4" />
              Publicar en mi perfil
            </Button>
          </div>
        </div>
      )}

      {/* Step indicator */}
      <div className="px-4 py-3 flex items-center justify-center">
        <div className="bg-green-100 rounded-full px-4 py-2">
          <span className="text-green-700 text-sm font-medium">{"6. ¡Tu dieta lista!"}</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Success header */}
        <div className={`text-center mb-6 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{"¡Tu dieta esta lista!"}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {"Menu del dia basado en tus ingredientes"}
          </p>
        </div>

        {/* Daily summary */}
        <div className={`bg-green-50 rounded-2xl p-4 mb-6 transition-all duration-500 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{"Total del dia"}</p>
              <p className="text-2xl font-bold text-green-600">{totalCalories} kcal</p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-medium">Equilibrado</span>
            </div>
          </div>
        </div>

        {/* Menu del dia */}
        <div className="mb-6">
          <h2 className="font-semibold text-foreground mb-4">{"Tu menu del dia"}</h2>
          
          <div className="space-y-3">
            {/* Desayuno */}
            <div className={`bg-white border border-border rounded-2xl p-4 transition-all duration-500 ${showMeals.desayuno ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={dailyMenu.desayuno.image} alt={dailyMenu.desayuno.name} className="w-16 h-16 rounded-xl object-cover" crossOrigin="anonymous" />
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sun className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-yellow-600 font-medium uppercase">Desayuno</p>
                  <p className="font-semibold text-foreground">{dailyMenu.desayuno.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {dailyMenu.desayuno.time}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Flame className="w-3 h-3" /> {dailyMenu.desayuno.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comida */}
            <div className={`bg-white border border-border rounded-2xl p-4 transition-all duration-500 ${showMeals.comida ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={dailyMenu.comida.image} alt={dailyMenu.comida.name} className="w-16 h-16 rounded-xl object-cover" crossOrigin="anonymous" />
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <Sun className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-orange-600 font-medium uppercase">Comida</p>
                  <p className="font-semibold text-foreground">{dailyMenu.comida.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {dailyMenu.comida.time}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Flame className="w-3 h-3" /> {dailyMenu.comida.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cena */}
            <div className={`bg-white border border-border rounded-2xl p-4 transition-all duration-500 ${showMeals.cena ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={dailyMenu.cena.image} alt={dailyMenu.cena.name} className="w-16 h-16 rounded-xl object-cover" crossOrigin="anonymous" />
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-indigo-400 rounded-full flex items-center justify-center">
                    <Moon className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-indigo-600 font-medium uppercase">Cena</p>
                  <p className="font-semibold text-foreground">{dailyMenu.cena.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {dailyMenu.cena.time}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Flame className="w-3 h-3" /> {dailyMenu.cena.calories} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-700 text-center">
            {"Este menu es una simulacion para demostrar el flujo de la aplicacion."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-4 border-t border-border space-y-3">
        <Button
          onClick={() => navigateTo("recipes")}
          className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold gap-2"
        >
          Ver recetas completas
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Publish / Cancel row */}
        <div className="flex gap-3">
          <Button
            onClick={() => setShowPublishModal(true)}
            disabled={published}
            className={`flex-1 h-12 rounded-xl font-semibold gap-2 ${published ? "bg-green-100 text-green-600 border border-green-300" : "bg-white border-2 border-green-600 text-green-600 hover:bg-green-50"}`}
            variant="outline"
          >
            {published ? (
              <>
                <Check className="w-4 h-4" />
                Publicada
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Publicar dieta
              </>
            )}
          </Button>
          <Button
            onClick={() => navigateTo("home")}
            variant="outline"
            className="flex-1 h-12 rounded-xl border-border text-muted-foreground hover:bg-muted gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Button>
        </div>

        <Button
          onClick={() => navigateTo("shopping-list")}
          variant="outline"
          className="w-full h-12 rounded-xl border-border gap-2"
        >
          Ver lista de la compra
        </Button>
      </div>
    </div>
  )
}
