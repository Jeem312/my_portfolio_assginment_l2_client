"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { login as loginUser } from "../../../actions/auth"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"

type FormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data)
    setError("")
    setLoading(true)

    try {
      const response = await loginUser(data)
      if (!response?.data?.accessToken) {
        setError("Invalid credentials")
        return
      }

      // Optional: store in NextAuth session if needed
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      if(result?.status===200){
        toast.success("Login successful!")
              router.push("/dashboard")
      }

    } catch (err) {
      setError("Login failed. Only Admin Can  Login.")
      toast.error("Login failed. Only Admin Can  Login.")
    } finally {
      setLoading(false)
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-semibold text-blue-900">Admin Login Only</CardTitle>
          <CardDescription className="text-blue-600/70 text-base">Sign in to continue to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="h-12 bg-blue-50/50 border-blue-100 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-blue-900 font-medium">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="h-12 bg-blue-50/50 border-blue-100 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white font-medium text-base shadow-lg shadow-blue-500/30 transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

         
        </CardContent>
      </Card>
    </div>
  )
}
