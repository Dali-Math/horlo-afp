import fs from "fs-extra";
import path from "path";
import { fromPath } from "pdf2pic";
import { fileURLToPath } from "url";

// Correction ESM (car __dirname n'existe plus)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dossiers d'entrée/sortie
const inputDir = path.resolve(__dirname, "../public/pdfs");
const outputBase = path.resolve(__dirname, "../public/flipbook");

async function convertAllPdfs() {
  await fs.ensureDir(outputBase);
  const files = await fs.readdir(inputDir);
  const pdfs = files.filter((f) => f.toLowerCase().endsWith(".pdf"));

  if (pdfs.length === 0) {
    console.log("⚠️ Aucun fichier PDF trouvé dans /public/pdfs/");
    return;
  }

  for (const file of pdfs) {
    const name = path.basename(file, ".pdf");
    const inputPath = path.join(inputDir, file);
    const outputDir = path.join(outputBase, name);

    await fs.ensureDir(outputDir);

    console.log(`🧩 Conversion de ${file}...`);

    const converter = fromPath(inputPath, {
      density: 150,
      savePath: outputDir,
      format: "jpg",
      width: 1200,
      height: 1600,
      saveFilename: "page",
    });

    try {
      const totalPages = await converter(1, true);
      const pages = totalPages.length || totalPages;
      for (let i = 1; i <= pages; i++) {
        await converter(i);
      }
      console.log(`✅ Terminé : ${name}`);
    } catch (err) {
      console.error(`❌ Erreur lors de la conversion de ${file}:`, err.message);
    }
  }

  console.log("🎉 Toutes les conversions sont terminées !");
}

convertAllPdfs().catch((err) => {
  console.error("💥 Erreur générale :", err);
});
