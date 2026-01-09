"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            })

            if (res.ok) {
                // Store auth in localStorage
                localStorage.setItem('admin-auth', 'authenticated')
                // Small delay to ensure localStorage is set
                setTimeout(() => {
                    router.push("/admin")
                }, 100)
            } else {
                setError("Invalid password")
            }
        } catch (err) {
            setError("Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{ backgroundColor: "#ffcd00" }}
                    >
                        <span className="text-2xl">🔐</span>
                    </div>
                    <h1 className="text-2xl font-bold">Admin Login</h1>
                    <p className="text-gray-500 mt-2">Enter your password to access the admin panel</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-lg font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: "#ffcd00" }}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Suncoopng Admin Panel
                </p>
            </div>
        </div>
    )
}
