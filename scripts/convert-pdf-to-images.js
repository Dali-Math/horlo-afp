import fs from "fs-extra";
import path from "path";
import { fromPath } from "pdf2pic";

const inputDir = path.resolve("./public/pdfs");
const outputBase = path.resolve("./public/flipbook");

async function convertAllPdfs() {
  await fs.ensureDir(outputBase);
  const files = await fs.readdir(inputDir);
  const pdfs = files.filter((f) => f.endsWith(".pdf"));

  if (pdfs.length === 0) {
    console.log("⚠️ Aucun fichier PDF trouvé dans /public/pdfs/");
    return;
  }

  for (const file of pdfs) {
    const name = path.basename(file, ".pdf");
    const inputPath = path.join(inputDir, file);
    const outputDir = path.join(outputBase, name);
    await fs.ensureDir(outputDir);

    console.log(`🧩 Conversion du fichier : ${file}`);
    const converter = fromPath(inputPath, {
      density: 150,
      savePath: outputDir,
      format: "jpg",
      width: 1200,
      height: 1600,
    });

    // Conversion page par page avec affichage progressif
    const totalPages = await converter(1, true);
    const total = totalPages.totalPages;
    console.log(`📄 Total de pages détectées : ${total}`);

    for (let i = 1; i <= total; i++) {
      await converter(i);
      const progress = Math.round((i / total) * 100);
      console.log(`✅ Page ${i}/${total} (${progress}%)`);
    }

    console.log(`🏁 Terminé : ${name}`);
  }

  console.log("🎉 Toutes les conversions sont terminées !");
}

convertAllPdfs().catch((err) => {
  console.error("❌ Erreur :", err);
  process.exit(1);
});
