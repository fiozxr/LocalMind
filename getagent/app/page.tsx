"use client";

import { useState } from "react";
import { Search, Copy, Check } from "lucide-react";

// Mock data for display purposes
const mockAgents = [
  { id: "1", author: "johndoe", slug: "react-expert", title: "React Expert", tags: ["react", "frontend"], compatibility: ["cursor", "cline"] },
  { id: "2", author: "janedoe", slug: "python-guru", title: "Python Guru", tags: ["python", "backend"], compatibility: ["cursor"] },
  { id: "3", author: "bobsmith", slug: "devops-pro", title: "DevOps Pro", tags: ["devops", "docker"], compatibility: ["bolt"] },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (author: string, slug: string, id: string) => {
    navigator.clipboard.writeText(`getagent install @${author}/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const AgentCard = ({ agent }: { agent: typeof mockAgents[0] }) => (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{agent.title}</h3>
          <p className="text-sm text-gray-500">@{agent.author}/{agent.slug}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {agent.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mb-6 flex gap-2">
        {agent.compatibility.map(tool => (
          <span key={tool} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
            {tool}
          </span>
        ))}
      </div>

      <button
        onClick={() => handleCopy(agent.author, agent.slug, agent.id)}
        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors text-sm font-medium"
      >
        {copiedId === agent.id ? <Check size={16} /> : <Copy size={16} />}
        {copiedId === agent.id ? "Copied!" : "Copy Install Command"}
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            The Agent Registry
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover, share, and manage system prompts and agent instructions for Cursor, Claude Code, Cline, and more.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              placeholder="Search agents by name, tag, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-16">

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Trending Agents</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAgents.map(agent => <AgentCard key={`trending-${agent.id}`} agent={agent} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAgents.map(agent => <AgentCard key={`recent-${agent.id}`} agent={agent} />)}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Highly Rated</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View all</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAgents.map(agent => <AgentCard key={`rated-${agent.id}`} agent={agent} />)}
          </div>
        </section>

      </div>
    </main>
  );
}
