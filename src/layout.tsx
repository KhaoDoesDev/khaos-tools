import { Outlet } from "react-router";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Toaster } from "./components/ui/sonner";
import Analytics from "./analytics";

export function Layout() {
  return <div className="min-h-dvh bg-background">
    <Navbar />
    <Outlet />
    <Analytics />
    <Toaster />
    <Footer />
  </div>
}