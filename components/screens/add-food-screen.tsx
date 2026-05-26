"use client"

import { useState } from "react"
import { Screen } from "@/app/page"
import { ChevronLeft, Camera, Calendar, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AddFoodScreenProps {
  navigateTo: (screen: Screen) => void
}

export default function AddFoodScreen({ navigateTo }: AddFoodScreenProps) {
  const [foodName, setFoodName] = useState("")
  const [category, setCategory] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [notes, setNotes] = useState("")
  const [hasPhoto, setHasPhoto] = useState(false)

  const handleTakePhoto = () => {
    // Simulate taking a photo
    setHasPhoto(true)
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-border">
        <button 
          onClick={() => navigateTo("fridge")}
          className="p-2 hover:bg-muted rounded-lg -ml-2"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Añadir alimento</h1>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5">
        {/* Camera Area */}
        <div 
          onClick={handleTakePhoto}
          className={`h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
            hasPhoto 
              ? "border-green-300 bg-green-50" 
              : "border-green-300 bg-green-50/50 hover:bg-green-50"
          }`}
        >
          {hasPhoto ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-green-600 font-medium">Foto capturada</p>
              <p className="text-xs text-green-500 mt-1">Toca para volver a tomar</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Camera className="w-7 h-7 text-green-600" />
              </div>
              <p className="text-green-600 font-medium">Haz una foto</p>
              <p className="text-xs text-muted-foreground mt-1">Toca para abrir la cámara</p>
            </div>
          )}
        </div>

        {/* Food Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nombre del alimento</label>
          <Input
            placeholder="Ej. Pechuga de pollo"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="h-12 rounded-xl border-border"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Categoría</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-border bg-white text-foreground appearance-none cursor-pointer"
            >
              <option value="">Selecciona una categoría</option>
              <option value="proteina">Proteína</option>
              <option value="verdura">Verdura</option>
              <option value="fruta">Fruta</option>
              <option value="lacteo">Lácteo</option>
              <option value="otro">Otro</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Expiry Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Fecha de caducidad</label>
          <div className="relative">
            <Input
              type="date"
              placeholder="dd/mm/aaaa"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="h-12 rounded-xl border-border pr-10"
            />
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Notas (opcional)</label>
          <textarea
            placeholder="Añade una nota..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-20 px-4 py-3 rounded-xl border border-border bg-white text-foreground resize-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="px-4 py-4 border-t border-border">
        <Button
          onClick={() => navigateTo("fridge")}
          className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Guardar alimento
        </Button>
      </div>
    </div>
  )
}
