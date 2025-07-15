"use client";

import { useForm } from "react-hook-form";
import { useIssues } from "@/hooks/useIssues";
import { IssueList } from "@/components/IssueList";

interface FormData {
  owner: string;
  repo: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { owner: "", repo: "" },
  });

  const watchedValues = watch();
  const shouldFetch = Boolean(
    watchedValues.owner && watchedValues.repo && isValid
  );

  const {
    data: issues = [],
    isLoading,
    error,
    refetch,
  } = useIssues({
    owner: watchedValues.owner,
    repo: watchedValues.repo,
    enabled: false, // Don't auto-fetch, we'll trigger manually
  });

  const onSubmit = () => {
    if (shouldFetch) {
      refetch();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Repository Issues Tracker</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Owner (e.g., facebook)"
              {...register("owner", {
                required: "Owner is required",
                minLength: { value: 1, message: "Owner cannot be empty" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.owner && (
              <p className="text-red-500 text-sm mt-1">
                {errors.owner.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Repository (e.g., react)"
              {...register("repo", {
                required: "Repository is required",
                minLength: { value: 1, message: "Repository cannot be empty" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.repo && (
              <p className="text-red-500 text-sm mt-1">{errors.repo.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !isValid}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "Fetching Issues..." : "Get Issues"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error instanceof Error ? error.message : "An error occurred"}
        </div>
      )}

      <IssueList issues={issues} />

      {issues.length === 0 && !isLoading && !error && (
        <p className="text-gray-500 text-center">
          Enter a repository owner and name to fetch issues
        </p>
      )}
    </div>
  );
}
