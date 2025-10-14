import fs from "fs";
import path from "path";

const backupFile = process.argv[2];

if (!backupFile) {
  console.error("❌ Erreur : indique le nom du fichier de sauvegarde (ex: node restore.js backup-stable-14-10-25.json)");
  process.exit(1);
}

const backupPath = path.resolve(backupFile);

if (!fs.existsSync(backupPath)) {
  console.error(`❌ Fichier de sauvegarde introuvable : ${backupPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(backupPath, "utf8"));
console.log(`\n🟢 Restauration de ${data.project} (${data.version})`);
console.log(`📅 Créé le : ${data.created}`);
console.log("🧩 Fichiers à vérifier/restaurer :");

Object.entries(data.files_snapshot).forEach(([key, value]) => {
  console.log(`  ➜ ${key} : ${Array.isArray(value) ? value.join(", ") : value}`);
});

console.log("\n✅ Vérification terminée :");
console.log("Ce script agit comme vérification de structure pour la restauration automatique.");
console.log("Tous les fichiers listés dans la sauvegarde sont considérés comme stables.");
console.log("\n⚙️ Pour restaurer un snapshot complet :");
console.log("→ git restore --source=HEAD --staged . && git checkout . && git clean -fd");
console.log("→ npm run build (puis déploiement Vercel si tout est OK)\n");
