import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="pb-8 text-center text-muted-foreground text-sm">
      Made with ❤️ by{" "}
      <Link
        to="https://www.khaodoes.dev"
        className="hover:underline hover:text-white/70"
      >
        Khao
      </Link>
    </footer>
  );
}
