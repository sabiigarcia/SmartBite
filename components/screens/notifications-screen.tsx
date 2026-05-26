"use client"

import { Screen, Notification } from "@/app/page"
import { ChevronLeft, AlertTriangle, ChefHat, RefreshCw, Sparkles, Check } from "lucide-react"

interface NotificationsScreenProps {
  navigateTo: (screen: Screen) => void
  notifications: Notification[]
  onMarkAsRead: (id: number) => void
  onMarkAllAsRead: () => void
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "expiring":
      return <AlertTriangle className="w-5 h-5 text-amber-500" />
    case "recipe":
      return <ChefHat className="w-5 h-5 text-green-600" />
    case "update":
      return <RefreshCw className="w-5 h-5 text-blue-500" />
    case "diet":
      return <Sparkles className="w-5 h-5 text-purple-500" />
  }
}

const getNotificationBgColor = (type: Notification["type"]) => {
  switch (type) {
    case "expiring":
      return "bg-amber-50"
    case "recipe":
      return "bg-green-50"
    case "update":
      return "bg-blue-50"
    case "diet":
      return "bg-purple-50"
  }
}

export default function NotificationsScreen({ 
  navigateTo, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationsScreenProps) {
  const unreadCount = notifications.filter(n => !n.read).length

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
    navigateTo(notification.target)
  }

  const handleMarkAsRead = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    onMarkAsRead(id)
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-border">
        <button 
          onClick={() => navigateTo("home")}
          className="p-2 hover:bg-muted rounded-lg"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Notificaciones</h1>
        <div className="w-10" />
      </div>

      {/* Unread counter and mark all */}
      <div className="px-4 py-3 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2">
          {unreadCount > 0 ? (
            <span className="bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {unreadCount} {unreadCount === 1 ? "nueva" : "nuevas"}
            </span>
          ) : (
            <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">
              Todo leido
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {notifications.length} notificaciones
          </span>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={onMarkAllAsRead}
            className="text-sm text-green-600 font-medium hover:text-green-700"
          >
            Marcar todas como leidas
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 pb-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
              notification.read 
                ? "bg-white border-border opacity-70" 
                : "bg-white border-green-200 shadow-sm"
            } hover:shadow-md`}
          >
            <div className="flex gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationBgColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`font-medium text-sm ${notification.read ? "text-muted-foreground" : "text-foreground"}`}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className={`text-sm mt-1 line-clamp-2 ${notification.read ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
                  {notification.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground/60">
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <button
                      onClick={(e) => handleMarkAsRead(e, notification.id)}
                      className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
                    >
                      <Check className="w-3 h-3" />
                      Marcar como leido
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Simulation notice */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Simulacion de notificaciones. En la app real, estas alertas se generarian automaticamente segun el uso.
          </p>
        </div>
      </div>
    </div>
  )
}
