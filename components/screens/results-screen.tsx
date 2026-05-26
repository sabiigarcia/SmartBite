"use client"

import { useState, useEffect, useRef } from "react"
import { Screen } from "@/app/page"
import { ChevronRight, Sparkles, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsScreenProps {
  navigateTo: (screen: Screen) => void
}

// Colores asignados a ingredientes detectados
const colorList = [
  "bg-green-500", "bg-red-500", "bg-amber-600",
  "bg-orange-500", "bg-amber-300", "bg-gray-300", "bg-red-600",
]

// Ingredientes de fallback por si falla el fetch
const fallbackIngredients = [
  { id: 1, name: "Lechuga", color: "bg-green-500" },
  { id: 2, name: "Tomate", color: "bg-red-500" },
  { id: 3, name: "Pechuga de pollo", color: "bg-amber-600" },
  { id: 4, name: "Zanahoria", color: "bg-orange-500" },
  { id: 5, name: "Huevos", color: "bg-amber-300" },
  { id: 6, name: "Yogur natural", color: "bg-gray-300" },
  { id: 7, name: "Pimiento rojo", color: "bg-red-600" },
]

export default function ResultsScreen({ navigateTo }: ResultsScreenProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [showActions, setShowActions] = useState(false)
  const [generatingRecipes, setGeneratingRecipes] = useState(false)
  const [detectedIngredients, setDetectedIngredients] = useState(fallbackIngredients)
  const [fetchError, setFetchError] = useState("")
  const [manualFood, setManualFood] = useState("")
  const [showManualInput, setShowManualInput] = useState(false)
  const [addedFoods, setAddedFoods] = useState<string[]>([])
  const manualInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // GET a la API para obtener ingredientes detectados (simulado con JSONPlaceholder)
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=7")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener ingredientes: " + res.status)
        return res.json()
      })
      .then((data: { id: number; title: string }[]) => {
        // Mapeamos los títulos de la API como nombres de ingredientes detectados
        const mapped = data.map((item, index) => ({
          id: item.id,
          name: fallbackIngredients[index]?.name ?? item.title,
          color: colorList[index % colorList.length],
        }))
        setDetectedIngredients(mapped)
      })
      .catch((_err) => {
        setFetchError("No se pudieron cargar los datos del servidor. Mostrando resultados locales.")
        setDetectedIngredients(fallbackIngredients)
      })
  }, [])

  useEffect(() => {
    // Animate items appearing one by one
    detectedIngredients.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index])
      }, index * 150)
    })

    // Show actions after all items are visible
    setTimeout(() => {
      setShowActions(true)
    }, detectedIngredients.length * 150 + 300)
  }, [])

  const handleGenerateRecipes = () => {
    setGeneratingRecipes(true)
    setTimeout(() => {
      navigateTo("generating-diet")
    }, 1500)
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Step indicator */}
      <div className="px-4 py-3 flex items-center justify-center">
        <div className="bg-green-100 rounded-full px-4 py-2">
          <span className="text-green-700 text-sm font-medium">4. Alimentos detectados</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-foreground">Hemos encontrado:</h1>
        </div>

        {/* Detected ingredients list */}
        <div className="space-y-2 mb-6">
          {detectedIngredients.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 bg-white rounded-xl p-3 border border-border transition-all duration-300 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              {/* Color indicator */}
              <div className={`w-4 h-4 rounded-full ${item.color}`} />
              
              {/* Name */}
              <p className="font-medium text-foreground text-sm flex-1">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Error fetch */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-xs text-red-600 text-center">{fetchError}</p>
          </div>
        )}

        {/* Manual food entry */}
        <div className="mb-4">
          <button
            onClick={() => {
              setShowManualInput(true)
              setTimeout(() => manualInputRef.current?.focus(), 50)
            }}
            className="w-full text-left"
          >
            <span className="text-red-500 text-xs underline underline-offset-2">
              No se han podido detectar correctamente algunos alimentos, escríbelos
            </span>
          </button>
          {showManualInput && (
            <>
              {/* Added foods chips */}
              {addedFoods.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {addedFoods.map((food, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200"
                    >
                      <Check className="w-3 h-3" />
                      {food}
                    </span>
                  ))}
                </div>
              )}
              {/* Input row with buttons */}
              <div className="mt-2 flex gap-2 items-center">
                <input
                  ref={manualInputRef}
                  type="text"
                  value={manualFood}
                  onChange={(e) => setManualFood(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && manualFood.trim()) {
                      setAddedFoods((prev) => [...prev, manualFood.trim()])
                      setManualFood("")
                      manualInputRef.current?.focus()
                    }
                  }}
                  placeholder="Ej: leche, huevos, tomate..."
                  className="flex-1 border border-border rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500"
                />
                {/* Aceptar button */}
                <button
                  onClick={() => {
                    if (manualFood.trim()) {
                      setAddedFoods((prev) => [...prev, manualFood.trim()])
                      setManualFood("")
                      manualInputRef.current?.focus()
                    }
                  }}
                  className="flex-shrink-0 h-10 px-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Simulation note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-700 text-center">
            {"Estos ingredientes son simulados para demostrar el flujo de la aplicacion."}
          </p>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="px-4 py-4 border-t border-border space-y-3 animate-in slide-in-from-bottom-4 duration-300">
          {generatingRecipes ? (
            <div className="flex flex-col items-center py-4">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-3" />
              <p className="text-foreground font-medium">Preparando generacion...</p>
            </div>
          ) : (
            <>
              <Button
                onClick={handleGenerateRecipes}
                className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Generar mi dieta
              </Button>
              <Button
                onClick={() => navigateTo("fridge")}
                variant="outline"
                className="w-full h-12 rounded-xl border-border gap-2"
              >
                Guardar en mi nevera
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
