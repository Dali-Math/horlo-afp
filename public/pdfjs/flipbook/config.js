const urlParams = new URLSearchParams(window.location.search);
const file = urlParams.get("file") || "/pdfs/metiers-horlogerie.pdf";
const title = urlParams.get("title") || "Document Horloger";

document.title = "📘 " + decodeURIComponent(title);

window.FLIPBOOK_CONFIG = {
  pdfUrl: file,
  background: "#0A0A0A",
  accent: "#E2B44F",
  theme: "dark",
};
