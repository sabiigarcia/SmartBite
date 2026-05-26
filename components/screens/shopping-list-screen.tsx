"use client"

import { useState, useEffect } from "react"
import { Screen } from "@/app/page"
import { ChevronLeft, Check, Plus, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShoppingListScreenProps {
  navigateTo: (screen: Screen) => void
}

interface ShoppingItem {
  id: number
  name: string
  checked: boolean
}

interface ShoppingCategory {
  name: string
  items: ShoppingItem[]
}

const categoryOptions = [
  "Proteinas",
  "Verduras",
  "Frutas",
  "Lacteos",
  "Cereales",
  "Otros"
]

const initialCategories: ShoppingCategory[] = [
  {
    name: "Proteinas",
    items: [
      { id: 1, name: "Pechuga de pollo", checked: false },
      { id: 2, name: "Atun en lata", checked: true },
      { id: 3, name: "Huevos", checked: false },
    ]
  },
  {
    name: "Verduras",
    items: [
      { id: 4, name: "Cebolla", checked: false },
      { id: 5, name: "Pimiento rojo", checked: true },
      { id: 6, name: "Zanahoria", checked: false },
      { id: 7, name: "Espinacas", checked: false },
    ]
  },
  {
    name: "Lacteos",
    items: [
      { id: 8, name: "Leche", checked: false },
      { id: 9, name: "Yogur natural", checked: false },
    ]
  },
  {
    name: "Otros",
    items: [
      { id: 10, name: "Aceite de oliva", checked: false },
      { id: 11, name: "Arroz integral", checked: true },
    ]
  }
]

export default function ShoppingListScreen({ navigateTo }: ShoppingListScreenProps) {
  const [categories, setCategories] = useState<ShoppingCategory[]>(() => {
    if (typeof window === "undefined") return initialCategories
    try {
      const stored = localStorage.getItem("sb_shopping")
      return stored ? JSON.parse(stored) : initialCategories
    } catch { return initialCategories }
  })
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("")
  const [nextId, setNextId] = useState(() => {
    if (typeof window === "undefined") return 12
    try {
      const stored = localStorage.getItem("sb_shopping_nextid")
      return stored ? parseInt(stored) : 12
    } catch { return 12 }
  })

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem("sb_shopping", JSON.stringify(categories)) } catch {}
  }, [categories])

  useEffect(() => {
    try { localStorage.setItem("sb_shopping_nextid", String(nextId)) } catch {}
  }, [nextId])

  const toggleItem = (categoryIndex: number, itemId: number) => {
    setCategories(prev => prev.map((cat, catIdx) => {
      if (catIdx !== categoryIndex) return cat
      return {
        ...cat,
        items: cat.items.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      }
    }))
  }

  const deleteItem = (categoryIndex: number, itemId: number) => {
    setCategories(prev => prev.map((cat, catIdx) => {
      if (catIdx !== categoryIndex) return cat
      return {
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      }
    }).filter(cat => cat.items.length > 0))
  }

  const addItem = () => {
    if (!newItemName.trim() || !newItemCategory) return

    const newItem: ShoppingItem = {
      id: nextId,
      name: newItemName.trim(),
      checked: false
    }

    setCategories(prev => {
      const existingCategoryIndex = prev.findIndex(cat => cat.name === newItemCategory)
      
      if (existingCategoryIndex >= 0) {
        return prev.map((cat, idx) => {
          if (idx !== existingCategoryIndex) return cat
          return {
            ...cat,
            items: [...cat.items, newItem]
          }
        })
      } else {
        return [...prev, { name: newItemCategory, items: [newItem] }]
      }
    })

    setNextId(prev => prev + 1)
    setNewItemName("")
    setNewItemCategory("")
    setShowAddItem(false)
  }

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0)
  const checkedItems = categories.reduce(
    (acc, cat) => acc + cat.items.filter(item => item.checked).length, 
    0
  )

  // Add Item Screen
  if (showAddItem) {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAddItem(false)}
              className="p-2 hover:bg-muted rounded-lg -ml-2"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Anadir articulo</h1>
          </div>
          <button 
            onClick={() => setShowAddItem(false)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 px-4 py-6">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-8">
            Anade un nuevo producto a tu lista de la compra
          </p>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre del producto
            </label>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Ej. Manzanas"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Categoria
            </label>
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-foreground appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
            >
              <option value="">Selecciona una categoria</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Quick Add Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Sugerencias rapidas
            </label>
            <div className="flex flex-wrap gap-2">
              {["Leche", "Pan", "Huevos", "Tomates", "Pollo", "Arroz"].map((item) => (
                <button
                  key={item}
                  onClick={() => setNewItemName(item)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    newItemName === item
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-card border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={addItem}
            disabled={!newItemName.trim() || !newItemCategory}
            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar articulo
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            El articulo se anadira a tu lista de la compra
          </p>
        </div>
      </div>
    )
  }

  // Main Shopping List Screen
  return (
    <div className="h-full bg-white flex flex-col relative">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateTo("recipes")}
            className="p-2 hover:bg-muted rounded-lg -ml-2"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Lista de la compra</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {checkedItems} de {totalItems} comprados
          </span>
          <span className="text-sm font-medium text-green-600">
            {totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${totalItems > 0 ? (checkedItems / totalItems) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Shopping List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              Tu lista esta vacia.<br />
              Pulsa el boton + para anadir articulos.
            </p>
          </div>
        ) : (
          categories.map((category, catIndex) => (
            <div key={category.name} className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-foreground">{category.name}</h2>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {category.items.filter(i => i.checked).length}/{category.items.length}
                </span>
              </div>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      item.checked 
                        ? "bg-green-50 border-green-200" 
                        : "bg-card border-border"
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(catIndex, item.id)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                        item.checked 
                          ? "bg-green-500 border-green-500" 
                          : "border-muted-foreground/30 hover:border-green-500"
                      }`}
                    >
                      {item.checked && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <span className={`flex-1 transition-all ${
                      item.checked 
                        ? "text-muted-foreground line-through" 
                        : "text-foreground"
                    }`}>
                      {item.name}
                    </span>
                    <button 
                      onClick={() => deleteItem(catIndex, item.id)}
                      className="p-1.5 hover:bg-red-100 rounded text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <div className="absolute bottom-24 right-4">
        <button
          onClick={() => setShowAddItem(true)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

      {/* Add Item Hint */}
      <div className="absolute bottom-24 left-4 right-20">
        <button 
          onClick={() => setShowAddItem(true)}
          className="w-full py-3 border-2 border-dashed border-green-300 rounded-xl text-green-600 font-medium text-sm hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Anadir articulo a la lista
        </button>
      </div>
    </div>
  )
}
