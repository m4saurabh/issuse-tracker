"use client";

import { useState } from "react";

interface Issue {
  id: number;
  title: string;
  html_url: string;
  number: number;
}

export default function Home() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!owner || !repo) {
      setError("Please enter both owner and repository name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ owner, repo }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await response.json();
      setIssues(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Repository Issues Tracker</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Owner (e.g., facebook)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Repository (e.g., react)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Fetching Issues..." : "Get Issues"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
          >
            <h3 className="font-medium text-gray-900 mb-2">
              #{issue.number} {issue.title}
            </h3>
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>

      {issues.length === 0 && !loading && !error && (
        <p className="text-gray-500 text-center">
          Enter a repository owner and name to fetch issues
        </p>
      )}
    </div>
  );
}
