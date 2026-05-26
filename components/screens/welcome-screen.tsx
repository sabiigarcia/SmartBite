"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Smartphone, Mail } from "lucide-react"

interface WelcomeScreenProps {
  onEmailLogin: () => void
  onGmailLogin: () => void
  onAppleLogin: () => void
}

export default function WelcomeScreen({ onEmailLogin, onGmailLogin, onAppleLogin }: WelcomeScreenProps) {
  return (
    <div className="h-full bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 opacity-60">
        <div className="w-full h-full bg-green-600 rounded-full blur-xl" />
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-40">
        <div className="w-full h-full bg-red-400 rounded-full blur-xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 pb-12">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6">
            <div className="relative">
              <Smartphone className="w-12 h-12 text-green-600" />
              <Leaf className="w-6 h-6 text-green-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-700">SmartBite</h1>
          <p className="text-muted-foreground text-base mt-2 text-center max-w-xs">
            Come inteligente, aprovecha lo que tienes.
          </p>
        </div>

        {/* Features */}
        <div className="w-full max-w-sm mb-12 space-y-4">
          <div className="flex items-center gap-4 bg-white/80 rounded-2xl p-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Escanea tu nevera</p>
              <p className="text-sm text-muted-foreground">Detecta ingredientes al instante</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/80 rounded-2xl p-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Recetas personalizadas</p>
              <p className="text-sm text-muted-foreground">Basadas en lo que tienes</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/80 rounded-2xl p-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Reduce el desperdicio</p>
              <p className="text-sm text-muted-foreground">Aprovecha todos tus alimentos</p>
            </div>
          </div>
        </div>

        {/* Login Options */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={onEmailLogin}
            className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base"
          >
            <Mail className="w-5 h-5 mr-3" />
            Iniciar sesion con correo electronico
          </Button>

          <Button
            onClick={onGmailLogin}
            variant="outline"
            className="w-full h-14 rounded-2xl border-2 border-border bg-white hover:bg-gray-50 text-foreground font-semibold text-base"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Iniciar sesion con Gmail
          </Button>

          <Button
            onClick={onAppleLogin}
            variant="outline"
            className="w-full h-14 rounded-2xl border-2 border-gray-900 bg-white hover:bg-gray-50 text-gray-900 font-semibold text-base"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 16.97 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
            Iniciar sesion con Apple
          </Button>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <div className="absolute bottom-0 left-4 w-16 h-16 bg-yellow-400 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-8 w-12 h-12 bg-green-500 rounded-full blur-xl" />
        <div className="absolute bottom-2 left-1/3 w-14 h-14 bg-red-400 rounded-full blur-xl" />
      </div>
    </div>
  )
}
