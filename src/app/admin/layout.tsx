'use client';
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/useAuthStore";

import AdminSidebar from "@/components/AdminSidebar"
import AdminHeader from "@/components/AdminHeader"
import { useAuth } from "@/hooks/useAuth"; // Import du hook

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuthStore();
    useAuth(); // Appel du hook pour vérifier l'authentification

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push("/admin/login"); // Redirige vers la page de connexion si non authentifié
        }
        // if (!loading && pathname.startsWith("/dashboard") && !isAuthenticated) {
        // router.replace("/login");
        // }
    }, [router, isAuthenticated, loading]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600 text-lg">Chargement...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // ou un loader pendant la redirection
    }

    return (
        // <div className={`min-h-screen p-6 ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}>
        //     <Menu />
        //     {children}
        // </div>
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}