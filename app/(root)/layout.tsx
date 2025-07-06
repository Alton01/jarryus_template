import Footer from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";

export default function RootRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}
