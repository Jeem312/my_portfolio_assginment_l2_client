"use client"

import { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
} from "draft-js"
import type { Project } from "@/types/project"
import axios from "axios"
import { X } from "lucide-react"
import { isAdminFromAccess } from "@/lib/admin"
import { toast } from "sonner"

export default function EditProjectModal({
  project,
  onClose,
  refresh,
}: {
  project: Project
  onClose: () => void
  refresh: () => void
}) {
  const [formData, setFormData] = useState<Project>(project)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
const {token} =isAdminFromAccess()
  // ============================
  // FIXED DESCRIPTION LOADER
  // Supports RAW JSON + HTML
  // ============================
  let initialEditorState: EditorState

  try {
    const raw = JSON.parse(project.description || "{}")
    initialEditorState = EditorState.createWithContent(convertFromRaw(raw))
  } catch {
    const blocks = convertFromHTML(project.description || "")
    initialEditorState = EditorState.createWithContent(
      ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap),
    )
  }

  const [editorState, setEditorState] = useState(initialEditorState)

const handleSubmit = async () => {
  setLoading(true)
  setError("")

  const descriptionRaw = JSON.stringify(
    convertToRaw(editorState.getCurrentContent())
  )

  const updateData = {
    ...formData,
    description: descriptionRaw,
  }

  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${project._id}`,
      updateData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )

    toast.success("Project updated successfully!")

    refresh()
    onClose()
  } catch (err) {
    setError("Failed to update project. Please try again.")
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit Project
          </h2>
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
              Title *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter project title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g., Web App, Mobile App"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              value={formData.technologies?.join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  technologies: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
                })
              }
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <div className="border border-slate-300 dark:border-slate-600 rounded-lg overflow- text-black bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-cyan-500">
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="editor-wrapper-dark"
                editorClassName="editor-content-dark px-4 py-3 min-h-32"
                toolbar={{
                  options: ["inline", "blockType", "list", "link", "history"],
                }}
              />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Links
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                Live Link
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={formData.liveLink || ""}
                onChange={(e) =>
                  setFormData({ ...formData, liveLink: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                Github Client
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={formData.githubClient || ""}
                onChange={(e) =>
                  setFormData({ ...formData, githubClient: e.target.value })
                }
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                Github Server
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={formData.githubServer || ""}
                onChange={(e) =>
                  setFormData({ ...formData, githubServer: e.target.value })
                }
                placeholder="https://github.com/username/repo"
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
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-cyan-400 transition-colors font-medium"
          >
            {loading ? "Updating..." : "Update Project"}
          </button>
        </div>
      </div>

      {/* Editor Styles */}
      <style jsx>{`
        :global(.editor-content-dark) {
          color: inherit;
        }
        :global(.rdw-editor-main) {
          background: transparent;
          border: none;
          padding: 0;
        }
        :global(.rdw-editor-toolbar) {
          border: none;
          border-bottom: 1px solid var(--border);
        }
      `}</style>
    </div>
  )
}
