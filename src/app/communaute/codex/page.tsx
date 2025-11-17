
// Installer la dépendance : npm install html2canvas
"use client";

import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function Page(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"paste" | "github" | "image">("paste");
  const [code, setCode] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(14);
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showScreenshot, setShowScreenshot] = useState<boolean>(false);

  const codeInputRef = useRef<HTMLTextAreaElement>(null);
  const githubUrlRef = useRef<HTMLInputElement>(null);
  const fontSizeRef = useRef<HTMLInputElement>(null);
  const lineHeightRef = useRef<HTMLInputElement>(null);
  const hiddenScreenshotRef = useRef<HTMLDivElement>(null);
  const imageDisplayRef = useRef<HTMLDivElement>(null);
  const screenshotContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLLabelElement>(null);
  const imagePreviewRef = useRef<HTMLDivElement>(null);

  const switchTab = (tabName: "paste" | "github" | "image") => {
    setActiveTab(tabName);
  };

  const generateScreenshot = async () => {
    const codeValue = codeInputRef.current?.value.trim() || "";
    
    if (!codeValue) {
      alert("Collez du code");
      return;
    }

    const fontSizeValue = fontSizeRef.current?.value || "14";
    const lineHeightValue = lineHeightRef.current?.value || "1.5";

    if (hiddenScreenshotRef.current) {
      hiddenScreenshotRef.current.textContent = codeValue;
      hiddenScreenshotRef.current.style.fontSize = `${fontSizeValue}px`;
      hiddenScreenshotRef.current.style.lineHeight = `${lineHeightValue}`;
    }

    setShowControls(true);

    setTimeout(() => {
      if (hiddenScreenshotRef.current && imageDisplayRef.current) {
        html2canvas(hiddenScreenshotRef.current, {
          backgroundColor: "#0d1117",
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          width: 1000,
          height: hiddenScreenshotRef.current.scrollHeight,
        })
          .then((canvas) => {
            imageDisplayRef.current!.innerHTML = "";
            imageDisplayRef.current!.appendChild(canvas);
            setCurrentImage(canvas.toDataURL("image/png"));
            setShowScreenshot(true);
          })
          .catch((err) => {
            console.error(err);
            alert("Erreur");
          });
      }
    }, 200);
  };

  const downloadImage = () => {
    if (!currentImage) {
      alert("Pas de photo");
      return;
    }
    const link = document.createElement("a");
    link.href = currentImage;
    link.download = "code.png";
    link.click();
  };

  const closeScreenshot = () => {
    setShowScreenshot(false);
    setCurrentImage(null);
  };

  const applyPreset = (preset: "mobile" | "desktop" | "print" | "") => {
    if (preset === "mobile") {
      setFontSize(12);
      setLineHeight(1.4);
      if (fontSizeRef.current) fontSizeRef.current.value = "12";
      if (lineHeightRef.current) lineHeightRef.current.value = "1.4";
    } else if (preset === "desktop") {
      setFontSize(14);
      setLineHeight(1.5);
      if (fontSizeRef.current) fontSizeRef.current.value = "14";
      if (lineHeightRef.current) lineHeightRef.current.value = "1.5";
    } else if (preset === "print") {
      setFontSize(11);
      setLineHeight(1.3);
      if (fontSizeRef.current) fontSizeRef.current.value = "11";
      if (lineHeightRef.current) lineHeightRef.current.value = "1.3";
    }
  };

  const loadGitHub = () => {
    const url = githubUrlRef.current?.value.trim() || "";
    
    if (!url) {
      alert("URL");
      return;
    }

    let rawUrl = url;
    if (url.includes("github.com") && !url.includes("raw.githubusercontent")) {
      rawUrl = url.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
    }

    fetch(rawUrl)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((codeContent) => {
        setCode(codeContent);
        setActiveTab("paste");
      })
      .catch(() => alert("Erreur"));
  };

  const handleFile = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (imagePreviewRef.current) {
          imagePreviewRef.current.innerHTML = `<img src="${result}" class="image-preview" />`;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Synchroniser les valeurs affichées
    updateValues();
  }, [fontSize, lineHeight]);

  const updateValues = () => {
    // Les valeurs sont déjà mises à jour via l'état
  };

  useEffect(() => {
    // Écouteurs pour les curseurs
    const fontSizeEl = fontSizeRef.current;
    const lineHeightEl = lineHeightRef.current;

    const handleFontChange = () => {
      if (fontSizeEl) {
        setFontSize(Number(fontSizeEl.value));
      }
    };

    const handleLineChange = () => {
      if (lineHeightEl) {
        setLineHeight(Number(lineHeightEl.value));
      }
    };

    fontSizeEl?.addEventListener("change", handleFontChange);
    lineHeightEl?.addEventListener("change", handleLineChange);

    return () => {
      fontSizeEl?.removeEventListener("change", handleFontChange);
      lineHeightEl?.removeEventListener("change", handleLineChange);
    };
  }, []);

  useEffect(() => {
    // Écouteurs pour le drag & drop
    const dropZone = dropZoneRef.current;
    const fileInput = fileInputRef.current;

    if (!dropZone || !fileInput) return;

    const handleClick = () => fileInput.click();

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (dropZone) dropZone.style.background = "#161b22";
    };

    const handleDragLeave = () => {
      if (dropZone) dropZone.style.background = "#0d1117";
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (dropZone) dropZone.style.background = "#0d1117";
      if (e.dataTransfer?.files) {
        fileInput.files = e.dataTransfer.files;
        handleFile();
      }
    };

    const handleChange = () => handleFile();

    dropZone.addEventListener("click", handleClick);
    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("drop", handleDrop);
    fileInput.addEventListener("change", handleChange);

    return () => {
      dropZone.removeEventListener("click", handleClick);
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
      fileInput.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="container">
      <header>
        <h1>📸 CodePhotoCapture</h1>
      </header>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "paste" ? "active" : ""}`}
          onClick={() => switchTab("paste")}
        >
          📝 Coller Code
        </button>
        <button
          className={`tab ${activeTab === "github" ? "active" : ""}`}
          onClick={() => switchTab("github")}
        >
          🐙 GitHub
        </button>
        <button
          className={`tab ${activeTab === "image" ? "active" : ""}`}
          onClick={() => switchTab("image")}
        >
          🖼️ Image
        </button>
      </div>

      {/* TAB 1: PASTE */}
      <div id="paste" className={`content ${activeTab === "paste" ? "active" : ""}`}>
        <div className="input-box">
          <textarea
            id="code-input"
            ref={codeInputRef}
            placeholder="Collez votre code ici..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="btn-group">
            <button onClick={generateScreenshot}>📸 Photo Complète</button>
            <button
              className="btn-secondary"
              onClick={() => {
                setCode("");
                if (codeInputRef.current) codeInputRef.current.value = "";
              }}
            >
              Effacer
            </button>
          </div>
        </div>
      </div>

      {/* TAB 2: GITHUB */}
      <div id="github" className={`content ${activeTab === "github" ? "active" : ""}`}>
        <div className="input-box">
          <input
            type="text"
            id="github-url"
            ref={githubUrlRef}
            placeholder="https://raw.githubusercontent.com/user/repo/branch/file.js"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
          <div className="btn-group">
            <button onClick={loadGitHub}>Charger</button>
            <button
              className="btn-secondary"
              onClick={() => {
                setGithubUrl("");
                if (githubUrlRef.current) githubUrlRef.current.value = "";
              }}
            >
              Effacer
            </button>
          </div>
        </div>
      </div>

      {/* TAB 3: IMAGE */}
      <div id="image" className={`content ${activeTab === "image" ? "active" : ""}`}>
        <div className="input-box">
          <input type="file" id="file-input" ref={fileInputRef} accept="image/*" />
          <label htmlFor="file-input" className="drop-zone" ref={dropZoneRef} id="drop-zone">
            📤 Cliquez ou glissez-déposez
          </label>
          <div id="image-preview" ref={imagePreviewRef} />
        </div>
      </div>

      {/* CONTROLS */}
      <div className={`controls ${showControls ? "active" : ""}`} id="controls" ref={controlsRef}>
        <div className="control-item">
          <label>Police:</label>
          <input
            type="range"
            min={10}
            max={24}
            value={fontSize}
            id="font-size"
            ref={fontSizeRef}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
          <span id="font-value">{fontSize}px</span>
        </div>

        <div className="control-item">
          <label>Ligne:</label>
          <input
            type="range"
            min={1}
            max={2.5}
            step={0.1}
            value={lineHeight}
            id="line-height"
            ref={lineHeightRef}
            onChange={(e) => setLineHeight(Number(e.target.value))}
          />
          <span id="line-value">{lineHeight}</span>
        </div>

        <div className="control-item">
          <label>Préset:</label>
          <select
            onChange={(e) => {
              applyPreset(e.target.value as "mobile" | "desktop" | "print" | "");
              e.target.value = "";
            }}
          >
            <option value="">-- Choisir --</option>
            <option value="mobile">📱 Mobile</option>
            <option value="desktop">🖥️ Desktop</option>
            <option value="print">🖨️ Impression</option>
          </select>
        </div>
      </div>

      {/* SCREENSHOT */}
      <div
        className={`screenshot-container ${showScreenshot ? "active" : ""}`}
        id="screenshot-container"
        ref={screenshotContainerRef}
      >
        <h3>📸 Votre Photo</h3>
        <div className="image-display" id="image-display" ref={imageDisplayRef} />
        <div className="btn-group">
          <button onClick={downloadImage}>💾 Télécharger PNG</button>
          <button className="btn-secondary" onClick={closeScreenshot}>
            ✕ Fermer
          </button>
        </div>
      </div>

      <div id="hidden-screenshot" ref={hiddenScreenshotRef} />

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: #0d1117;
          color: #c9d1d9;
          min-height: 100vh;
          padding: 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        header {
          text-align: center;
          margin-bottom: 40px;
        }

        h1 {
          font-size: 2.5em;
          color: #58a6ff;
          margin-bottom: 10px;
        }

        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 1px solid #30363d;
          flex-wrap: wrap;
        }

        .tab {
          padding: 12px 20px;
          background: none;
          border: none;
          color: #8b949e;
          cursor: pointer;
          font-size: 1em;
          border-bottom: 2px solid transparent;
          transition: all 0.3s;
        }

        .tab:hover {
          color: #58a6ff;
        }

        .tab.active {
          color: #58a6ff;
          border-bottom-color: #58a6ff;
        }

        .content {
          display: none;
        }

        .content.active {
          display: block;
        }

        .input-box {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 20px;
        }

        textarea,
        input[type="text"] {
          width: 100%;
          padding: 12px;
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          color: #c9d1d9;
          font-family: "Courier New", monospace;
          font-size: 14px;
          margin-bottom: 15px;
        }

        textarea {
          height: 300px;
        }

        textarea:focus,
        input[type="text"]:focus {
          outline: none;
          border-color: #58a6ff;
        }

        .btn-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        button {
          padding: 10px 16px;
          background: #238636;
          color: white;
          border: 1px solid #2ea043;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        button:hover {
          background: #2ea043;
        }

        .btn-secondary {
          background: #21262d;
          border-color: #30363d;
          color: #c9d1d9;
        }

        .btn-secondary:hover {
          background: #30363d;
        }

        .controls {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 20px;
          display: none;
          gap: 20px;
          flex-wrap: wrap;
        }

        .controls.active {
          display: flex;
        }

        .control-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .control-item label {
          color: #8b949e;
        }

        input[type="range"] {
          width: 120px;
        }

        select {
          padding: 8px 12px;
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          color: #c9d1d9;
        }

        .screenshot-container {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 20px;
          margin-bottom: 20px;
          display: none;
        }

        .screenshot-container.active {
          display: block;
        }

        .screenshot-container h3 {
          color: #58a6ff;
          margin-bottom: 15px;
        }

        .image-display {
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 15px;
          text-align: center;
          max-height: 600px;
          overflow-y: auto;
        }

        .image-display img {
          max-width: 100%;
          border-radius: 4px;
        }

        .drop-zone {
          border: 2px dashed #58a6ff;
          border-radius: 6px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          background: #0d1117;
          display: block;
        }

        .drop-zone:hover {
          background: #161b22;
        }

        input[type="file"] {
          display: none;
        }

        .image-preview {
          max-width: 100%;
          max-height: 400px;
          border-radius: 6px;
          margin-top: 15px;
        }

        #hidden-screenshot {
          position: fixed;
          left: -9999px;
          top: -9999px;
          background: #0d1117;
          color: #c9d1d9;
          font-family: "Courier New", monospace;
          white-space: pre-wrap;
          word-break: break-word;
          padding: 20px;
          max-width: 1000px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
