"use client"

import { useState } from "react"
import { Screen } from "@/app/page"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FridgeScreenProps {
  navigateTo: (screen: Screen) => void
}

const categories = ["Todos", "Proteínas", "Verduras", "Frutas", "Lácteos"]

const ingredients = [
  { id: 1, name: "Pollo", category: "Proteína", daysLeft: 2, color: "text-red-500", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=150&h=150&fit=crop" },
  { id: 2, name: "Tomate", category: "Verdura", daysLeft: 5, color: "text-green-500", image: "https://images.unsplash.com/photo-1546470427-227c7369a9b9?w=150&h=150&fit=crop" },
  { id: 3, name: "Lechuga", category: "Verdura", daysLeft: 3, color: "text-amber-500", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=150&h=150&fit=crop" },
  { id: 4, name: "Huevos", category: "Proteína", daysLeft: 10, color: "text-green-500", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&h=150&fit=crop" },
  { id: 5, name: "Yogur natural", category: "Lácteo", daysLeft: 5, color: "text-green-500", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=150&h=150&fit=crop" },
  { id: 6, name: "Queso", category: "Lácteo", daysLeft: 7, color: "text-green-500", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=150&h=150&fit=crop" },
  { id: 7, name: "Pimiento", category: "Verdura", daysLeft: 4, color: "text-green-500", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=150&h=150&fit=crop" },
  { id: 8, name: "Espinacas", category: "Verdura", daysLeft: 2, color: "text-red-500", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop" },
]

export default function FridgeScreen({ navigateTo }: FridgeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIngredients = ingredients.filter((item) => {
    const matchesCategory = selectedCategory === "Todos" || item.category.includes(selectedCategory.slice(0, -1))
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Mi nevera</h1>
      </div>

      <div className="px-8 space-y-4 pb-8 max-w-5xl mx-auto w-full">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar alimento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-muted/50 border-border"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ingredients Count */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">
            Ingredientes ({filteredIngredients.length})
          </h2>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredIngredients.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-20 bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="p-2">
                <h3 className="font-medium text-sm text-foreground truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <p className={`text-xs font-medium mt-1 ${item.color}`}>
                  {item.daysLeft} días
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
