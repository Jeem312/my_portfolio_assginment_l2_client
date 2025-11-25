"use server"

export async function uploadImageToImgBB(file: File) {
  try {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    if (data.success) {
      return { success: true, url: data.data.url }
    }
    throw new Error("Upload failed")
  } catch (error) {
    console.error("Image upload error:", error)
    return { success: false, error: "Failed to upload image" }
  }
}
