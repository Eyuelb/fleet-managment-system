"use client";

import ErrorLayout from "@components/common/error-layout";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorLayout reset={reset} error={error} />;
}
