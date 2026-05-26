"use client"

import { useState } from "react"
import { Screen, Comment } from "@/app/page"
import { ArrowLeft, Clock, ChefHat, Heart, Share2, Users, Bookmark, Send, Trash2, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface Recipe {
  id: number
  name: string
  time: string
  difficulty: string
  servings?: number
  ingredients: string[]
  ingredientsList?: { name: string; amount: string }[]
  image: string
  liked: boolean
  description?: string
  steps?: string[]
}

interface RecipeDetailScreenProps {
  navigateTo: (screen: Screen) => void
  recipe: Recipe | null
  onBack: () => void
  comments: Comment[]
  onAddComment: (comment: Comment) => void
  onDeleteComment?: (commentId: number) => void
  onReportComment?: (commentId: number) => void
  isAdmin?: boolean
  likedRecipes?: number[]
  savedRecipes?: number[]
  onToggleLike?: (recipeId: number) => void
  onToggleSave?: (recipeId: number) => void
}

export default function RecipeDetailScreen({
  navigateTo, recipe, onBack, comments, onAddComment,
  onDeleteComment, onReportComment, isAdmin,
  likedRecipes = [], savedRecipes = [], onToggleLike, onToggleSave
}: RecipeDetailScreenProps) {
  const [newComment, setNewComment] = useState("")
  const [confirmDeleteCommentId, setConfirmDeleteCommentId] = useState<number | null>(null)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const appUsers = [
    { id: 1, name: "Sabrina", avatar: "S", color: "bg-purple-500" },
    { id: 2, name: "Maria García", avatar: "M", color: "bg-blue-500" },
    { id: 3, name: "Ana Martínez", avatar: "A", color: "bg-pink-500" },
    { id: 4, name: "Carlos López", avatar: "C", color: "bg-green-500" },
    { id: 5, name: "Pedro Sánchez", avatar: "P", color: "bg-orange-500" },
  ]

  const isLiked = recipe ? likedRecipes.includes(recipe.id) : false
  const isSaved = recipe ? savedRecipes.includes(recipe.id) : false

  const displayComments = comments.length > 0 ? comments : [
    { id: 1, user: "Maria Garcia", avatar: "M", text: "Me encanto esta receta! La hice ayer y quedo deliciosa.", time: "Hace 2 horas" },
    { id: 2, user: "Carlos Lopez", avatar: "C", text: "Muy facil de hacer, perfecta para principiantes.", time: "Hace 1 dia" },
    { id: 3, user: "Ana Martinez", avatar: "A", text: "Le anadi un poco de limon y quedo espectacular.", time: "Hace 3 dias" },
  ]

  if (!recipe) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <p className="text-muted-foreground">Receta no encontrada</p>
      </div>
    )
  }

  const defaultSteps = [
    "Lava y corta todos los vegetales en trozos medianos.",
    "Calienta una sarten grande con un poco de aceite de oliva a fuego medio-alto.",
    "Anade los ingredientes principales y saltea durante 5-7 minutos.",
    "Sazona con sal, pimienta y tus especias favoritas al gusto.",
    "Sirve caliente y decora con hierbas frescas si lo deseas.",
  ]

  const defaultIngredientsList = [
    { name: "Ingrediente principal", amount: "200g" },
    { name: "Verduras variadas", amount: "150g" },
    { name: "Aceite de oliva", amount: "2 cucharadas" },
    { name: "Sal y pimienta", amount: "Al gusto" },
    { name: "Hierbas frescas", amount: "Un punado" },
  ]

  const steps = recipe.steps || defaultSteps
  const ingredientsList = recipe.ingredientsList || defaultIngredientsList

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({ id: Date.now(), user: "Tu", avatar: "T", text: newComment, time: "Ahora" })
      setNewComment("")
    }
  }

  const handleDeleteComment = (id: number) => {
    onDeleteComment?.(id)
    setConfirmDeleteCommentId(null)
  }

  return (
    <div className="h-full bg-white relative">
      {/* Delete comment confirm modal */}
      {confirmDeleteCommentId !== null && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-center text-foreground mb-2">Eliminar comentario</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">¿Estás seguro de que deseas eliminar este elemento?</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteCommentId(null)} className="flex-1 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={() => handleDeleteComment(confirmDeleteCommentId)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Image */}
      <div className="relative h-64">
        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={onBack} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleSave?.(recipe.id)}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <Bookmark className={`w-5 h-5 transition-colors ${isSaved ? "fill-green-600 text-green-600" : "text-foreground"}`} />
            </button>
            <button
              onClick={() => setShowShareMenu(true)}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white">{recipe.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-white/90 text-sm">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{recipe.time}</span>
            <span className="flex items-center gap-1"><ChefHat className="w-4 h-4" />{recipe.difficulty}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{recipe.servings || 2} porciones</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-6 pb-8 overflow-y-auto" style={{ maxHeight: "calc(100% - 256px)" }}>
        {/* Like button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onToggleLike?.(recipe.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isLiked ? "bg-red-50 text-red-500" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
            <span className="text-sm font-medium">{isLiked ? "Te gusta" : "Me gusta"}</span>
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>124 personas les gusta esto</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Descripcion</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {recipe.description || `Una deliciosa receta de ${recipe.name.toLowerCase()} perfecta para cualquier ocasion.`}
          </p>
        </div>

        {/* Ingredients */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Ingredientes</h2>
          <div className="bg-green-50 rounded-xl p-4 space-y-3">
            {ingredientsList.map((ing, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg">{recipe.ingredients[index] || "🥗"}</div>
                  <span className="text-sm text-foreground">{ing.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{ing.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Preparacion</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">{index + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Comentarios ({displayComments.length})
            {isAdmin && <span className="ml-2 text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">Modo Admin</span>}
          </h2>

          {/* Add comment */}
          <div className="flex gap-2 mb-4">
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-medium text-sm">T</span>
            </div>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Anade un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 h-9 text-sm rounded-full bg-muted/50 border-border"
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                size="sm"
                className="h-9 w-9 rounded-full bg-green-600 hover:bg-green-700 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            {displayComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-9 h-9 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground font-medium text-sm">{comment.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => onReportComment?.(comment.id)}
                          className="p-1.5 hover:bg-amber-50 rounded-lg text-amber-400 hover:text-amber-600 transition-colors"
                          title="Ocultar comentario"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteCommentId(comment.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors"
                          title="Eliminar comentario"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={() => navigateTo("shopping-list")} className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold">
          Anadir ingredientes a la lista
        </Button>
      </div>

      {/* Share Modal */}
      {showShareMenu && (
        <div className="absolute inset-0 z-50 flex items-end" onClick={() => setShowShareMenu(false)}>
          <div
            className="w-full bg-white rounded-t-3xl shadow-2xl p-5 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-4">Compartir publicación</h3>

            {/* WhatsApp & Instagram */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={() => setShowShareMenu(false)}
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

              <button
                onClick={() => setShowShareMenu(false)}
                className="flex flex-col items-center gap-1.5 flex-1"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
                  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-xs text-muted-foreground">Instagram</span>
              </button>

              <button
                onClick={() => setShowShareMenu(false)}
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
                  onClick={() => setShowShareMenu(false)}
                  className="flex flex-col items-center gap-1.5 min-w-[56px]"
                >
                  <div className={`w-14 h-14 ${user.color} rounded-full flex items-center justify-center shadow-sm`}>
                    <span className="text-white font-semibold text-lg">{user.avatar}</span>
                  </div>
                  <span className="text-xs text-muted-foreground text-center leading-tight">{user.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowShareMenu(false)}
              className="w-full mt-5 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:bg-muted/50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
