import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const latinLetterSmallCapitalMap: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ғ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "s",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};

function toSmallCaps(text: string): string {
  return text
    .split("")
    .map((ch) => {
      const lower = ch.toLowerCase();
      return latinLetterSmallCapitalMap[lower] || ch;
    })
    .join("");
}

export default function MinecraftSmallTextPage() {
  const [input, setInput] = useState("");
  const output = toSmallCaps(input);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    toast.info("Copied to clipboard!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-12">
      <Helmet>
        <title>Khao's Tools | Minecraft Small Text Converter</title>
        <meta
          name="description"
          content="Convert normal text into Minecraft small text."
        />
        <meta property="og:title" content="Khao's Tools | Minecraft Small Text Converter" />
        <meta property="og:description" content="Convert normal text into Minecraft small text." />
      </Helmet>

      <h1 className="text-3xl font-extrabold text-center mb-3">
        Minecraft Small Text Converter
      </h1>
      <p className="text-muted-foreground text-center mb-8">
        Convert normal text into Minecraft small text (Latin Letter Small Capital).
      </p>

      <div className="backdrop-blur-md border rounded-2xl p-6 shadow-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="input">Enter Text</Label>
          <Textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text here..."
            className="resize-none h-28"
          />
        </div>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-mono break-words">{output}</p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={copyToClipboard} variant="secondary">
            Copy to Clipboard
          </Button>
        </div>
      </div>
    </div>
  );
}
