"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Settings,
  BarChart3,
  Users,
  FileText,
  Mail,
  Globe,
  Activity,
  Download,
  Edit,
  Plus,
  AlertCircle,
  Moon,
  Sun,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Auth from "@/api/auth"
export default function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const [loginData, setLoginData] = useState({ username: "", password: "" })
    const [loginError, setLoginError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    // Données simulées pour le dashboard
    const dashboardStats = {
        visitors: 1247,
        projects: 12,
        messages: 23,
        downloads: 89,
    }

    const recentActivities = [
        { type: "visit", message: "Nouveau visiteur depuis Paris", time: "Il y a 2 min", icon: Users },
        { type: "message", message: "Nouveau message de contact", time: "Il y a 15 min", icon: Mail },
        { type: "download", message: "CV téléchargé", time: "Il y a 1h", icon: Download },
        { type: "project", message: "Projet NeuroAI consulté", time: "Il y a 2h", icon: FileText },
    ]

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setLoginError("")
        try {
            console.log("Attempting login with:", loginData)
            const res = await Auth.login(loginData);
            if(res.status === 200){
                setIsLoggedIn(true)
            } else {
                console.error("Login failed:", res)
            } 
        } catch (error: any) {
            console.error("Login error:", error)
            setLoginError("Erreur lors de la connexion. Veuillez réessayer.")
        } finally {
            setIsLoading(false)
        }

    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setLoginData({ username: "", password: "" })
    }

    if (!isLoggedIn) {
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

                    <AnimatePresence>
                    {loginError && (
                        <motion.div
                        className="flex items-center space-x-2 text-red-400 text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        >
                        <AlertCircle className="w-4 h-4" />
                        <span>{loginError}</span>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3"
                        disabled={isLoading}
                    >
                        {isLoading ? (
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

                <div className={`text-center text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    <p>Identifiants de test :</p>
                    <p>
                    <strong>Username:</strong> elvis | <strong>Password:</strong> admin123
                    </p>
                </div>
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

    return (
        <div
        className={`min-h-screen ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}
        >
        {/* Header */}
        <header
            className={`${isDark ? "bg-gray-900/50 border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-xl border-b sticky top-0 z-50`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold">Dashboard Admin</h1>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Bienvenue, Elvis Houssou</p>
                </div>
                </div>

                <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <Switch checked={isDark} onCheckedChange={setIsDark} />
                    <Moon className="w-4 h-4" />
                </div>
                <Button variant="outline" onClick={() => router.push("/")} size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Voir le site
                </Button>
                <Button variant="outline" onClick={handleLogout} size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    Déconnexion
                </Button>
                </div>
            </div>
            </div>
        </header>

        <div className="max-w-7xl mx-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
                { title: "Visiteurs", value: dashboardStats.visitors, icon: Users, color: "from-blue-500 to-cyan-500" },
                { title: "Projets", value: dashboardStats.projects, icon: FileText, color: "from-purple-500 to-pink-500" },
                { title: "Messages", value: dashboardStats.messages, icon: Mail, color: "from-green-500 to-emerald-500" },
                {
                title: "Téléchargements",
                value: dashboardStats.downloads,
                icon: Download,
                color: "from-orange-500 to-red-500",
                },
            ].map((stat, index) => {
                const IconComponent = stat.icon
                return (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card
                    className={`${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
                    >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-1`}>{stat.title}</p>
                            <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
                        </div>
                        <div
                            className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}
                        >
                            <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
                )
            })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
                <Card className={`${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} backdrop-blur-sm`}>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-cyan-500" />
                    <span>Activités Récentes</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                        const IconComponent = activity.icon
                        return (
                        <motion.div
                            key={index}
                            className={`flex items-center space-x-4 p-4 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"} hover:scale-102 transition-transform`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                            <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{activity.message}</p>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{activity.time}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                            {activity.type}
                            </Badge>
                        </motion.div>
                        )
                    })}
                    </div>
                </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div>
                <Card className={`${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} backdrop-blur-sm`}>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                    <span>Actions Rapides</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                    { label: "Ajouter un projet", icon: Plus, color: "from-green-500 to-emerald-500" },
                    { label: "Modifier le profil", icon: Edit, color: "from-blue-500 to-cyan-500" },
                    { label: "Voir les messages", icon: Mail, color: "from-purple-500 to-pink-500" },
                    { label: "Exporter les données", icon: Download, color: "from-orange-500 to-red-500" },
                    ].map((action, index) => {
                    const IconComponent = action.icon
                    return (
                        <motion.div
                        key={action.label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        >
                        <Button
                            variant="outline"
                            className={`w-full justify-start ${isDark ? "border-white/20 hover:bg-white/10" : "border-gray-300 hover:bg-gray-100"}`}
                        >
                            <div
                            className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mr-3`}
                            >
                            <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            {action.label}
                        </Button>
                        </motion.div>
                    )
                    })}
                </CardContent>
                </Card>

                {/* System Status */}
                <Card
                className={`${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} backdrop-blur-sm mt-6`}
                >
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    <span>Statut Système</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                    { label: "Serveur", status: "En ligne", color: "green" },
                    { label: "Base de données", status: "Opérationnel", color: "green" },
                    { label: "CDN", status: "Optimal", color: "green" },
                    { label: "Sauvegardes", status: "À jour", color: "blue" },
                    ].map((item, index) => (
                    <div key={item.label} className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.label}</span>
                        <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`} />
                        <span className={`text-xs text-${item.color}-500 font-medium`}>{item.status}</span>
                        </div>
                    </div>
                    ))}
                </CardContent>
                </Card>
            </div>
            </div>
        </div>
        </div>
    )
}