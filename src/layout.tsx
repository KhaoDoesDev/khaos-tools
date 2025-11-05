import { Outlet } from "react-router";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Toaster } from "./components/ui/sonner";

export function Layout() {
  return <div className="min-h-dvh bg-background">
    <Navbar />
    <Outlet />
    <Toaster />
    <Footer />
  </div>
}