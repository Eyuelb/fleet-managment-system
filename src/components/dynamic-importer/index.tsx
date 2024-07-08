// DynamicImporter.tsx
import React, { ComponentType, Suspense } from "react";
import dynamic from "next/dynamic";
import { LoadingOverlay } from "@mantine/core";
import ErrorBoundary from "@components/error-boundary";

interface DynamicImporterProps<P> {
  validation: boolean;
  importPath: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>;
  loading?: React.ReactNode;
  fallback?: React.ReactNode;
}

const DynamicImporter = <P extends object>({
  validation,
  importPath,
  loading,
  fallback,
  ...rest
}: DynamicImporterProps<P> & Omit<P, keyof DynamicImporterProps<P>>) => {
  if (!validation) {
    return <>{fallback || null}</>;
  }

  const DynamicComponent = dynamic(importPath, {
    ssr: false,
    loading: () => <>{loading || <LoadingOverlay visible />}</>,
  });

  return (
    <Suspense>
      <ErrorBoundary>
        <DynamicComponent {...(rest as P)} />{" "}
      </ErrorBoundary>
    </Suspense>
  );
};

export default DynamicImporter;
