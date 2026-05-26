"use client"

import { useState } from "react"
import { Screen, Comment, AdminUser, ManualFood } from "@/app/page"
import { ChevronLeft, Trash2, User, MessageSquare, Shield, AlertTriangle, ShieldOff, BookOpen, Users, BarChart2, Flag, CheckCircle, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminStats {
  totalUsers: number
  totalPosts: number
  manualFoods: number
}

interface AdminPanelScreenProps {
  navigateTo: (screen: Screen) => void
  users: AdminUser[]
  comments: Record<number, Comment[]>
  manualFoods: ManualFood[]
  onDeleteUser: (userId: number) => void
  onBlockUser: (userId: number) => void
  onDeleteComment: (recipeId: number, commentId: number) => void
  onReportUser: (userId: number, reason: string) => void
  onDismissUserReport: (userId: number) => void
  onReportComment: (recipeId: number, commentId: number, reason: string) => void
  onDismissCommentReport: (recipeId: number, commentId: number) => void
  adminStats: AdminStats
}

type Tab = "stats" | "users" | "comments" | "foods" | "reports"

type ModalAction =
  | { kind: "delete-user"; id: number; label: string }
  | { kind: "delete-comment"; id: number; recipeId: number; label: string }
  | { kind: "report-user"; id: number; name: string }
  | { kind: "report-comment"; id: number; recipeId: number; preview: string }

const REPORT_REASONS = [
  "Contenido inapropiado",
  "Spam o publicidad",
  "Acoso o intimidación",
  "Información falsa",
  "Otro",
]

export default function AdminPanelScreen({
  navigateTo, users, comments, manualFoods,
  onDeleteUser, onBlockUser, onDeleteComment,
  onReportUser, onDismissUserReport,
  onReportComment, onDismissCommentReport,
  adminStats,
}: AdminPanelScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>("stats")
  const [modal, setModal] = useState<ModalAction | null>(null)
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[0])
  const [showReasonPicker, setShowReasonPicker] = useState(false)
  const [filterReported, setFilterReported] = useState(false)

  const allComments = Object.entries(comments).flatMap(([recipeId, rc]) =>
    rc.map(c => ({ ...c, recipeId: parseInt(recipeId) }))
  )

  const reportedUsers = users.filter(u => u.reported)
  const reportedComments = allComments.filter(c => c.reported)
  const totalReports = reportedUsers.length + reportedComments.length

  const handleConfirm = () => {
    if (!modal) return
    if (modal.kind === "delete-user") onDeleteUser(modal.id)
    else if (modal.kind === "delete-comment") onDeleteComment(modal.recipeId, modal.id)
    else if (modal.kind === "report-user") onReportUser(modal.id, selectedReason)
    else if (modal.kind === "report-comment") onReportComment(modal.recipeId, modal.id, selectedReason)
    setModal(null)
    setSelectedReason(REPORT_REASONS[0])
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number; alert?: boolean }[] = [
    { id: "stats", label: "Resumen", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "users", label: "Usuarios", icon: <Users className="w-4 h-4" />, count: users.length },
    { id: "comments", label: "Comentarios", icon: <MessageSquare className="w-4 h-4" />, count: allComments.length },
    { id: "reports", label: "Denuncias", icon: <Flag className="w-4 h-4" />, count: totalReports, alert: totalReports > 0 },
    { id: "foods", label: "Alimentos", icon: <BookOpen className="w-4 h-4" />, count: manualFoods.length },
  ]

  return (
    <div className="h-full bg-background relative flex flex-col">

      {/* Modal */}
      {modal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full">
            {/* Report modals */}
            {(modal.kind === "report-user" || modal.kind === "report-comment") ? (
              <>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flag className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-center text-foreground mb-1">
                  {modal.kind === "report-user" ? `Denunciar a ${modal.name}` : "Denunciar comentario"}
                </h3>
                {modal.kind === "report-comment" && (
                  <p className="text-xs text-muted-foreground text-center mb-3 italic">"{modal.preview}"</p>
                )}
                <p className="text-sm text-muted-foreground text-center mb-4">Selecciona el motivo de la denuncia</p>

                {/* Reason picker */}
                <div className="relative mb-5">
                  <button
                    onClick={() => setShowReasonPicker(!showReasonPicker)}
                    className="w-full flex items-center justify-between px-4 py-3 border-2 border-border rounded-xl text-sm font-medium text-foreground bg-background hover:border-amber-400 transition-colors"
                  >
                    {selectedReason}
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showReasonPicker ? "rotate-180" : ""}`} />
                  </button>
                  {showReasonPicker && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                      {REPORT_REASONS.map(r => (
                        <button
                          key={r}
                          onClick={() => { setSelectedReason(r); setShowReasonPicker(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${r === selectedReason ? "text-amber-600 font-medium bg-amber-50" : "text-foreground"}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => { setModal(null); setShowReasonPicker(false) }}>Cancelar</Button>
                  <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" onClick={handleConfirm}>
                    <Flag className="w-4 h-4 mr-1" /> Denunciar
                  </Button>
                </div>
              </>
            ) : (
              /* Delete modals */
              <>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-center text-foreground mb-2">Confirmar eliminación</h3>
                {"label" in modal && <p className="text-sm font-medium text-center text-foreground mb-1">{modal.label}</p>}
                <p className="text-sm text-muted-foreground text-center mb-6">Esta acción no se puede deshacer.</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setModal(null)}>Cancelar</Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleConfirm}>Eliminar</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-border bg-gradient-to-r from-green-600 to-green-500">
        <button onClick={() => navigateTo("settings")} className="p-2 hover:bg-white/20 rounded-lg -ml-2">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex items-center gap-2 flex-1">
          <Shield className="w-5 h-5 text-white" />
          <h1 className="text-lg font-semibold text-white">Panel de Control</h1>
        </div>
        {totalReports > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {totalReports} alertas
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 flex gap-2 border-b border-border overflow-x-auto flex-shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 py-2 px-3 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors relative ${
              activeTab === tab.id ? "bg-green-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20" : tab.alert ? "bg-red-500 text-white" : "bg-background"}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Estadísticas rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center"><Users className="w-4 h-4 text-green-700" /></div>
                  <span className="text-sm font-medium text-green-700">Usuarios</span>
                </div>
                <span className="text-3xl font-bold text-green-700">{adminStats.totalUsers}</span>
                <p className="text-xs text-green-600 mt-1">registrados en total</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-blue-200 rounded-full flex items-center justify-center"><MessageSquare className="w-4 h-4 text-blue-700" /></div>
                  <span className="text-sm font-medium text-blue-700">Comentarios</span>
                </div>
                <span className="text-3xl font-bold text-blue-700">{adminStats.totalPosts}</span>
                <p className="text-xs text-blue-600 mt-1">publicaciones totales</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-amber-200 rounded-full flex items-center justify-center"><BookOpen className="w-4 h-4 text-amber-700" /></div>
                  <span className="text-sm font-medium text-amber-700">Alimentos manuales</span>
                </div>
                <span className="text-3xl font-bold text-amber-700">{adminStats.manualFoods}</span>
                <p className="text-xs text-amber-600 mt-1">añadidos por usuarios</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-red-200 rounded-full flex items-center justify-center"><ShieldOff className="w-4 h-4 text-red-700" /></div>
                  <span className="text-sm font-medium text-red-700">Bloqueados</span>
                </div>
                <span className="text-3xl font-bold text-red-700">{users.filter(u => u.blocked).length}</span>
                <p className="text-xs text-red-600 mt-1">cuentas bloqueadas</p>
              </div>
            </div>

            {/* Quick alerts */}
            {totalReports > 0 && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="w-5 h-5 text-amber-600" />
                  <p className="font-semibold text-amber-700">Denuncias pendientes</p>
                  <span className="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalReports}</span>
                </div>
                <p className="text-xs text-amber-600 mb-3">Hay contenido pendiente de revisión.</p>
                <button onClick={() => setActiveTab("reports")} className="text-xs font-semibold text-amber-700 underline">
                  Ver todas las denuncias →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => setFilterReported(!filterReported)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filterReported ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {filterReported ? "Mostrando denunciados" : "Ver solo denunciados"}
              </button>
            </div>
            {(filterReported ? users.filter(u => u.reported) : users).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No hay usuarios{filterReported ? " denunciados" : ""}</p>
            ) : (
              (filterReported ? users.filter(u => u.reported) : users).map(user => (
                <div key={user.id} className={`bg-card rounded-xl border p-4 ${user.blocked ? "border-red-200 bg-red-50/30" : user.reported ? "border-amber-200 bg-amber-50/30" : "border-border"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.blocked ? "bg-red-100" : user.reported ? "bg-amber-100" : "bg-green-100"}`}>
                        <span className={`text-sm font-semibold ${user.blocked ? "text-red-500" : user.reported ? "text-amber-600" : "text-green-600"}`}>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{user.name}</h4>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <div className="flex gap-1 mt-0.5 flex-wrap">
                          {user.blocked && <span className="text-xs text-red-500 font-medium">Bloqueado</span>}
                          {user.reported && <span className="text-xs text-amber-600 font-medium flex items-center gap-0.5"><Flag className="w-3 h-3" /> Denunciado</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {/* Report / dismiss report */}
                      {user.reported ? (
                        <button
                          onClick={() => onDismissUserReport(user.id)}
                          className="p-2 hover:bg-green-50 rounded-lg text-green-500 transition-colors"
                          title="Desestimar denuncia"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setModal({ kind: "report-user", id: user.id, name: user.name })}
                          className="p-2 hover:bg-amber-50 rounded-lg text-amber-400 hover:text-amber-600 transition-colors"
                          title="Denunciar"
                        >
                          <Flag className="w-5 h-5" />
                        </button>
                      )}
                      {/* Block / unblock */}
                      <button
                        onClick={() => onBlockUser(user.id)}
                        className={`p-2 rounded-lg transition-colors ${user.blocked ? "hover:bg-green-50 text-green-500" : "hover:bg-orange-50 text-orange-400 hover:text-orange-600"}`}
                        title={user.blocked ? "Desbloquear" : "Bloquear"}
                      >
                        {user.blocked ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => setModal({ kind: "delete-user", id: user.id, label: user.name })}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {/* Report reason */}
                  {user.reported && user.reportReason && (
                    <div className="mt-2 ml-13 pl-13 bg-amber-50 rounded-lg px-3 py-1.5 ml-0">
                      <p className="text-xs text-amber-700"><span className="font-medium">Motivo:</span> {user.reportReason}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === "comments" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => setFilterReported(!filterReported)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${filterReported ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {filterReported ? "Mostrando denunciados" : "Ver solo denunciados"}
              </button>
            </div>
            {(filterReported ? allComments.filter(c => c.reported) : allComments).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No hay comentarios{filterReported ? " denunciados" : ""}</p>
            ) : (
              (filterReported ? allComments.filter(c => c.reported) : allComments).map(comment => (
                <div key={`${comment.recipeId}-${comment.id}`} className={`bg-card rounded-xl border p-4 ${comment.reported ? "border-amber-200 bg-amber-50/20" : "border-border"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-muted-foreground">{comment.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-foreground">{comment.user}</span>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                          {comment.reported && (
                            <span className="text-xs text-amber-600 font-medium flex items-center gap-0.5">
                              <Flag className="w-3 h-3" /> Denunciado
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                        <span className="text-xs text-green-600 mt-1 inline-block">Receta #{comment.recipeId}</span>
                        {comment.reported && comment.reportReason && (
                          <p className="text-xs text-amber-700 mt-1"><span className="font-medium">Motivo:</span> {comment.reportReason}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {comment.reported ? (
                        <button
                          onClick={() => onDismissCommentReport(comment.recipeId, comment.id)}
                          className="p-1.5 hover:bg-green-50 rounded-lg text-green-500 transition-colors"
                          title="Desestimar denuncia"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setModal({ kind: "report-comment", id: comment.id, recipeId: comment.recipeId, preview: comment.text.slice(0, 40) + (comment.text.length > 40 ? "..." : "") })}
                          className="p-1.5 hover:bg-amber-50 rounded-lg text-amber-400 hover:text-amber-600 transition-colors"
                          title="Denunciar"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setModal({ kind: "delete-comment", id: comment.id, recipeId: comment.recipeId, label: `"${comment.text.slice(0, 30)}${comment.text.length > 30 ? "..." : ""}"` })}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-5">
            {totalReports === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <p className="font-semibold text-foreground mb-1">Sin denuncias pendientes</p>
                <p className="text-sm text-muted-foreground">Todo el contenido está en regla</p>
              </div>
            ) : (
              <>
                {/* Reported users */}
                {reportedUsers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-500" />
                      Perfiles denunciados
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{reportedUsers.length}</span>
                    </h3>
                    <div className="space-y-3">
                      {reportedUsers.map(user => (
                        <div key={user.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-amber-600">{user.name.charAt(0).toUpperCase()}</span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground text-sm">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                {user.reportReason && (
                                  <p className="text-xs text-amber-700 mt-0.5"><span className="font-medium">Motivo:</span> {user.reportReason}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button onClick={() => onDismissUserReport(user.id)} className="p-2 hover:bg-green-50 rounded-lg text-green-500 transition-colors" title="Desestimar">
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button onClick={() => onBlockUser(user.id)} className={`p-2 rounded-lg transition-colors ${user.blocked ? "text-green-500 hover:bg-green-50" : "text-orange-400 hover:bg-orange-50"}`} title={user.blocked ? "Desbloquear" : "Bloquear"}>
                                {user.blocked ? <Shield className="w-5 h-5" /> : <ShieldOff className="w-5 h-5" />}
                              </button>
                              <button onClick={() => setModal({ kind: "delete-user", id: user.id, label: user.name })} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reported comments */}
                {reportedComments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-500" />
                      Comentarios denunciados
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{reportedComments.length}</span>
                    </h3>
                    <div className="space-y-3">
                      {reportedComments.map(comment => (
                        <div key={`rep-${comment.recipeId}-${comment.id}`} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-amber-600">{comment.avatar}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <span className="font-medium text-sm text-foreground">{comment.user}</span>
                                  <span className="text-xs text-muted-foreground ml-2">{comment.time}</span>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                  <button onClick={() => onDismissCommentReport(comment.recipeId, comment.id)} className="p-1.5 hover:bg-green-50 rounded-lg text-green-500 transition-colors" title="Desestimar">
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => setModal({ kind: "delete-comment", id: comment.id, recipeId: comment.recipeId, label: `"${comment.text.slice(0, 30)}..."` })} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                              <p className="text-xs text-green-600 mt-1">Receta #{comment.recipeId}</p>
                              {comment.reportReason && (
                                <p className="text-xs text-amber-700 mt-1"><span className="font-medium">Motivo:</span> {comment.reportReason}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Manual Foods Tab */}
        {activeTab === "foods" && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-xs text-amber-700">
                Alimentos introducidos manualmente por los usuarios. Considera añadirlos a la base de datos oficial.
              </p>
            </div>
            {manualFoods.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No hay alimentos añadidos manualmente</p>
            ) : (
              manualFoods.map(food => (
                <div key={food.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl">🥗</div>
                    <div>
                      <h4 className="font-medium text-foreground">{food.name}</h4>
                      <p className="text-xs text-muted-foreground">por {food.addedBy}</p>
                      <p className="text-xs text-muted-foreground">{food.date}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">Pendiente</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
