(function () {
  const $ = (sel) => document.querySelector(sel);
  const params = new URLSearchParams(location.search);
  const fileParam = params.get("file") || "";
  const titleParam = params.get("title") || "";

  const titleEl = $("#hlDocTitle");
  const downloadEl = $("#hlDownload");
  const loaderEl = $("#hlLoader");
  const flipWrapEl = $("#hlFlipWrap");
  const flipEl = $("#hlFlip");

  const prevBtn = $("#hlPrev");
  const nextBtn = $("#hlNext");
  const pageCurEl = $("#hlPageCur");
  const pageTotalEl = $("#hlPageTotal");
  const zoomInBtn = $("#hlZoomIn");
  const zoomOutBtn = $("#hlZoomOut");
  const fsBtn = $("#hlFullscreen");

  const pdfUrl = fileParam;
  if (!pdfUrl || !/^\/pdfs\/.+\.pdf$/i.test(pdfUrl)) {
    loaderEl.innerHTML =
      '<div class="hl-loader"><div class="hl-loader-text">❌ Paramètre "file" invalide. Exemple : <code>?file=/pdfs/rapport-fhh.pdf</code></div></div>';
    return;
  }

  titleEl.textContent = titleParam || decodeURIComponent(pdfUrl.split("/").pop());
  downloadEl.href = pdfUrl;

  if (window["pdfjsLib"]) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
  } else {
    loaderEl.innerHTML =
      '<div class="hl-loader"><div class="hl-loader-text">❌ PDF.js introuvable.</div></div>';
    return;
  }

  async function renderPageToImage(pdfDoc, pageNum, targetWidth) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const scale = targetWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });
    canvas.width = Math.floor(scaledViewport.width);
    canvas.height = Math.floor(scaledViewport.height);

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

    const img = new Image();
    img.decoding = "async";
    img.src = canvas.toDataURL("image/jpeg", 0.92);
    await img.decode();
    return { img, width: canvas.width, height: canvas.height };
  }

  (async function init() {
    try {
      const cfg = window.HL_FLIPBOOK_CONFIG || {};
      const renderWidth = cfg.renderWidth || 1400;

      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdfDoc = await loadingTask.promise;
      const pageCount = pdfDoc.numPages;

      pageTotalEl.textContent = pageCount;

      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
        const { img, width, height } = await renderPageToImage(
          pdfDoc,
          i,
          renderWidth
        );
        pages.push({ img, width, height });
      }

      const book = document.createElement("div");
      book.className = "hl-book";
      pages.forEach(({ img }) => {
        const page = document.createElement("div");
        page.className = "hl-page";
        const inner = document.createElement("div");
        inner.className = "page-content";
        const ph = document.createElement("img");
        ph.className = "page-img";
        ph.src = img.src;
        ph.alt = "";
        inner.appendChild(ph);
        page.appendChild(inner);
        book.appendChild(page);
      });
      flipEl.innerHTML = "";
      flipEl.appendChild(book);

      const flip = new St.PageFlip(flipEl, {
        width: cfg.width || 1100,
        height: cfg.height || 780,
        showCover: false,
        mobileScrollSupport: true,
        usePortrait: cfg.usePortrait !== false,
        flippingTime: cfg.flippingTime || 600,
        maxShadowOpacity: 0.2,
        drawShadow: true,
        startPage: (cfg.startPage || 1) - 1,
        autoSize: true,
        clickEventForward: true,
      });

      flip.loadFromHTML(book.children);

      const updateIndicator = () => {
        const cur = flip.getCurrentPageIndex() + 1;
        pageCurEl.textContent = String(cur);
        pageTotalEl.textContent = String(flip.getPageCount());
      };
      flip.on("init", () => {
        loaderEl.style.display = "none";
        flipWrapEl.style.opacity = "1";
        updateIndicator();
      });
      flip.on("flip", updateIndicator);

      prevBtn.onclick = () => flip.flipPrev();
      nextBtn.onclick = () => flip.flipNext();

      let zoom = 1;
      const applyZoom = () => {
        flipEl.style.transform = `scale(${zoom})`;
        flipEl.style.transformOrigin = "center top";
      };
      zoomInBtn.onclick = () => {
        const max = cfg.maxZoom || 2.2;
        zoom = Math.min(max, zoom + (cfg.zoomStep || 0.2));
        applyZoom();
      };
      zoomOutBtn.onclick = () => {
        const min = cfg.minZoom || 0.8;
        zoom = Math.max(min, zoom - (cfg.zoomStep || 0.2));
        applyZoom();
      };

      fsBtn.onclick = () => {
        const el = document.documentElement;
        if (!document.fullscreenElement) {
          el.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      };

      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") flip.flipPrev();
        if (e.key === "ArrowRight") flip.flipNext();
        if ((e.ctrlKey || e.metaKey) && e.key === "=") zoomInBtn.click();
        if ((e.ctrlKey || e.metaKey) && e.key === "-") zoomOutBtn.click();
      });
    } catch (err) {
      console.error(err);
      loaderEl.innerHTML =
        '<div class="hl-loader"><div class="hl-loader-text">❌ Impossible de charger le PDF. Vérifie l\'URL ?file=/pdfs/xxx.pdf</div></div>';
    }
  })();
})();
