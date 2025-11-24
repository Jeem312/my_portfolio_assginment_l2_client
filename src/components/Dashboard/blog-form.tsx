"use client"
import { useState } from "react"
import type React from "react"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function BlogForm() {
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    author: "Admin",
  })

  const uploadToImgBB = async (file: File) => {
    setImageUploading(true)
    try {
      const formData = new FormData()
      formData.append("image", file)

      // You need to add IMGBB_API_KEY to your environment variables
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        return data.data.url
      }
      throw new Error("Upload failed")
    } catch (error) {
      console.error("Image upload error:", error)
      alert("Failed to upload image")
      return null
    } finally {
      setImageUploading(false)
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = await uploadToImgBB(file)
      if (url) {
        setFormData({ ...formData, image: url })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Blog created successfully!")
        setFormData({ title: "", content: "", image: "", author: "Admin" })
      } else {
        alert("Failed to create blog")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10">
      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-white">
            Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="mt-2 bg-white/5 border-white/10 text-white"
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-white">
            Content (HTML)
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={10}
            className="mt-2 bg-white/5 border-white/10 text-white"
          />
        </div>

        <div>
          <Label htmlFor="image" className="text-white">
            Featured Image
          </Label>
          <div className="mt-2 flex items-center gap-4">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={imageUploading}
              className="bg-white/5 border-white/10 text-white"
            />
            {imageUploading && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
          </div>
          {formData.image && (
            <div className="mt-4">
              <img src={formData.image || "/placeholder.svg"} alt="Preview" className="w-full max-w-md rounded-lg" />
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="author" className="text-white">
            Author
          </Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="mt-2 bg-white/5 border-white/10 text-white"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || imageUploading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Blog Post"
          )}
        </Button>
      </div>
    </form>
  )
}
