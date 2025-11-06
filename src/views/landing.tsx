import { Seo } from "@/seo";
import { Image, MessageCircleQuestion, Pickaxe } from "lucide-react";
import { Link } from "react-router";

const tools = [
  {
    title: "PDF to Images",
    description:
      "Convert your PDFs to downloadable images with options to choose which pages you want.",
    icon: <Image className="size-8 text-blue-400" />,
    href: "/pdf-to-images",
    color: "from-blue-600/30 to-blue-500/10",
  },
  {
    title: "Text to Minecraft Small Text",
    description:
      "Converts your normal text to Minecraft compatible small text, usually seen in newer Minecraft servers. (Latin Letter Small Capital)",
    icon: <Pickaxe className="size-8 text-blue-400" />,
    href: "/minecraft-small-text",
    color: "from-blue-600/30 to-blue-500/10",
  },
  {
    title: "Coming Soon!",
    description: "Make feature requests or pull requests in the GitHub.",
    icon: <MessageCircleQuestion className="size-8 text-purple-400" />,
    target: "_blank",
    href: "https://github.com/KhaoDoesDev/khaos-tools",
    color: "from-purple-600/30 to-purple-500/10",
  },
];

export default function LandingPage() {
  return (
    <>
      <Seo title="Khao's Tools" description="A collection of random tools I needed and their websites were too slow or needed to pay for." />
      <section className="my-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Simple tools because I got bored.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Fully client-side and doesn't send any of your information or files to
          external services. It's also open-source!
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div key={tool.title} className="aspect-square">
              <Link
                to={tool.href}
                target={tool.target}
                className={`flex flex-col bg-gradient-to-br ${tool.color} border border-muted-foreground/20 rounded-2xl p-6 hover:border-muted-foreground/60 transition-all duration-300 w-full h-full`}
              >
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  {tool.icon}
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
