"use client"

import { useState, useEffect } from "react"
import { Screen, UserProfile } from "@/app/page"
import { ArrowLeft, Camera, Mail, User, Phone, MapPin, Calendar, Edit2, Check, X, Image, RefreshCw, Flame, Clock, Globe, Lock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PublishedDiet } from "@/components/screens/diet-ready-screen"

interface ProfileScreenProps {
  navigateTo: (screen: Screen) => void
  profile: UserProfile
  onUpdateProfile: (profile: Partial<UserProfile>) => void
  publishedDiets?: PublishedDiet[]
  onDeleteDiet?: (id: number) => void
}

const samplePhotos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face",
]

export default function ProfileScreen({ navigateTo, profile, onUpdateProfile, publishedDiets = [], onDeleteDiet }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(profile)
  const [showSavedToast, setShowSavedToast] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraStep, setCameraStep] = useState<"preview" | "capturing" | "captured">("preview")
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"info" | "diets">("info")

  useEffect(() => {
    setEditedData(profile)
  }, [profile])

  const handleSave = () => {
    onUpdateProfile(editedData)
    setIsEditing(false)
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 2000)
  }

  const handleCancel = () => {
    setEditedData(profile)
    setIsEditing(false)
  }

  const openCamera = () => {
    setShowCamera(true)
    setCameraStep("preview")
    setCapturedPhoto(null)
  }

  const takePhoto = () => {
    setCameraStep("capturing")
    setTimeout(() => {
      const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)]
      setCapturedPhoto(randomPhoto)
      setCameraStep("captured")
    }, 1500)
  }

  const confirmPhoto = () => {
    if (capturedPhoto) {
      onUpdateProfile({ profilePhoto: capturedPhoto })
      setShowSavedToast(true)
      setTimeout(() => setShowSavedToast(false), 2000)
    }
    setShowCamera(false)
    setCameraStep("preview")
    setCapturedPhoto(null)
  }

  const retakePhoto = () => {
    setCameraStep("preview")
    setCapturedPhoto(null)
  }

  const closeCamera = () => {
    setShowCamera(false)
    setCameraStep("preview")
    setCapturedPhoto(null)
  }

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Toast */}
      {showSavedToast && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          Cambios guardados
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="absolute inset-0 z-40 bg-black flex flex-col">
          <div className="flex items-center justify-between p-4 pt-10">
            <button onClick={closeCamera} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <X className="w-5 h-5 text-white" />
            </button>
            <span className="text-white font-medium">Foto de perfil</span>
            <div className="w-10" />
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/30 relative">
              {cameraStep === "preview" && (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-white/50 mx-auto mb-2" />
                    <p className="text-white/70 text-sm">Vista previa</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-white/20" /></div>
                  <div className="absolute inset-0 flex items-center justify-center"><div className="w-px h-full bg-white/20" /></div>
                </div>
              )}
              {cameraStep === "capturing" && (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/50 border-t-white rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-white text-sm">Capturando...</p>
                  </div>
                </div>
              )}
              {cameraStep === "captured" && capturedPhoto && (
                <img src={capturedPhoto} alt="Foto capturada" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
          <div className="px-4 mb-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-white/70 text-xs text-center">
                <Image className="w-4 h-4 inline mr-1" />
                Simulacion: Se seleccionara una imagen de ejemplo
              </p>
            </div>
          </div>
          <div className="p-6 pb-10">
            {cameraStep === "preview" && (
              <div className="flex justify-center">
                <button onClick={takePhoto} className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </button>
              </div>
            )}
            {cameraStep === "capturing" && (
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full" />
                </div>
              </div>
            )}
            {cameraStep === "captured" && (
              <div className="flex justify-center gap-6">
                <button onClick={retakePhoto} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-xs">Repetir</span>
                </button>
                <button onClick={confirmPhoto} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-xs">Usar foto</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 pt-4 pb-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigateTo("home")} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">Mi Perfil</h1>
          <button
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isEditing ? <X className="w-5 h-5 text-white" /> : <Edit2 className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-14 flex justify-center">
        <div className="relative">
          <div className="w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white overflow-hidden">
            {profile.profilePhoto ? (
              <img src={profile.profilePhoto} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-green-600">{profile.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <button onClick={openCamera} className="absolute bottom-0 right-0 w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-md hover:bg-green-600 transition-colors">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Name */}
      <div className="text-center mt-3">
        <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
        <p className="text-sm text-muted-foreground">Miembro desde Enero 2024</p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 mt-5 px-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">24</p>
          <p className="text-xs text-muted-foreground">Recetas</p>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">12</p>
          <p className="text-xs text-muted-foreground">Ingredientes</p>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{publishedDiets.length || 8}</p>
          <p className="text-xs text-muted-foreground">Dietas</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-5 bg-muted rounded-xl p-1">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "info" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`}
        >
          Información
        </button>
        <button
          onClick={() => setActiveTab("diets")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "diets" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`}
        >
          Mis publicaciones {publishedDiets.length > 0 && <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 rounded-full">{publishedDiets.length}</span>}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 mt-4 px-4 overflow-y-auto pb-6">
        {activeTab === "info" ? (
          <>
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-4">
              <h3 className="font-semibold text-foreground mb-2">Informacion personal</h3>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-green-600" /></div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Nombre completo</p>
                  {isEditing ? <Input value={editedData.name} onChange={(e) => setEditedData({...editedData, name: e.target.value})} className="h-8 mt-1" /> : <p className="text-sm font-medium text-foreground">{profile.name}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center"><Mail className="w-5 h-5 text-green-600" /></div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Correo electronico</p>
                  {isEditing ? <Input value={editedData.email} onChange={(e) => setEditedData({...editedData, email: e.target.value})} className="h-8 mt-1" /> : <p className="text-sm font-medium text-foreground">{profile.email}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center"><Phone className="w-5 h-5 text-green-600" /></div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Telefono</p>
                  {isEditing ? <Input value={editedData.phone} onChange={(e) => setEditedData({...editedData, phone: e.target.value})} className="h-8 mt-1" /> : <p className="text-sm font-medium text-foreground">{profile.phone}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center"><MapPin className="w-5 h-5 text-green-600" /></div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Ubicacion</p>
                  {isEditing ? <Input value={editedData.location} onChange={(e) => setEditedData({...editedData, location: e.target.value})} className="h-8 mt-1" /> : <p className="text-sm font-medium text-foreground">{profile.location}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center"><Calendar className="w-5 h-5 text-green-600" /></div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Fecha de nacimiento</p>
                  {isEditing ? <Input value={editedData.birthDate} onChange={(e) => setEditedData({...editedData, birthDate: e.target.value})} className="h-8 mt-1" /> : <p className="text-sm font-medium text-foreground">{profile.birthDate}</p>}
                </div>
              </div>
            </div>

            {isEditing && (
              <Button onClick={handleSave} className="w-full mt-4 h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold">
                <Check className="w-5 h-5 mr-2" />
                Guardar cambios
              </Button>
            )}

            <p className="text-xs text-center text-muted-foreground mt-4 px-4">
              Los cambios se guardan automaticamente en tu sesion.
            </p>
          </>
        ) : (
          <div className="space-y-4">
            {publishedDiets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <Flame className="w-8 h-8 text-green-300" />
                </div>
                <p className="font-semibold text-foreground mb-1">Sin publicaciones aún</p>
                <p className="text-sm text-muted-foreground max-w-[220px]">
                  Genera una dieta y publícala para verla aquí
                </p>
                <Button
                  onClick={() => navigateTo("camera")}
                  className="mt-5 h-10 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold"
                >
                  Crear mi primera dieta
                </Button>
              </div>
            ) : (
              publishedDiets.map((diet) => (
                <div key={diet.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                  {/* Card header */}
                  <div className="p-4 pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{diet.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{diet.publishedAt}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${diet.isPublic ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                          {diet.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          {diet.isPublic ? "Público" : "Privado"}
                        </span>
                        {onDeleteDiet && (
                          <button
                            onClick={() => onDeleteDiet(diet.id)}
                            className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Calorie badge */}
                    <div className="flex items-center gap-1 mb-3">
                      <Flame className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-600">{diet.totalCalories} kcal</span>
                      <span className="text-xs text-muted-foreground ml-1">· Equilibrado</span>
                    </div>

                    {/* Meal thumbnails */}
                    <div className="flex gap-2">
                      {diet.meals.map((meal, i) => (
                        <div key={i} className="flex-1 relative">
                          <img src={meal.image} alt={meal.name} className="w-full h-16 rounded-xl object-cover" crossOrigin="anonymous" />
                          <div className="absolute bottom-1 left-1 right-1 bg-black/50 rounded-lg px-1 py-0.5">
                            <p className="text-white text-[9px] font-medium truncate">{meal.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meals list */}
                  <div className="border-t border-border">
                    {diet.meals.map((meal, i) => (
                      <div key={i} className={`flex items-center justify-between px-4 py-2.5 ${i < diet.meals.length - 1 ? "border-b border-border" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-14">{meal.type}</span>
                          <span className="text-sm font-medium text-foreground truncate max-w-[150px]">{meal.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{meal.time}</span>
                          <Flame className="w-3 h-3 ml-1" />
                          <span>{meal.calories}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
