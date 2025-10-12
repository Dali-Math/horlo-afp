const flipbook = document.getElementById("flipbook");
const pdfUrl = window.FLIPBOOK_CONFIG.pdfUrl;

flipbook.innerHTML = `<p style="color:#E2B44F;text-align:center;margin-top:20px;">Chargement du livre en cours…</p>`;

const iframe = document.createElement("iframe");
iframe.src = `/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfUrl)}#theme=dark`;
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.border = "none";
iframe.allowFullscreen = true;

setTimeout(() => {
  flipbook.innerHTML = "";
  flipbook.appendChild(iframe);
}, 500);
