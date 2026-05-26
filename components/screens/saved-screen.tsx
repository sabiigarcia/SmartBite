"use client"

import { Screen } from "@/app/page"
import { Recipe } from "@/components/screens/recipe-detail-screen"
import { ChevronLeft, Bookmark, Clock, ChefHat } from "lucide-react"

interface SavedScreenProps {
  navigateTo: (screen: Screen) => void
  savedRecipes: number[]
  onToggleSave: (recipeId: number) => void
  onSelectRecipe: (recipe: Recipe) => void
}

const allRecipes: Recipe[] = [
  { id: 1, name: "Pasta con verduras", time: "20 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop", liked: false },
  { id: 2, name: "Pollo al limon con arroz", time: "30 min", difficulty: "Medio", ingredients: [], image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop", liked: false },
  { id: 3, name: "Tortilla de espinacas", time: "15 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop", liked: false },
  { id: 4, name: "Ensalada de pollo", time: "20 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop", liked: false },
  { id: 5, name: "Pasta con verduras salteadas", time: "25 min", difficulty: "Facil", ingredients: [], image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&h=200&fit=crop", liked: false },
]

export default function SavedScreen({ navigateTo, savedRecipes, onToggleSave, onSelectRecipe }: SavedScreenProps) {
  const saved = allRecipes.filter(recipe => savedRecipes.includes(recipe.id))

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
        <h1 className="text-lg font-semibold text-foreground">Guardados</h1>
      </div>

      <div className="px-4 py-4 pb-24">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Bookmark className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No tienes recetas guardadas</h3>
            <p className="text-sm text-muted-foreground text-center max-w-[250px]">
              Pulsa el icono de guardar en las recetas para verlas aqui
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {saved.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
              >
                <div 
                  className="flex-1 flex"
                  onClick={() => onSelectRecipe(recipe)}
                >
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
                <button
                  onClick={() => onToggleSave(recipe.id)}
                  className="px-4 flex items-center justify-center"
                >
                  <Bookmark className="w-6 h-6 text-green-600 fill-green-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
