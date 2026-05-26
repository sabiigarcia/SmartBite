"use client"

import { useState, useEffect } from "react"
import { Screen } from "@/app/page"
import { Recipe } from "@/components/screens/recipe-detail-screen"
import { Search, Clock, ChefHat, Heart, Leaf, Share2, Check } from "lucide-react"
import { Input } from "@/components/ui/input"

interface RecipesScreenProps {
  navigateTo: (screen: Screen) => void
  onSelectRecipe: (recipe: Recipe) => void
}

const categories = ["Recomendadas", "Todas", "Desayunos", "Comidas"]

// Recetas por defecto (fallback)
const defaultRecipes = [
  {
    id: 1,
    name: "Ensalada de pollo",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: ["🥬", "🍗", "🍅", "🥕"],
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
    liked: false
  },
  {
    id: 2,
    name: "Pasta con verduras salteadas",
    time: "25 min",
    difficulty: "Fácil",
    ingredients: ["🍝", "🌶️", "🧅", "🧄", "🫒"],
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop",
    liked: true
  },
  {
    id: 3,
    name: "Tortilla de espinacas",
    time: "15 min",
    difficulty: "Fácil",
    ingredients: ["🥚", "🥬", "🧅"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
    liked: false
  },
  {
    id: 4,
    name: "Bowl de yogur con frutas",
    time: "10 min",
    difficulty: "Muy fácil",
    ingredients: ["🥛", "🍓", "🍌", "🥜"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
    liked: false
  }
]

const difficultyList = ["Fácil", "Muy fácil", "Medio"]
const ingredientsList = [["🥬", "🍗", "🍅"], ["🍝", "🌶️", "🧅"], ["🥚", "🥬"], ["🥛", "🍓", "🍌"]]
const imageList = [
  "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
]

export default function RecipesScreen({ navigateTo, onSelectRecipe }: RecipesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Recomendadas")
  const [searchQuery, setSearchQuery] = useState("")
  const [likedRecipes, setLikedRecipes] = useState<number[]>([2])
  const [recipes, setRecipes] = useState(defaultRecipes)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [shareRecipeId, setShareRecipeId] = useState<number | null>(null)
  const [sharedTo, setSharedTo] = useState<string | null>(null)

  const appUsers = [
    { id: 1, name: "Sabrina", avatar: "S", color: "bg-purple-500" },
    { id: 2, name: "Maria", avatar: "M", color: "bg-blue-500" },
    { id: 3, name: "Ana", avatar: "A", color: "bg-pink-500" },
    { id: 4, name: "Carlos", avatar: "C", color: "bg-green-500" },
    { id: 5, name: "Pedro", avatar: "P", color: "bg-orange-500" },
  ]

  const handleShare = (platform: string) => {
    setSharedTo(platform)
    setTimeout(() => {
      setSharedTo(null)
      setShareRecipeId(null)
    }, 1500)
  }

  useEffect(() => {
    // GET recetas desde la API (simulado con JSONPlaceholder posts)
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener recetas: " + res.status)
        return res.json()
      })
      .then((data: { id: number; title: string }[]) => {
        // Mapeamos los posts de la API como recetas, manteniendo la estructura visual
        const mapped = data.map((post, index) => ({
          id: post.id,
          name: defaultRecipes[index]?.name ?? post.title,
          time: defaultRecipes[index]?.time ?? "20 min",
          difficulty: difficultyList[index % difficultyList.length],
          ingredients: ingredientsList[index % ingredientsList.length],
          image: imageList[index % imageList.length],
          liked: false,
        }))
        setRecipes(mapped)
      })
      .catch((_err) => {
        setFetchError("No se pudieron cargar las recetas. Mostrando recetas guardadas.")
        setRecipes(defaultRecipes)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const toggleLike = (id: number) => {
    setLikedRecipes(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Recetas</h1>
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Leaf className="w-5 h-5 text-green-600" />
        </div>
      </div>

      <div className="px-8 space-y-4 pb-8 max-w-5xl mx-auto w-full">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar recetas..."
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

        {/* Section Title */}
        <div className="pt-2">
          <h2 className="font-semibold text-foreground">Para ti (con lo que tienes)</h2>
        </div>

        {/* Recipe Cards */}
        {isLoading ? (
          <div className="flex flex-col items-center py-8 gap-3">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Cargando recetas...</p>
          </div>
        ) : (
          <>
            {fetchError && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-2">
                <p className="text-xs text-amber-700 text-center">{fetchError}</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-36">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
                {/* Heart — top right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(recipe.id)
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      likedRecipes.includes(recipe.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
                {/* Share — bottom right over image */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShareRecipeId(recipe.id)
                  }}
                  className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{recipe.name}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {recipe.ingredients.map((ing, i) => (
                    <span key={i} className="text-lg">{ing}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          </div>
          </>
        )}

        {/* Generate shopping list CTA */}
        <div 
          onClick={() => navigateTo("shopping-list")}
          className="bg-green-50 rounded-2xl p-4 border border-green-100 cursor-pointer hover:bg-green-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🛒</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{"¿Te falta algo?"}</h3>
              <p className="text-sm text-muted-foreground">Genera tu lista de la compra</p>
            </div>
            <div className="text-green-600">→</div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareRecipeId !== null && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => { setShareRecipeId(null); setSharedTo(null) }}
        >
          <div
            className="w-full bg-white rounded-t-3xl shadow-2xl p-5 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-4">Compartir receta</h3>

            {/* Shared confirmation */}
            {sharedTo ? (
              <div className="flex flex-col items-center py-6 animate-in fade-in duration-200">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <p className="font-semibold text-foreground">¡Compartido en {sharedTo}!</p>
              </div>
            ) : (
              <>
                {/* Social platforms */}
                <div className="flex gap-3 mb-5">
                  {/* WhatsApp */}
                  <button
                    onClick={() => handleShare("WhatsApp")}
                    className="flex flex-col items-center gap-1.5 flex-1"
                  >
                    <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-md">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.514 5.821L.057 23.985l6.305-1.634A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.003-1.374l-.358-.213-3.742.97.999-3.636-.234-.374A9.794 9.794 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">WhatsApp</span>
                  </button>

                  {/* Instagram */}
                  <button
                    onClick={() => handleShare("Instagram")}
                    className="flex flex-col items-center gap-1.5 flex-1"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">Instagram</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => handleShare("Facebook")}
                    className="flex flex-col items-center gap-1.5 flex-1"
                  >
                    <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-md">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">Facebook</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-border mb-4" />

                {/* App users */}
                <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Usuarios de SmartBite</p>
                <div className="flex gap-4 overflow-x-auto pb-1">
                  {appUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleShare(user.name)}
                      className="flex flex-col items-center gap-1.5 min-w-[56px]"
                    >
                      <div className={`w-14 h-14 ${user.color} rounded-full flex items-center justify-center shadow-sm`}>
                        <span className="text-white font-semibold text-lg">{user.avatar}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{user.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShareRecipeId(null)}
                  className="w-full mt-5 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
