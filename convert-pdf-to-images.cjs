const fs = require("fs-extra");
const path = require("path");
const { fromPath } = require("pdf2pic");

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

    const converter = fromPath(inputPath, {
      density: 150,
      savePath: outputDir,
      format: "jpg",
      width: 1200,
      height: 1600,
    });

    const totalPages = await converter(1, true);
    const pages = totalPages.length;

    for (let i = 1; i <= pages; i++) {
      await converter(i);
    }

    console.log(`✅ Terminé : ${name}`);
  }
}

convertAllPdfs()
  .then(() => console.log("🎉 Toutes les conversions sont terminées !"))
  .catch((err) => console.error("❌ Erreur :", err));
