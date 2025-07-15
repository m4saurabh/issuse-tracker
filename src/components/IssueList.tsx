"use client";
import type { Issue } from "@/types/issues";
import { ExternalLink } from "lucide-react";

type IssueListProps = { issues: Issue[] };

export function IssueList({ issues }: IssueListProps) {
  return (
    <div className="space-y-3">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 flex flex-col gap-2"
        >
          <h3 className="font-medium text-gray-900">
            #{issue.number} {issue.title}
          </h3>

          <ul className="flex gap-2">
            {issue.labels.map((label) => (
              <li
                key={label.name}
                style={{ backgroundColor: `#${label.color}50` }}
                className="rounded-full px-2 py-1 text-xs font-medium"
              >
                {label.name}
              </li>
            ))}
          </ul>

          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            View it on GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ))}
    </div>
  );
}
