"use client"

import { useState } from "react"
import { Screen } from "@/app/page"
import { Recipe } from "@/components/screens/recipe-detail-screen"
import { ChevronLeft, Heart, Bookmark, Clock, ChefHat } from "lucide-react"

interface FavoritesScreenProps {
  navigateTo: (screen: Screen) => void
  likedRecipes: number[]
  onToggleLike: (recipeId: number) => void
  onSelectRecipe: (recipe: Recipe) => void
  // savedRecipes optional so existing callers still work
  savedRecipes?: number[]
  onToggleSave?: (recipeId: number) => void
}

const allRecipes: Recipe[] = [
  { id: 1, name: "Pasta con verduras", time: "20 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop", liked: true },
  { id: 2, name: "Pollo al limon con arroz", time: "30 min", difficulty: "Medio", ingredients: [], image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop", liked: true },
  { id: 3, name: "Tortilla de espinacas", time: "15 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop", liked: true },
  { id: 4, name: "Ensalada de pollo", time: "20 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", liked: true },
  { id: 5, name: "Pasta con verduras salteadas", time: "25 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=200&fit=crop", liked: true },
]

type Tab = "liked" | "saved"

export default function FavoritesScreen({ navigateTo, likedRecipes, onToggleLike, onSelectRecipe, savedRecipes = [], onToggleSave }: FavoritesScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>("liked")

  const favoriteRecipes = allRecipes.filter(r => likedRecipes.includes(r.id))
  const savedList = allRecipes.filter(r => savedRecipes.includes(r.id))

  const displayed = activeTab === "liked" ? favoriteRecipes : savedList

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-border">
        <button
          onClick={() => navigateTo("home")}
          className="p-2 hover:bg-muted rounded-lg -ml-2"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Favoritos y Guardados</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-3 pb-2 flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("liked")}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === "liked" ? "bg-red-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Heart className="w-4 h-4" />
          Favoritos ({favoriteRecipes.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === "saved" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Guardados ({savedList.length})
        </button>
      </div>

      <div className="px-4 py-4 pb-24">
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className={`w-20 h-20 ${activeTab === "liked" ? "bg-red-50" : "bg-blue-50"} rounded-full flex items-center justify-center mb-4`}>
              {activeTab === "liked"
                ? <Heart className="w-10 h-10 text-red-300" />
                : <Bookmark className="w-10 h-10 text-blue-300" />
              }
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {activeTab === "liked" ? "No tienes favoritos" : "No tienes recetas guardadas"}
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-[250px]">
              {activeTab === "liked"
                ? "Pulsa el corazón en las recetas para añadirlas aquí"
                : "Pulsa el icono de guardar en las recetas para verlas aquí"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
              >
                <div className="flex-1 flex" onClick={() => onSelectRecipe(recipe)}>
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="flex-1 p-3">
                    <h4 className="font-medium text-foreground">{recipe.name}</h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <ChefHat className="w-3 h-3" />
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                {activeTab === "liked" ? (
                  <button
                    onClick={() => onToggleLike(recipe.id)}
                    className="px-4 flex items-center justify-center"
                  >
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleSave?.(recipe.id)}
                    className="px-4 flex items-center justify-center"
                  >
                    <Bookmark className="w-6 h-6 text-green-600 fill-green-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
