"use client"
import { useState } from "react"
import type React from "react"

import { Loader2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProjectForm() {
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: [] as string[],
    image: "",
    thumbnail: "",
    liveLink: "",
    githubServer: "",
    githubClient: "",
    technologies: [] as string[],
    category: "",
    type: "",
    startDate: "",
    endDate: "",
  })
  const [featureInput, setFeatureInput] = useState("")
  const [techInput, setTechInput] = useState("")

  const uploadToImgBB = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("image", file)

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
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "thumbnail") => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === "image") setImageUploading(true)
      else setThumbnailUploading(true)

      const url = await uploadToImgBB(file)
      if (url) {
        setFormData({ ...formData, [type]: url })
      }

      if (type === "image") setImageUploading(false)
      else setThumbnailUploading(false)
    }
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] })
      setFeatureInput("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
  }

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] })
      setTechInput("")
    }
  }

  const removeTechnology = (index: number) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((_, i) => i !== index) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Project created successfully!")
        setFormData({
          title: "",
          description: "",
          features: [],
          image: "",
          thumbnail: "",
          liveLink: "",
          githubServer: "",
          githubClient: "",
          technologies: [],
          category: "",
          type: "",
          startDate: "",
          endDate: "",
        })
      } else {
        alert("Failed to create project")
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
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title" className="text-white">
              Project Title
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
            <Label htmlFor="category" className="text-white">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="business">Business Page</SelectItem>
                <SelectItem value="landing">Landing Page</SelectItem>
                <SelectItem value="portfolio">Portfolio</SelectItem>
                <SelectItem value="ai">AI Application</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="type" className="text-white">
              Project Type
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Solo Project</SelectItem>
                <SelectItem value="company">Company Project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="liveLink" className="text-white">
              Live Link
            </Label>
            <Input
              id="liveLink"
              type="url"
              value={formData.liveLink}
              onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
              className="mt-2 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="text-white">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="mt-2 bg-white/5 border-white/10 text-white"
          />
        </div>

        <div>
          <Label className="text-white">Features</Label>
          <div className="mt-2 flex gap-2">
            <Input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              placeholder="Add a feature"
              className="bg-white/5 border-white/10 text-white"
            />
            <Button type="button" onClick={addFeature} className="bg-cyan-500 hover:bg-cyan-600">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm flex items-center gap-2"
              >
                {feature}
                <button type="button" onClick={() => removeFeature(index)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-white">Technologies</Label>
          <div className="mt-2 flex gap-2">
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
              placeholder="Add a technology"
              className="bg-white/5 border-white/10 text-white"
            />
            <Button type="button" onClick={addTechnology} className="bg-cyan-500 hover:bg-cyan-600">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm flex items-center gap-2"
              >
                {tech}
                <button type="button" onClick={() => removeTechnology(index)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="githubClient" className="text-white">
              GitHub Client
            </Label>
            <Input
              id="githubClient"
              type="url"
              value={formData.githubClient}
              onChange={(e) => setFormData({ ...formData, githubClient: e.target.value })}
              className="mt-2 bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <Label htmlFor="githubServer" className="text-white">
              GitHub Server
            </Label>
            <Input
              id="githubServer"
              type="url"
              value={formData.githubServer}
              onChange={(e) => setFormData({ ...formData, githubServer: e.target.value })}
              className="mt-2 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="startDate" className="text-white">
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-2 bg-white/5 border-white/10 text-white"
            />
          </div>

          <div>
            <Label htmlFor="endDate" className="text-white">
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-2 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="image" className="text-white">
            Project Image
          </Label>
          <div className="mt-2 flex items-center gap-4">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image")}
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
          <Label htmlFor="thumbnail" className="text-white">
            Thumbnail
          </Label>
          <div className="mt-2 flex items-center gap-4">
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "thumbnail")}
              disabled={thumbnailUploading}
              className="bg-white/5 border-white/10 text-white"
            />
            {thumbnailUploading && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
          </div>
          {formData.thumbnail && (
            <div className="mt-4">
              <img
                src={formData.thumbnail || "/placeholder.svg"}
                alt="Thumbnail"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading || imageUploading || thumbnailUploading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </div>
    </form>
  )
}
