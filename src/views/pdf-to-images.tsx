import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";

export default function PDFToImagesPage() {
  const [previews, setPreviews] = useState<{ page: number; img: string }[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const cancelRef = useRef(false);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }, []);

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfName(file.name);
    setPreviews([]);
    setSelectedPages([]);
    setLoading(true);
    cancelRef.current = false;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const pages: { page: number; img: string }[] = [];
    setProgress({ current: 0, total: pdf.numPages });

    for (let i = 1; i <= pdf.numPages; i++) {
      if (cancelRef.current) break;
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context!, viewport, canvas }).promise;
      const imgData = canvas.toDataURL("image/png");
      pages.push({ page: i, img: imgData });
      setProgress({ current: i, total: pdf.numPages });
    }

    if (!cancelRef.current) setPreviews(pages);
    setLoading(false);
  };

  const handleCancel = () => {
    cancelRef.current = true;
    setLoading(false);
  };

  const toggleSelectPage = (page: number) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  const selectAllPages = () => {
    if (selectedPages.length === previews.length) setSelectedPages([]);
    else setSelectedPages(previews.map((p) => p.page));
  };

  const handleDownloadAll = async () => {
    if (!previews.length) return;
    setDownloading(true);
    const zip = new JSZip();

    const pagesToDownload =
      selectedPages.length > 0
        ? previews.filter((p) => selectedPages.includes(p.page))
        : previews;

    pagesToDownload.forEach((p) => {
      const base64 = p.img.split(",")[1];
      zip.file(`page-${p.page}.png`, base64, { base64: true });
    });

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, pdfName + "-images.zip");
    setDownloading(false);
  };

  const handleDownloadSingle = (img: string, page: number) => {
    setDownloading(true);
    saveAs(img, `page-${page}.png`);
    setDownloading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-6 mb-12">
      <Helmet>
        <title>Khao's Tools | PDF to Images Converter</title>
      </Helmet>
      <h1 className="text-4xl font-extrabold text-center">
        PDF to Image Converter
      </h1>

      <div className="backdrop-blur-md border rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="items-center gap-3 flex">
            <Label htmlFor="pdf">PDF</Label>
            <Input
              id="pdf"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>

          {loading && (
            <Button onClick={handleCancel} variant="destructive">
              Cancel
            </Button>
          )}
        </div>

        {loading && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Rendering page {progress.current} of {progress.total}…
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-blue-600 h-2 transition-all duration-300"
                style={{
                  width:
                    progress.total > 0
                      ? `${(progress.current / progress.total) * 100}%`
                      : "0%",
                }}
              ></div>
            </div>
          </div>
        )}

        {!loading && previews.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <Button onClick={selectAllPages} variant="secondary">
              {selectedPages.length === previews.length
                ? "Unselect All"
                : "Select All Pages"}
            </Button>

            <Button
              onClick={handleDownloadAll}
              disabled={downloading}
              variant="outline"
            >
              {downloading
                ? "Downloading…"
                : `Download ${
                    selectedPages.length > 0 ? "Selected" : "All"
                  } as ZIP`}
            </Button>
          </div>
        )}
      </div>

      {!loading && previews.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6">
          {previews.map((p) => (
            <div
              key={p.page}
              className={`bg-muted/40 border border-muted rounded-2xl p-4 shadow-lg transition-all duration-300 ${
                selectedPages.includes(p.page)
                  ? "ring-2 ring-blue-500 shadow-blue-500/30"
                  : ""
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(p.page)}
                    onChange={() => toggleSelectPage(p.page)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm font-medium">Page {p.page}</span>
                </Label>
                <Button
                  onClick={() => handleDownloadSingle(p.img, p.page)}
                  size="sm"
                >
                  {downloading ? "Downloading…" : `Download`}
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md border border-gray-700">
                <img
                  src={p.img}
                  alt={`Page ${p.page}`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
