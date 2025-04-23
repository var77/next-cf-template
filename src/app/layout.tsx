import { ThemeProvider } from "@/components/theme-provider";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import "./globals.css";

for (const [key, val] of Object.entries(getCloudflareContext().env)) {
  process.env[key] = val;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
