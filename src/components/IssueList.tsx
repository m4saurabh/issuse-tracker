"use client";
import type { Issue } from "@/types/issues";

type IssueListProps = { issues: Issue[] };

export function IssueList({ issues }: IssueListProps) {
  return (
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
  );
}
