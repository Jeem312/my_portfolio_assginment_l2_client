"use client"

import { useForm } from "react-hook-form"
import { register as registerUser } from "../../../actions/auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await registerUser(data)
      if (res?.success) {
        toast.success("Registration successful! Please login.")
        router.push("/login")
      } else {
        toast.error("Registration failed. Try again.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Server error!")
    } finally {
      setLoading(false)
      reset()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 backdrop-blur-sm bg-white">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-semibold text-blue-900">Create Account</CardTitle>
          <CardDescription className="text-blue-600/70 text-base">Join us today and get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-900 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your name"
                className="h-12 bg-blue-50/50 border-blue-100 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="h-12 bg-blue-50/50 border-blue-100 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Create a strong password"
                className="h-12 bg-blue-50/50 border-blue-100 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white font-medium text-base shadow-lg shadow-blue-500/30 transition-all"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-600/70">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
