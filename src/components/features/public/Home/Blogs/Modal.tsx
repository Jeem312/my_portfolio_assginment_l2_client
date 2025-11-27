"use client"

import { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js"
import type { Blog } from "@/types/blogs"
import axios from "axios"
import { X } from "lucide-react"
import { isAdminFromAccess } from "@/lib/admin"
import { toast } from "sonner"

export default function EditBlogModal({
  blog,
  onClose,
  refresh,
}: {
  blog: Blog
  onClose: () => void
  refresh: () => void
}) {
  const [formData, setFormData] = useState<Blog>(blog)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
const {token }= isAdminFromAccess()
  const blocksFromHTML = convertFromHTML(blog.content || "")
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap),
    ),
  )

  const handleSubmit = async () => {
    setLoading(true)
    setError("")

    const contentHTML = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

    const updateData = {
      ...formData,
      content: contentHTML,
    }

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blog._id}`, updateData,
    {
         headers: {
          Authorization: `${token}`,
        },
    }
    )
    toast.success("Blog updated successfully!")
      refresh()
      onClose()
    } catch (err) {
      setError("Failed to update blog. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl overflow-auto max-h-[90vh] border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Blog</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter blog title"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              value={formData.author || ""}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Enter author name"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Image URL</label>
            <input
              type="url"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Content - Rich Text Editor */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="border text-black border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-cyan-500">
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="editor-wrapper-dark"
                editorClassName="editor-content-dark px-4 py-3 min-h-48"
                toolbar={{
                  options: ["inline", "blockType", "list", "link", "history"],
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </div>

      {/* Custom styles for rich text editor */}
      <style jsx>{`
        :global(.editor-wrapper-dark) {
          font-family: inherit;
        }
        :global(.editor-content-dark) {
          color: inherit;
        }
        :global(.rdw-editor-main) {
          background: transparent;
          border: none;
          padding: 0;
        }
        :global(.rdw-editor-toolbar) {
          background: var(--background);
          border: none;
          border-bottom: 1px solid var(--border);
        }
        :global(.dark .rdw-editor-toolbar) {
          background: rgb(30 41 59);
        }
      `}</style>
    </div>
  )
}
