import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/SideBar";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <main className="relative">
         <div className="flex">
            <Sidebar />
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
               <Header />
               <div className="w-full">{children}</div>
            </section>
         </div>
      </main>
   );
}
