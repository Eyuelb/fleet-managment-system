import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import RootStyleRegistry from "./mantine";
import AppProgressBar from "@components/common/progress-bar";
import ReactQueryProvider from "../providers/ReactQueryClientProvider";
import { DataSourceProvider } from "../providers/DataSourceProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <RootStyleRegistry>
            <AppProgressBar>
              <DataSourceProvider>
                {children}
              </DataSourceProvider>
            </AppProgressBar>
          </RootStyleRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
