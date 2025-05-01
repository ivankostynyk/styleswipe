import "./globals.css";
export const metadata = { title: 'StyleSwipe', description: 'A fast, searchable image library' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
