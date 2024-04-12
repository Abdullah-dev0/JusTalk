export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="grid place-content-center py-8 min-h-screen w-full ">
         {children}
      </main>
   );
}
