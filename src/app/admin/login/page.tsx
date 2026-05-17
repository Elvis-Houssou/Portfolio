/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, LogIn, Moon, Shield, Sun, User, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Auth from "@/api/auth"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/useAuthStore";
import { s } from "framer-motion/client"

export default function LoginPage() {
    const router = useRouter()
    const [isDark, setIsDark] = useState(true)
    const { setLoading, isAuthenticated, setUser } = useAuthStore();

    const [loginData, setLoginData] = useState({ username: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    // Rediriger vers le tableau de bord si déjà authentifié
    // useEffect(() => {
    //     if (!loading && isAuthenticated) {
    //         router.push("/admin/dashboard");
    //     }
    // }, [isAuthenticated, loading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setIsLoggingIn(true)
        try {
            console.log("Attempting login with:", loginData)
            const res = await Auth.login(loginData);
            if(res.status === 200){
                setUser(res.data.user);
                toast.success("Connexion réussie !");
                router.push("/admin/dashboard");
            } else {
                console.error("Login failed:", res)
                toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.")
            } 
        } catch (error: any) {
            console.error("Login error:", error)
            toast.error("Erreur lors de la connexion. Veuillez réessayer.", { style: { background: "#440000FF", border: "#440000FF", color: "#fff" } })
        } finally {
            setLoading(false)
            setIsLoggingIn(false)

        }

    }

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-6 ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}
        >
            {/* Animated Background */}
            <div className="fixed inset-0 z-0 overflow-hidden">
            <div
                className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-pink-950/50" : "bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-pink-100/50"}`}
            />
            <div
                className={`absolute w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20" : "bg-gradient-to-r from-cyan-300/30 to-purple-300/30"} animate-pulse`}
            />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
            {/* Theme Toggle */}
            <div className="flex justify-end mb-6">
                <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <Switch checked={isDark} onCheckedChange={setIsDark} />
                <Moon className="w-4 h-4" />
                </div>
            </div>

            <Card
                className={`${isDark ? "bg-white/5 border-white/10" : "bg-white/90 border-gray-200"} backdrop-blur-xl shadow-2xl`}
            >
                <CardHeader className="text-center pb-8">
                <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                >
                    <Shield className="w-10 h-10 text-white" />
                </motion.div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Admin Portal
                </CardTitle>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-2`}>
                    Connectez-vous pour accéder au tableau de bord
                </p>
                </CardHeader>

                <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Nom d&apos;utilisateur
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                        type="text"
                        placeholder="Entrez votre nom d'utilisateur"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        className={`pl-10 ${isDark ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                        required
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Mot de passe
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Entrez votre mot de passe"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className={`pl-10 pr-10 ${isDark ? "bg-white/5 border-white/20 text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`}
                        required
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Connexion...</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <LogIn className="w-4 h-4" />
                                <span>Se connecter</span>
                            </div>
                        )}
                    </Button>
                    </motion.div>
                </form>

                </CardContent>
            </Card>

            <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Button
                    variant="ghost"
                    onClick={() => router.push("/")}
                    className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                >
                ← Retour au portfolio
                </Button>
            </motion.div>
            </motion.div>
        </div>
    )
}