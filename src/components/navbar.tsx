import { NavLink } from "react-router";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="pt-2">
      <div className="max-w-4xl backdrop-blur-sm mx-auto py-2 px-8 rounded-full border border-muted-foreground/20 bg-muted/40 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-white">
          Khao's Tools
        </NavLink>
        <nav className="hidden sm:flex gap-6 text-sm text-muted-foreground">
          <Button variant="link" size="sm" asChild>
            <NavLink
              to="https://www.khaodoes.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Portfolio
            </NavLink>
          </Button>
          <Button variant="link" size="sm" asChild>
            <NavLink
              to="https://github.com/KhaoDoesDev/khaos-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </NavLink>
          </Button>
        </nav>
      </div>
    </header>
  );
}
