const fs = require("fs-extra");
const path = require("path");
const { Poppler } = require("pdf-poppler");

const inputDir = path.resolve("./public/pdfs");
const outputBase = path.resolve("./public/flipbook");

async function convertAllPdfs() {
  await fs.ensureDir(outputBase);
  const files = await fs.readdir(inputDir);

  const pdfs = files.filter((f) => f.endsWith(".pdf"));

  for (const file of pdfs) {
    const name = path.basename(file, ".pdf");
    const inputPath = path.join(inputDir, file);
    const outputDir = path.join(outputBase, name);

    await fs.ensureDir(outputDir);

    console.log(`🔄 Conversion de ${file}...`);
    const poppler = new Poppler();
    await poppler.pdfToCairo(inputPath, path.join(outputDir, ""), {
      pngFile: false,
      jpegFile: true,
      singleFile: false,
      scale: 150,
    });
    console.log(`✅ Terminé : ${name}`);
  }
}

convertAllPdfs()
  .then(() => console.log("🎉 Toutes les conversions sont terminées !"))
  .catch((err) => console.error("❌ Erreur :", err));
