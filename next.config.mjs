import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/dates",
      "@mantine/notifications",
      "@mantine/modals",
      "@tabler/icons-react",
      "tailwindcss",
    ],
  },
  env: {
    NEXTAUTH_SECRET: "4XoNNzVnk ",
  },
});
