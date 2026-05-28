"use client";

import { useState } from "react";
import { Copy, Check, ChevronLeft, User, Terminal } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// Mock data matching the requested dynamic route
const mockAgent = {
  title: "Next.js App Router Expert",
  author: "johndoe",
  slug: "nextjs-expert",
  version: "1.2.0",
  description: "A comprehensive agent strictly configured to generate Next.js 14 App Router code with Tailwind CSS and TypeScript.",
  tags: ["nextjs", "react", "tailwind", "typescript"],
  compatibility: ["cursor", "cline"],
  overview_md: "## Overview\n\nThis agent provides strict rules for building modern Next.js applications.\n\n### Features\n- Enforces App Router (`app/` directory) usage.\n- Strictly uses Server Components by default.\n- Configures Tailwind CSS optimally.",
  payload_md: "# System Instructions\n\nYou are an expert in Next.js 14 App Router.\n\n1. Always use the `app/` directory.\n2. Default to Server Components.\n3. Use Tailwind CSS for styling.",
};

export default function AgentDetailPage({ params }: { params: { username: string, 'agent-slug': string } }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'raw'>('overview');

  const installCommand = `getagent install @${mockAgent.author}/${mockAgent.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-8">

        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Back to Search
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{mockAgent.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <Link href={`/${mockAgent.author}`} className="flex items-center gap-1.5 text-blue-600 hover:underline font-medium">
                  <User size={16} /> @{mockAgent.author}
                </Link>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">v{mockAgent.version}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <div className="flex items-center bg-gray-900 rounded-lg p-1 pr-2 w-full md:w-auto shadow-sm">
                <div className="flex items-center px-3 py-2 text-green-400 font-mono text-sm overflow-x-auto whitespace-nowrap">
                  <Terminal size={14} className="mr-2 text-gray-500" />
                  {installCommand}
                </div>
                <button
                  onClick={handleCopy}
                  className="ml-2 bg-white text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0"
                  title="Copy command"
                >
                  {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6 text-lg">{mockAgent.description}</p>

          <div className="flex flex-wrap gap-y-4 gap-x-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {mockAgent.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Compatible Tools</h3>
              <div className="flex flex-wrap gap-2">
                {mockAgent.compatibility.map(tool => (
                  <span key={tool} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'raw' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('raw')}
            >
              Raw agent.md
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'overview' ? (
              <div className="prose prose-blue max-w-none">
                <ReactMarkdown>{mockAgent.overview_md}</ReactMarkdown>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-gray-100 font-mono text-sm leading-relaxed">
                  <code>{mockAgent.payload_md}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
