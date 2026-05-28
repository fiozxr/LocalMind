"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, Download } from "lucide-react";

// Mock data
const publishedAgents = [
  { id: "1", slug: "react-expert", title: "React Expert", views: 1200, downloads: 340, lastUpdated: "2023-10-25" },
  { id: "2", slug: "node-api-builder", title: "Node API Builder", views: 850, downloads: 210, lastUpdated: "2023-10-20" },
];

export default function Dashboard() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Creator Dashboard</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          {isCreating ? "Cancel" : <><Plus size={20} /> Create New Agent</>}
        </button>
      </div>

      {isCreating ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Create New Agent</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Next.js App Router Expert" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (Namespace)</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. nextjs-expert" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="A brief description of what this agent does..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="react, nextjs, frontend" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Tools</label>
                <div className="flex gap-4">
                  {['Cursor', 'Claude Code', 'Cline', 'Bolt'].map(tool => (
                    <label key={tool} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">{tool}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview / Documentation (Markdown)
                <span className="block text-xs text-gray-500 font-normal mt-1">This is the public-facing README for your agent.</span>
              </label>
              <textarea rows={8} className="w-full border border-gray-300 rounded-md p-3 font-mono text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="# Overview\n\nDescribe how to use this agent..."></textarea>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Payload (Raw system instructions)
                <span className="block text-xs text-gray-500 font-normal mt-1">These are the precise instructions fetched by the CLI.</span>
              </label>
              <textarea rows={12} className="w-full border border-gray-300 rounded-md p-3 font-mono text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="You are an expert developer..."></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
                Publish Agent
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">My Published Agents</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {publishedAgents.map((agent) => (
              <li key={agent.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-1">{agent.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">@{agent.slug}</span>
                      <span>Last updated: {agent.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1"><Eye size={16} /> {agent.views}</div>
                      <div className="flex items-center gap-1"><Download size={16} /> {agent.downloads}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
